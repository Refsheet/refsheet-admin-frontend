import React from 'react'
import { Icon, SideNav } from 'react-materialize'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <SideNav
      id="SideNav"
      options={{
        draggable: true,
      }}
      fixed
    >
      <li>
        <NavLink to={'/'} exact activeClassName={'primary-dark white-text'}>
          <Icon className={'prefix'}>dashboard</Icon> Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to={'/settings'} activeClassName={'primary-dark white-text'}>
          <Icon className={'prefix'}>settings</Icon> Settings
        </NavLink>
      </li>
      <li>
        <NavLink to={'/console'} activeClassName={'primary-dark white-text'}>
          <Icon className={'prefix'}>code</Icon> Serial Console
        </NavLink>
      </li>

      {/*<SideNavItem href="#!second">*/}
      {/*Second Link*/}
      {/*</SideNavItem>*/}

      {/*<SideNavItem subheader>*/}
      {/*Subheader*/}
      {/*</SideNavItem>*/}
    </SideNav>
  )
}

export default Sidebar
