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
  totalPages = 1,
  variables = {},
  dataPath = '',
  filter = (x) => x,
  renderItem = (x) => <CollectionItem user={x} />,
}) => {
  const [page, setPage] = useState(1)

  const pageGo = (diff) => (e) => {
    e.preventDefault()
    setPage(Math.max(1, Math.min(page + diff, totalPages)))
  }

  const getData = (data) => {
    let out = data
    ;(dataPath || Object.keys(data)[0])
      .split('.')
      .filter(Boolean)
      .map((key) => (out = out[key]))
    const final = out && out.map ? out : [out]
    return final
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
        {({ data, loading, error }) =>
          loading ? (
            <Preloader size={'big'} />
          ) : error ? (
            <div>{JSON.stringify(error)}</div>
          ) : (
            <React.Fragment>
              <Collection className={'no-border'}>
                <Scrollbar style={{ width: contentRect.width, height: 400 }}>
                  {getData(data) && filter([...getData(data)]).map(renderItem)}
                </Scrollbar>
              </Collection>
              <div className={'collection-footer'}>
                <Button
                  className={'left'}
                  onClick={pageGo(-1)}
                  disabled={page <= 1}
                >
                  <Icon>keyboard_arrow_left</Icon>
                </Button>
                <div className={'center'}>
                  Page {page} of {totalPages}
                </div>
                <Button
                  className={'right'}
                  onClick={pageGo(1)}
                  disabled={page >= totalPages}
                >
                  <Icon>keyboard_arrow_right</Icon>
                </Button>
              </div>
            </React.Fragment>
          )
        }
      </Query>
    </div>
  )
}

export default withContentRect('bounds')(PaginatedCollection)
