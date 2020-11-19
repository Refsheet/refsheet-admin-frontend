import React, { useEffect } from 'react'
import { Query } from '@apollo/client/react/components'
import { Error, Loading } from '../../providers/SessionProvider'
import { loader } from 'graphql.macro'
import HistoryCookie from '../../../utils/HistoryCookie'
import { useParams } from 'react-router'

const getUser = loader('../../../graphql/getUser.graphql')

const UserView = ({ user }) => {
  useEffect(() => {
    if (user.id) {
      HistoryCookie.addUser(user.id)
    }
  }, [user.id])

  return <div className={'Users-Show'}>{JSON.stringify(user)}</div>
}

const Show = () => {
  const { username } = useParams()

  return (
    <div className={'container-large'}>
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
    </div>
  )
}

export default Show
