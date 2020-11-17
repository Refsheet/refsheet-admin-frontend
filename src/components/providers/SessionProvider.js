import React, {useEffect, useState} from 'react'
import {Query} from "@apollo/client/react/components"
import { loader } from 'graphql.macro'

const getSession = loader('../../graphql/getSession.graphql')
const defaultState = {}

const SessionContext = React.createContext(defaultState)

const SessionProvider = ({ children }) => {
  const [state, setState] = useState(defaultState)

  const renderProvider = ({ data, loading, error }) => {
    useEffect(() => {
      if (data)
        setState(data.getSession)
    }, [loading])

    return (
      <SessionContext.Provider value={state}>
        { children }
      </SessionContext.Provider>
    )
  }

  return (
    <Query query={getSession}>
      {renderProvider}
    </Query>
  )
}

export default SessionProvider
export { SessionContext }
