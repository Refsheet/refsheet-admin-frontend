import { CollectionItem as CI } from 'react-materialize'
import { Link } from 'react-router-dom'
import React from 'react'

const ForumPostItem = ({ post }) => {
  if (!post) return null

  const { discussion = {} } = post
  const { forum = {} } = discussion

  return (
    <CI>
      <Link
        to={'/forums/' + forum.slug + '/' + discussion.slug + '#' + post.id}
        className="title"
      >
        RE: {discussion.topic}
      </Link>
      <p className={'grey-text text-darken-1'}>{post.content.substr(0, 65)}</p>
      {/*<a className="secondary-content" href="javascript:void(0)">*/}
      {/*  <Icon className={'grey-text'}>star_outline</Icon>*/}
      {/*</a>*/}
    </CI>
  )
}

export default ForumPostItem
