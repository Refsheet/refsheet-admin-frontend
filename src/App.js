import React, { useEffect, useState } from 'react'
import client from './services/RefsheetApiService'
import { ApolloProvider } from '@apollo/client'
import SessionProvider from './components/providers/SessionProvider'
import Layout from './components/Layout'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <ApolloProvider client={client}>
      <SessionProvider>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </SessionProvider>
    </ApolloProvider>
  )
}

export default App
