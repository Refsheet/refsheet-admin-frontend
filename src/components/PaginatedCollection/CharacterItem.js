import { CollectionItem as CI, Icon } from 'react-materialize'
import { Link } from 'react-router-dom'
import React from 'react'

const CharacterItem = ({ character }) => {
  if (!character) return null

  return (
    <CI className="avatar">
      <Link to={'/characters/' + character.shortcode}>
        <img
          alt=""
          className="circle"
          src={character.profile_image.url.small_square}
        />
      </Link>
      <Link to={'/characters/' + character.shortcode} className="title">
        {character.name}
      </Link>
      <p className={'grey-text text-darken-1'}>!{character.shortcode}</p>
      <a className="secondary-content" href="javascript:void(0)">
        <Icon className={'grey-text'}>star_outline</Icon>
      </a>
    </CI>
  )
}

export default CharacterItem
