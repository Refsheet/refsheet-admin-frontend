import React from 'react'
import { Route, Switch } from 'react-router'
import Show from './Show'
import List from './List'

const Users = () => {
  return (
    <Switch>
      <Route path={'/characters/:shortcode/edit'}>
        <div>edit</div>
      </Route>
      <Route path={'/characters/:shortcode'}>
        <Show username={''} />
      </Route>
      <Route path={'/characters'}>
        <List />
      </Route>
    </Switch>
  )
}

export default Users
