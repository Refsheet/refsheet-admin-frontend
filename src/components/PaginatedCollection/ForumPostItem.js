import { CollectionItem as CI } from 'react-materialize'
import { Link } from 'react-router-dom'
import React from 'react'

const ForumPostItem = ({ post }) => {
  if (!post) return null

  const {
    discussion,
    content = ""
  } = post || {}

  const {
    forum = {},
    slug: discussionSlug
    topic: discussionTopic
  } = discussion || {}

  console.log({ post })

  return (
    <CI>
      <Link
        to={'/forums/' + forum.slug + '/' + discussionSlug + '#' + post.id}
        className="title"
      >
        RE: {discussionTopic || "<deleted>"}
      </Link>
      <p className={'grey-text text-darken-1'}>{(content||"<deleted>").substr(0, 65)}</p>
      {/*<a className="secondary-content" href="javascript:void(0)">*/}
      {/*  <Icon className={'grey-text'}>star_outline</Icon>*/}
      {/*</a>*/}
    </CI>
  )
}

export default ForumPostItem
