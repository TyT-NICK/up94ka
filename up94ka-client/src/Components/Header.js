import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useUserInfo } from '../Hooks/userInfo.hook'
import { HeaderMenu } from './HeaderMenu'

export const Header = () => {
  const { userName } = useUserInfo()
  const [isMenuVisible, setMenuVisible] = useState(false)

  const toggleMenu = (e) => {
    e.preventDefault()
    setMenuVisible(!isMenuVisible)
  }

  return (
    <header className='header'>
      <Link to='/punishment'>
        <span className='header__logo'>ОУПН</span>
      </Link>
      <div className='header__user-info'>
        <p>
          {'Добро пожаловать, '}
          <a onClick={toggleMenu} className='header__user-name'>
            {userName}
          </a>
        </p>
        <HeaderMenu isMenuVisible={isMenuVisible} />
      </div>
    </header>
  )
}
