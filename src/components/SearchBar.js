import React, { useState } from 'react'
import { Button, Icon } from 'react-materialize'

const SearchBar = ({ onSearch = () => {} }) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleChange = (e) => {
    e.preventDefault()
    setQuery(e.target.value)
  }

  return (
    <form className={'SearchBar'} onSubmit={handleSubmit}>
      <input
        type={'search'}
        placeholder={'What is it you seek, good hunter?'}
        value={query}
        onChange={handleChange}
      />
      <Button type={'submit'} disabled={!query}>
        <Icon>search</Icon>
      </Button>
    </form>
  )
}

export default SearchBar
