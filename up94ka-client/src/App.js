import React, { useState } from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import { PunishmentPage } from './Pages/_PunishmentPage'
import { AdminPage } from './Pages/_AdminPage'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/punishment'>
          <PunishmentPage />
        </Route>
        <Route path='/admin'>
          <AdminPage />
        </Route>
      </Switch>
      <Redirect to='/punishment' />
    </Router>
  )
}

export default App
