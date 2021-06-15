import React from 'react'
import { Route, Switch } from 'react-router'
import { AdminMenu } from '../Components/AdminMenu'
import { Header } from '../Components/Header'
import { ActVersionPage } from './ActVersionPage'

export const AdminPage = () => {
  return (
    <div className='page page-admin'>
      <Header />
      <AdminMenu />
      <Switch>
        <Route path='/admin/act-versions'>
          <ActVersionPage />
        </Route>
      </Switch>
    </div>
  )
}
