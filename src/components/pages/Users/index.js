import React from 'react'
import { Route, Switch } from 'react-router'
import Show from './Show'
import List from './List'

const Users = () => {
  return (
    <Switch>
      <Route path={'/users/:username/edit'}>
        <div>edit</div>
      </Route>
      <Route path={'/users/:username'}>
        <Show username={''} />
      </Route>
      <Route path={'/users'}>
        <List />
      </Route>
    </Switch>
  )
}

export default Users
