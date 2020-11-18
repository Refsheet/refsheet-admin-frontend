import React, { useContext } from 'react'
import Navbar from 'react-materialize/lib/Navbar'
import { SessionContext } from './providers/SessionProvider'
import { Icon, NavItem } from 'react-materialize'
import Logo from '../assets/RS_Logo_SVG.svg'

const NavBar = () => {
  const session = useContext(SessionContext)
  if (!session.currentUser) {
    return null
  }

  return (
    <Navbar
      alignLinks="right"
      brand={
        <React.Fragment>
          <a className="brand-logo" href="#">
            <img alt="Refsheet Logo" src={Logo} />
            <span>Refsheet.net</span>
          </a>
          <div className={'status'}></div>
        </React.Fragment>
      }
      id="mobile-nav"
      menuIcon={<Icon>menu</Icon>}
      options={{
        draggable: true,
        edge: 'left',
        inDuration: 250,
        onCloseEnd: null,
        onCloseStart: null,
        onOpenEnd: null,
        onOpenStart: null,
        outDuration: 200,
        preventScrolling: true,
      }}
    >
      <NavItem>
        <span>{session.currentUser.name}</span>
        <img
          src={session.currentUser.avatar_url}
          alt={session.currentUser.username}
        />
      </NavItem>
    </Navbar>
  )
}

export default NavBar
