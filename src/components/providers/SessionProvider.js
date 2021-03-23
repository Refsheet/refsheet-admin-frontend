import React, { useEffect, useState } from 'react'
import { Query } from '@apollo/client/react/components'
import { loader } from 'graphql.macro'
import { Preloader } from 'react-materialize'

const getSession = loader('../../graphql/getSession.graphql')
const defaultState = {}

const SessionContext = React.createContext(defaultState)

const Loading = () => {
  return (
    <main className={'full-splash'}>
      <div className={'form center'}>
        <Preloader size={'big'} />
        <h1>Loading...</h1>
      </div>
    </main>
  )
}

const getErrorMessage = (error = {}) => {
  const { message, graphQLErrors } = error
  if (message) {
    return message
  } else if (graphQLErrors) {
    return graphQLErrors.map((m) => m.message).join(', ')
  } else {
    console.error(error)
  }
}

const Error = ({ error }) => {
  const message = getErrorMessage(error)
  return (
    <main className={'full-splash'}>
      <div className={'form center'}>
        <h1>Error :(</h1>
        <p className={'larger'}>{message || 'Something went wrong.'}</p>
      </div>
    </main>
  )
}

const SessionProvider = ({ children }) => {
  const [state, setState] = useState(defaultState)

  const renderProvider = ({ data, loading, error }) => {
    useEffect(() => {
      if (data) setState(data.getSession)
    }, [loading])

    return (
      <SessionContext.Provider value={state}>
        {loading ? (
          <Loading />
        ) : error ? (
          <Error message={error} />
        ) : data.getSession && data.getSession.currentUser ? (
          children
        ) : (
          <Error message={'Please login on Refsheet.net first.'} />
        )}
      </SessionContext.Provider>
    )
  }

  return <Query query={getSession}>{renderProvider}</Query>
}

export default SessionProvider
export { SessionContext, Loading, Error }
