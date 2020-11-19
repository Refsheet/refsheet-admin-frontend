import React, { useContext } from 'react'
import {
  Row,
  Col,
  Collection,
  CollectionItem,
  Icon,
  Button,
} from 'react-materialize'
import { SessionContext } from '../../providers/SessionProvider'
import SearchBar from '../../SearchBar'

const UserListItem = ({ user }) => {
  if (!user) return null

  return (
    <CollectionItem className="avatar">
      <a href="javascript:void(0)">
        <img alt="" className="circle" src={user.avatar_url} />
      </a>
      <a href="javascript:void(0)" className="title">
        {user.name}
      </a>
      <p>@{user.username}</p>
      <a className="secondary-content" href="javascript:void(0)">
        <Icon>flag</Icon>
      </a>
    </CollectionItem>
  )
}

const UserList = () => {
  const session = useContext(SessionContext)
  const users = [
    session.currentUser,
    session.currentUser,
    session.currentUser,
    session.currentUser,
    session.currentUser,
    session.currentUser,
    session.currentUser,
    session.currentUser,
    session.currentUser,
    session.currentUser,
  ]

  return (
    <Collection
      className={'z-depth-1 no-border scrolling'}
      header={'Problem Children'}
    >
      {users.map((user, i) => (
        <UserListItem key={i} user={user} />
      ))}
    </Collection>
  )
}

const Users = () => {
  return (
    <div className={'container-large'}>
      <Row>
        <Col s={12} m={8} offset={'m2'}>
          <SearchBar />
        </Col>
      </Row>

      <Row>
        <Col s={12} m={6} l={3}>
          <UserList />
        </Col>
        <Col s={12} m={6} l={3}>
          <UserList />
        </Col>
        <Col s={12} m={6} l={3}>
          <UserList />
        </Col>
        <Col s={12} m={6} l={3}>
          <UserList />
        </Col>
      </Row>
    </div>
  )
}

export default Users
