import React, { useContext, useState } from 'react'
import {
  Preloader,
  Row,
  Col,
  Collection,
  CollectionItem,
  Icon,
  Button,
} from 'react-materialize'
import { SessionContext } from '../../providers/SessionProvider'
import SearchBar from '../../SearchBar'
import Scrollbar from 'react-scrollbars-custom'
import { withContentRect } from 'react-measure'
import { Query } from '@apollo/client/react/components'
import { loader } from 'graphql.macro'

const getUsers = loader('../../../graphql/getUsers.graphql')

const UserListItem = ({ user }) => {
  if (!user) return null

  return (
    <CollectionItem className="avatar">
      <a href="javascript:void(0)">
        <img alt="" className="circle" src={user.avatar_url} />
      </a>
      <a href="javascript:void(0)" className="title">
        {user.name}
      </a>
      <p>@{user.username}</p>
      <a className="secondary-content" href="javascript:void(0)">
        <Icon className={'grey-text'}>star_outline</Icon>
      </a>
    </CollectionItem>
  )
}

const UserList = withContentRect('bounds')(
  ({
    title,
    search,
    scope,
    query,
    measureRef,
    contentRect,
    totalPages = 1,
  }) => {
    const session = useContext(SessionContext)
    const [page, setPage] = useState(1)

    const pageGo = (diff) => (e) => {
      e.preventDefault()
      setPage(Math.max(1, Math.min(page + diff, totalPages)))
    }

    return (
      <div className={'CollectionContainer'} ref={measureRef}>
        {title && <div className={'collection-header'}>{title}</div>}
        <Query query={query} variables={{ page: page, query: search }}>
          {({ data, loading, error }) =>
            loading ? (
              <Preloader size={'big'} />
            ) : error ? (
              <div>{JSON.stringify(error)}</div>
            ) : (
              <React.Fragment>
                <Collection className={'no-border'}>
                  <Scrollbar style={{ width: contentRect.width, height: 400 }}>
                    {data.getUsers &&
                      data.getUsers.map((user, i) => (
                        <UserListItem key={i} user={user} />
                      ))}
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
)

const Users = () => {
  const [query, setQuery] = useState('')

  return (
    <div className={'container-large'}>
      <Row>
        <Col s={12} m={8} offset={'m2'}>
          <SearchBar onSearch={setQuery} query={query} />
        </Col>
      </Row>

      <Row>
        <Col s={12} m={6} l={3}>
          <UserList
            query={getUsers}
            title={'Recently Viewed'}
            search={query}
            totalPages={4}
          />
        </Col>
        <Col s={12} m={6} l={3}>
          <UserList
            query={getUsers}
            title={'Problem Children'}
            search={query}
            totalPages={4}
          />
        </Col>
        <Col s={12} m={6} l={3}>
          <UserList
            query={getUsers}
            title={'Recently Created'}
            search={query}
            totalPages={4}
          />
        </Col>
        <Col s={12} m={6} l={3}>
          <UserList
            query={getUsers}
            title={'Recently Reported'}
            search={query}
            totalPages={4}
          />
        </Col>
      </Row>
    </div>
  )
}

export default Users
