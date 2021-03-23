import React from 'react'
import { HOST } from '../../services/RefsheetApiService'

const ExternalLink = ({ href }) => {
  return (
    <a
      href={href}
      target={'_blank'}
      rel="noreferrer"
      style={{ lineHeight: '3rem' }}
      className={'grey-text text-darken-1'}
    >
      <span
        style={{
          display: 'inline-block',
          verticalAlign: 'middle',
          paddingRight: '1rem',
          lineHeight: '3rem',
          height: '3rem',
        }}
      >
        View on Refsheet
      </span>
      <i
        className={'material-icons'}
        style={{ height: '3rem', lineHeight: '3rem', verticalAlign: 'middle' }}
      >
        open_in_new
      </i>
    </a>
  )
}

export default ExternalLink
