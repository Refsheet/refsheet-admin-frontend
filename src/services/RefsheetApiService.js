import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'

const HOST = 'http://localhost:5000'

const httpLink = new HttpLink({
  uri: `${HOST}/graphql`,
  credentials: 'include',
})

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: httpLink,
})

export { HOST as host }
export default client
