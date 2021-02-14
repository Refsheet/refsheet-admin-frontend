import React, { useState } from 'react'
import {
  Row,
  Col,
} from 'react-materialize'
import SearchBar from '../../SearchBar'
import { loader } from 'graphql.macro'
import HistoryCookie from '../../../utils/HistoryCookie'
import PaginatedCollection from '../../PaginatedCollection'

const getUsers = loader('../../../graphql/getUsers.graphql')

const List = () => {
  const [query, setQuery] = useState('')
  const recentUsers = HistoryCookie.getUsers()

  return (
    <div className={'container-large'}>
      <Row>
        <Col s={12} m={8} offset={'m2'}>
          <SearchBar onSearch={setQuery} query={query} />
        </Col>
      </Row>

      <Row>
        <Col s={12} m={6} l={3}>
          <PaginatedCollection
            query={getUsers}
            title={'Recently Viewed'}
            search={query}
            variables={{
              ids: recentUsers,
            }}
            filter={(i) => recentUsers.map((id) => i.find((j) => j.id === id))}
            totalPages={4}
          />
        </Col>
        <Col s={12} m={6} l={3}>
          <PaginatedCollection
            query={getUsers}
            title={'Problem Children'}
            search={query}
            totalPages={4}
          />
        </Col>
        <Col s={12} m={6} l={3}>
          <PaginatedCollection
            query={getUsers}
            title={'Recently Created'}
            search={query}
            totalPages={4}
          />
        </Col>
        <Col s={12} m={6} l={3}>
          <PaginatedCollection
            query={getUsers}
            title={'Recently Reported'}
            search={query}
            totalPages={4}
          />
        </Col>
      </Row>
    </div>
  )
}

export default List
