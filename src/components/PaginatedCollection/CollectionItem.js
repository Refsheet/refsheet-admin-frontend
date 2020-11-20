import React from 'react'
import { CollectionItem as CI, Icon } from 'react-materialize'
import { Link } from 'react-router-dom'

const CollectionItem = ({ user }) => {
  if (!user) return null

  return (
    <CI className="avatar">
      <Link to={'/users/' + user.username}>
        <img alt="" className="circle" src={user.avatar_url} />
      </Link>
      <Link to={'/users/' + user.username} className="title">
        {user.name}
      </Link>
      <p>@{user.username}</p>
      <a className="secondary-content" href="javascript:void(0)">
        <Icon className={'grey-text'}>star_outline</Icon>
      </a>
    </CI>
  )
}

export default CollectionItem
