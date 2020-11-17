import React, { useEffect, useState } from 'react'
import logo from './assets/RS_Logo_SVG.svg'
import './App.css'
import client from './services/RefsheetApiService'
import { ApolloProvider } from '@apollo/client'
import { Query } from '@apollo/client/react/components'

import { loader } from 'graphql.macro'
import LoginForm from "./components/LoginForm"
const getVersion = loader('./getVersion.graphql')
const getSession = loader('./getSession.graphql')

const TimedVersion = ({ loading, data, error }) => {
  const [start, setStart] = useState(Date.now())
  const [time, setTime] = useState(0)

  useEffect(() => {
    if (loading) {
      setStart(Date.now())
    }
    setTime(Date.now() - start)
  }, [loading])

  if (loading) {
    return <div>Loading...</div>
  }

  if (data.getVersion) {
    return (
      <div>
        Connected to version {data.getVersion.version} in {time}ms.
      </div>
    )
  }

  return <div>Something went sadly incorrect.</div>
}

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <header className="App-header">
          <img width={150} src={logo} className="App-logo" alt="logo" />
          <Query query={getVersion}>
            {({ loading, data, error }) => (
              <TimedVersion loading={loading} data={data} error={error} />
            )}
          </Query>
          <Query query={getSession}>
            {({ loading, data, error }) => (
              <div>{ JSON.stringify({data, loading})} }</div>
            )}
          </Query>
          <LoginForm />
        </header>
      </div>
    </ApolloProvider>
  )
}

export default App
