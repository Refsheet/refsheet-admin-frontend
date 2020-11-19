import React from 'react'
import NavBar from './NavBar'
import SideNav from './SideNav'

const Layout = ({ children }) => {
  return (
    <div className="App">
      <NavBar />
      <SideNav />
      <main className={'content'}>{children}</main>
    </div>
  )
}

export default Layout
