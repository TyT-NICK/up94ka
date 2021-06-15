import React from 'react'
import { NavLink } from 'react-router-dom'

export const AdminMenu = () => {
  return (
    <nav className='admin-menu'>
      <NavLink className='admin-menu__item' to='/admin/act-versions'>
        gavel
      </NavLink>
      <NavLink className='admin-menu__item' to='/admin/users'>
        manage_accounts
      </NavLink>
      <NavLink className='admin-menu__item' to='/admin/notifications'>
        notifications
      </NavLink>
    </nav>
  )
}
