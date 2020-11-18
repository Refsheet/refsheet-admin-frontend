import React from 'react'
import { SideNavItem, Icon, SideNav } from 'react-materialize'
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
      <li style={{ paddingTop: 8 }}>
        <NavLink to={'/'} exact activeClassName={'primary-dark white-text'}>
          <Icon className={'prefix'}>dashboard</Icon> Dashboard
        </NavLink>
      </li>
      <li>
        <NavLink to={'/moderation'} activeClassName={'primary-dark white-text'}>
          <Icon className={'prefix'}>report</Icon> Moderation
        </NavLink>
      </li>

      <SideNavItem divider />

      <li style={{ paddingTop: 8 }}>
        <NavLink to={'/users'} activeClassName={'primary-dark white-text'}>
          <Icon className={'prefix'}>person</Icon> Users
        </NavLink>
      </li>
      <li>
        <NavLink to={'/characters'} activeClassName={'primary-dark white-text'}>
          <Icon className={'prefix'}>face</Icon> Characters
        </NavLink>
      </li>
      <li>
        <NavLink to={'/artists'} activeClassName={'primary-dark white-text'}>
          <Icon className={'prefix'}>people</Icon> Artists
        </NavLink>
      </li>
      <li>
        <NavLink to={'/images'} activeClassName={'primary-dark white-text'}>
          <Icon className={'prefix'}>collections</Icon> Images
        </NavLink>
      </li>
      <li>
        <NavLink to={'/forums'} activeClassName={'primary-dark white-text'}>
          <Icon className={'prefix'}>messages</Icon> Forums
        </NavLink>
      </li>

      <SideNavItem divider />

      <li style={{ paddingTop: 8 }}>
        <NavLink to={'/supporters'} activeClassName={'primary-dark white-text'}>
          <Icon className={'prefix'}>monetization_on</Icon> Supporters
        </NavLink>
      </li>
      <li>
        <NavLink to={'/ads'} activeClassName={'primary-dark white-text'}>
          <Icon className={'prefix'}>open_in_new</Icon> Advertising
        </NavLink>
      </li>
    </SideNav>
  )
}

export default Sidebar
