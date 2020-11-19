import React, {useEffect, useState} from 'react'
import { Query } from '@apollo/client/react/components'
import { Error, Loading } from '../../providers/SessionProvider'
import { loader } from 'graphql.macro'
import HistoryCookie from '../../../utils/HistoryCookie'
import { useParams } from 'react-router'
import {Row, Col, Card, CardTitle, CollectionItem as CI, Icon} from 'react-materialize'
import PaginatedCollection from "../../PaginatedCollection"
import SearchBar from "../../SearchBar"
import {Link} from "react-router-dom"

const getUser = loader('../../../graphql/getUser.graphql')
const getUsers = loader('../../../graphql/getUsers.graphql')
const getUserCharacters = loader('../../../graphql/getUserCharacters.graphql')

const UserItem = ({ user }) => {
  if (!user) return null

  return (
    <CI className="avatar">
      <Link to={'/users/' + user.username}>
        <img alt="" className="circle" src={user.avatar_url} />
      </Link>
      <Link to={'/users/' + user.username} className="title">
        {user.name}
      </Link>
      <p className={'grey-text text-darken-1'}>@{user.username}</p>
      <a className="secondary-content" href="javascript:void(0)">
        <Icon className={'grey-text'}>star_outline</Icon>
      </a>
    </CI>
  )
}

const UserView = ({ user }) => {
  const [query, setQuery] = useState("")

  useEffect(() => {
    if (user.id) {
      HistoryCookie.addUser(user.id)
    }
  }, [user.id])

  return <div className={'Users-Show'}>
    <div className={'container'}>
      <Row>
        <Col s={12}>
          <Card style={{ marginTop: '1.5rem' }}>
            <img className={'avatar circle left'} style={{ marginRight: '1rem' }} src={user.avatar_url} alt={user.username} width={56}/>
            <span className={'card-title'} style={{ marginBottom: 0 }}>{ user.name }</span>
            <span className={'grey-text text-darken-1'}>@{ user.username }&nbsp;&nbsp;|&nbsp;&nbsp;{ user.id }</span>
            <br className={'clearfix'} />
            <table className={'attributes'} style={{ marginTop: '1.5rem'}}>
              <tr>
                <th>Member Since</th>
                <td>{ user.created_at }</td>
              </tr>
              <tr>
                <th>Email Address</th>
                <td>{ user.email }</td>
              </tr>
            </table>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col s={12}>
          <SearchBar onSearch={setQuery} query={query} />
        </Col>
      </Row>
      <Row>
        <Col s={12} m={12} l={4}>
          <PaginatedCollection
            query={getUserCharacters}
            title={'Characters'}
            search={query}
            dataPath={'getUser.characters'}
            variables={{ id: user.id }}
            renderItem={item => <UserItem user={item} />}
          />
        </Col>
        <Col s={12} m={8} l={4}>
          <PaginatedCollection
            query={getUserCharacters}
            title={'Forum Posts'}
            search={query}
            dataPath={'getUser.characters'}
            variables={{ id: user.id }}
            renderItem={item => <UserItem user={item} />}
          />
        </Col>
        <Col s={12} m={8} l={4}>
          <PaginatedCollection
            query={getUserCharacters}
            title={'Image Comments'}
            search={query}
            dataPath={'getUser.characters'}
            variables={{ id: user.id }}
            renderItem={item => <UserItem user={item} />}
          />
        </Col>
      </Row>
    </div>
  </div>
}

const Show = () => {
  const { username } = useParams()

  return (
    <Query query={getUser} variables={{ username: username }}>
      {({ data, loading, error }) =>
        loading ? (
          <Loading />
        ) : error ? (
          <Error error={error} />
        ) : (
          <UserView user={data.getUser} />
        )
      }
    </Query>
  )
}

export default Show
