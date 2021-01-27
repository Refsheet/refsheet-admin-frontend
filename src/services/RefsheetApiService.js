import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const HOST = window.location.host.match(/refsheet.net$/)
  ? (window.location.hash === '#staging' ? 'https://staging.refsheet.net' : 'https://refsheet.net')
  : 'http://localhost:5000'

const httpLink = new HttpLink({
  uri: `${HOST}/graphql`,
  credentials: 'include',
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
})

export { HOST }
export default client
