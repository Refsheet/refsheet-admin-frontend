import React, { useEffect, useState } from 'react'
import logo from './assets/RS_Logo_SVG.svg'
import client from './services/RefsheetApiService'
import { ApolloProvider } from '@apollo/client'
import { Query } from '@apollo/client/react/components'

import { loader } from 'graphql.macro'
import LoginForm from './components/LoginForm'
import SessionProvider from './components/providers/SessionProvider'
import Layout from './components/Layout'

function App() {
  return (
    <ApolloProvider client={client}>
      <SessionProvider>
        <Layout />
      </SessionProvider>
    </ApolloProvider>
  )
}

export default App
