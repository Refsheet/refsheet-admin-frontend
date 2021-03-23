import React, { useState } from 'react'
import { withContentRect } from 'react-measure'
import { Query } from '@apollo/client/react/components'
import { Button, Collection, Icon, Preloader } from 'react-materialize'
import Scrollbar from 'react-scrollbars-custom'
import CollectionItem from './CollectionItem'

const PaginatedCollection = ({
  title,
  search,
  query,
  measureRef,
  contentRect,
  variables = {},
  dataPath = '',
  noPagination = false,
  filter = (x) => x,
  renderItem = (x) => <CollectionItem user={x} />,
}) => {
  const [page, setPage] = useState(1)

  const getData = (data) => {
    let out = data
    ;(dataPath || Object.keys(data)[0])
      .split('.')
      .filter(Boolean)
      .map((key) => (out = out[key]))

    if (out.map) {
      return {
        collection: out,
      }
    }

    return out || {}
  }

  /**
   * This simply returns the first array-like thing. It should work for now, no?
   *
   * @param data
   * @returns {*[]}
   */
  const findCollection = (data) => {
    let out = []
    if (data.map) return data

    Object.keys(data).forEach((k) => {
      if (data[k] && data[k].map) out = data[k]
    })

    return out
  }

  const renderResults = (data) => {
    console.log(data)

    const { currentPage, perPage, totalPages, ...query } = getData(data)

    const pageGo = (diff) => (e) => {
      e.preventDefault()
      setPage(Math.max(1, Math.min(page + diff, totalPages)))
    }

    const results = findCollection(query)
    const filtered = filter(results)

    return (
      <React.Fragment>
        <Collection className={'no-border'}>
          <Scrollbar style={{ width: contentRect.width, height: 400 }}>
            {filtered.map(renderItem)}
          </Scrollbar>
        </Collection>
        {!noPagination && (
          <div className={'collection-footer'}>
            <Button
              className={'left'}
              onClick={pageGo(-1)}
              disabled={page <= 1}
            >
              <Icon>keyboard_arrow_left</Icon>
            </Button>
            <div className={'center'}>
              Page {currentPage} of {totalPages}
            </div>
            <Button
              className={'right'}
              onClick={pageGo(1)}
              disabled={page >= totalPages}
            >
              <Icon>keyboard_arrow_right</Icon>
            </Button>
          </div>
        )}
      </React.Fragment>
    )
  }

  return (
    <div className={'CollectionContainer'} ref={measureRef}>
      {title && <div className={'collection-header'}>{title}</div>}
      <Query
        query={query}
        variables={{
          page: page,
          query: search,
          with_deleted: true,
          ...variables,
        }}
      >
        {({ data, loading, error }) => {
          if (loading)
            return (
              <div style={{ padding: '1.5rem' }}>
                <Preloader size={'big'} color={'red'} className={'block'} />
              </div>
            )
          else if (error) return <div>{JSON.stringify(error)}</div>
          else return renderResults(data)
        }}
      </Query>
    </div>
  )
}

export default withContentRect('bounds')(PaginatedCollection)
