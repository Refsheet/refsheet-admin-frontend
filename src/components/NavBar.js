import React, {useContext} from 'react'
import Navbar from "react-materialize/lib/Navbar"
import {SessionContext} from "./providers/SessionProvider"

const NavBar = () => {
  const session = useContext(SessionContext)

  return (
    <Navbar>
      { JSON.stringify(session) }
    </Navbar>
  )
}

export default NavBar
