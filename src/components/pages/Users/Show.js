import React, { useEffect, useState } from 'react'
import { Query } from '@apollo/client/react/components'
import { Error, Loading } from '../../providers/SessionProvider'
import { loader } from 'graphql.macro'
import HistoryCookie from '../../../utils/HistoryCookie'
import { useParams } from 'react-router'
import { Row, Col, Card, Icon } from 'react-materialize'
import PaginatedCollection from '../../PaginatedCollection'
import SearchBar from '../../SearchBar'
import { HOST } from '../../../services/RefsheetApiService'
import Moment from 'react-moment'
import CharacterItem from '../../PaginatedCollection/CharacterItem'
import ForumPostItem from '../../PaginatedCollection/ForumPostItem'

const getUser = loader('../../../graphql/getUser.graphql')
const getUserCharacters = loader('../../../graphql/getUserCharacters.graphql')
const getUserForumPosts = loader('../../../graphql/getUserForumPosts.graphql')

const UserView = ({ user }) => {
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (user.id) {
      HistoryCookie.addUser(user.id)
    }
  }, [user.id])

  return (
    <div className={'Users-Show'}>
      <div className={'container'}>
        <Row>
          <Col s={12}>
            <Card style={{ marginTop: '1.5rem' }}>
              <div className={'right'}>
                <a
                  href={HOST + '/' + user.username}
                  target={'_blank'}
                  rel="noreferrer"
                  className={'grey-text text-darken-1'}
                >
                  <Icon>open_in_new</Icon>
                </a>
              </div>
              <img
                className={'avatar circle left'}
                style={{ marginRight: '1rem' }}
                src={user.avatar_url}
                alt={user.username}
                width={56}
              />
              <span className={'card-title'} style={{ marginBottom: 0 }}>
                {user.name}
              </span>
              <span className={'grey-text text-darken-1'}>
                @{user.username}&nbsp;&nbsp;|&nbsp;&nbsp;{user.id}
              </span>
              <br className={'clearfix'} />
              <table className={'attributes'} style={{ marginTop: '1.5rem' }}>
                <tbody>
                  <tr>
                    <th>Email Address</th>
                    <td>
                      {user.email}
                      {user.email_confirmed_at && (
                        <span>&nbsp;(Confirmed)</span>
                      )}
                    </td>
                  </tr>
                  {user.unconfirmed_email && (
                    <tr>
                      <th>Unconfirmed Email</th>
                      <td>{user.unconfirmed_email}</td>
                    </tr>
                  )}
                  <tr>
                    <th width={'150px'}>Member Since</th>
                    <td>
                      <Moment unix format={'MM/DD/YYYY'}>
                        {user.created_at}
                      </Moment>
                    </td>
                  </tr>
                  <tr>
                    <th>Last Login</th>
                    <td>
                      <Moment unix format={'MM/DD/YYYY'}>
                        {user.last_seen_at}
                      </Moment>
                    </td>
                  </tr>
                  <tr>
                    <th>Support Pledge</th>
                    <td>{user.support_pledge_amount}</td>
                  </tr>
                  <tr>
                    <th>Flags</th>
                    <td>?</td>
                  </tr>
                </tbody>
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
              noPagination
              variables={{ id: user.id }}
              renderItem={(item) => <CharacterItem character={item} />}
            />
          </Col>
          <Col s={12} m={8} l={4}>
            <PaginatedCollection
              query={getUserForumPosts}
              title={'Forum Posts'}
              search={query}
              renderItem={(item) => <ForumPostItem post={item} />}
              variables={{ userId: user.id }}
            />
          </Col>
          <Col s={12} m={8} l={4}>
            <PaginatedCollection
              query={getUserCharacters}
              title={'Image Comments'}
              search={query}
              dataPath={'getUser.characters'}
              noPagination
              variables={{ id: user.id }}
              renderItem={(item) => <CharacterItem character={item} />}
            />
          </Col>
        </Row>
      </div>
    </div>
  )
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
