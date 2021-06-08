import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserInfo } from '../Hooks/userInfo.hook'
import './Header.css'

export const Header = () => {
  const { userName } = useUserInfo()
  const [isMenuVisible, setMenuVisible] = useState(false)

  const toggleMenu = (e) => {
    e.preventDefault()
    setMenuVisible(!isMenuVisible)
  }

  return (
    <header className="header">
      <span className="header__logo">ОУПН</span>
      <div className="header__user-info">
        <p>
          {'Добро пожаловать, '}
          <a onClick={toggleMenu} className="header__user-name">
            {userName}
          </a>
        </p>
        <ul className={'menu header__menu ' + (!isMenuVisible && 'hidden')}>
          <li className="menu__item">
            <Link>Войти</Link>
          </li>
          <li className="menu__item">
            <Link>Зарегистрироваться</Link>
          </li>
        </ul>
      </div>
    </header>
  )
}
