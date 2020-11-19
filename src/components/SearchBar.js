import React, { useState } from 'react'
import { Button, Icon } from 'react-materialize'

const SearchBar = ({ onSearch = () => {}, query: defaultQuery = '' }) => {
  const [query, setQuery] = useState(defaultQuery)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleChange = (e) => {
    e.preventDefault()
    setQuery(e.target.value)
  }

  const handleClear = (e) => {
    e.preventDefault()
    setQuery('')
    onSearch('')
  }

  return (
    <React.Fragment>
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

      <div className={'grey-text text-darken-2 search-results'}>
        {defaultQuery ? (
          <React.Fragment>
            <span className={'right'}>
              <a href={'#'} onClick={handleClear}>
                clear
              </a>
            </span>
            Results for: <strong>{defaultQuery}</strong>
          </React.Fragment>
        ) : (
          ''
        )}
      </div>
    </React.Fragment>
  )
}

export default SearchBar
