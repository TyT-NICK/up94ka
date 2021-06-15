import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLocation } from 'react-router-dom'

import { SideMenu } from '../Components/SideMenu'
import { PunishmentForm } from '../Components/PunishmentForm'
import { Header } from '../Components/Header'
import { Modal } from '../Components/Modal'

export const PunishmentPage = () => {
  const [inputs, setInputs] = useState({
    crimeDate: Date.now(),
    decisionDate: Date.now(),
    number: '',
    part: '',
  })

  const [error, setError] = useState(null)

  const formSubmitHandler = (e, { number, part, crimeDate, decisionDate }) => {
    e.preventDefault()

    if (!number || !part || !crimeDate || !decisionDate)
      return setError('Все поля должны быть заполнены')

    if (crimeDate >= decisionDate)
      return setError(
        'Дата совершения преступления должна быть меньше даты вынесения решения'
      )
  }

  return (
    <div className='page page-punishment'>
      <Header></Header>
      <SideMenu>
        <h2>История запросов</h2>
        <input type='text' placeholder='Найти...' className='search' />
        <ul>
          <li>
            <Link to='/punishment?part=1'>123</Link>
          </li>
        </ul>
      </SideMenu>
      <main>
        <div className='content-container'>
          <h1>Подбор наказания</h1>
          <PunishmentForm
            inputs={inputs}
            onSubmit={formSubmitHandler}
            onChange={setInputs}
          />
        </div>
      </main>
      {error && (
        <Modal isOpen={true} onClose={() => setError(null)}>
          {error}
        </Modal>
      )}
    </div>
  )
}
