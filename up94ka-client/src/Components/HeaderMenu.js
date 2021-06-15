import React from 'react'
import { Link } from 'react-router-dom'

export const HeaderMenuLink = ({ children, to }) => {
  return (
    <li className='menu__item'>
      <Link to={to}>{children}</Link>
    </li>
  )
}

export const HeaderMenu = ({ isMenuVisible }) => {
  return (
    <ul className={'menu header__menu ' + (!isMenuVisible && 'hidden')}>
      <HeaderMenuLink to='/admin/act-versions'>Профиль</HeaderMenuLink>
      <HeaderMenuLink to='/admin/act-versions'>Оповещения</HeaderMenuLink>

      <hr className='menu__divider' />

      <HeaderMenuLink to='/admin/act-versions'>
        Администрирование
      </HeaderMenuLink>

      <hr className='menu__divider' />

      <HeaderMenuLink to='/admin/act-versions'>Выйти</HeaderMenuLink>
    </ul>
  )
}
