import React, { useState } from 'react'
import { SideMenu } from '../Components/SideMenu'
import DatePicker from 'react-datepicker'
import ru from 'date-fns/locale/ru'
import 'react-datepicker/dist/react-datepicker.css'
import { Modal } from '../Components/Modal'
import { Select } from '../Components/Select'
import { AddPunishmentForm } from '../Components/AddPunishmentForm'
import { FineForm } from '../Components/PunishmentForms/FineForm'
import { ObyazatelnieRaboty } from '../Components/PunishmentForms/ObyazatelnieRaboty'
import { OgranichenieSvobody } from '../Components/PunishmentForms/OgranichenieSvobody'

const mainPunishmentTypes = [
  'Штраф',
  'Лишение права занимать определенные должности или заниматься определенной деятельностью',
  'Обязательные работы',
  'Исправительные работы',
  'Ограничение по военной службе',
  'Ограничение свободы',
  'Принудительные работы',
  'Арест',
  'Содержание в дисциплинарной воинской части',
  'Лишение свободы на определенный срок',
  'Пожизненное лишение свободы',
  'Смертная казнь',
]

const additionalPunishmentTypes = [
  'Штраф',
  'Лишение права занимать определенные должности или заниматься определенной деятельностью',
  'Лишение специального, воинского или почетного звания, классного чина и государственных наград',
  'Ограничение свободы',
]

export const ActVersionPage = () => {
  const [inputs, setInputs] = useState({
    number: '',
    part: '',
    name: '',
    federalLaw: '',
    publishDate: Date.now(),
  })

  const [punishments, setPunishments] = useState([])

  const [modalComponent, setModalComponent] = useState(null)

  const inputChangeHandler = (e) => {
    const name = e.target.name
    const value = e.target.value

    setInputs({ ...inputs, [name]: value })
  }

  const publishDateChangeHandler = (date) => {
    setInputs({ ...inputs, publishDate: Date.parse(date) })
  }

  const addAdditionalPunishmentHandler = (e, i) => {
    e.preventDefault()

    const additionalSubmitHandler = (selectedItem) => {
      let modalForm = null

      const onSave = (rates = [], optional = false) => {
        const additionalPunishment = {
          name: additionalPunishmentTypes[selectedItem],
          optional,
          rates,
        }
        const newPunishments = [...punishments]
        newPunishments[i].additionalPunishments.push(additionalPunishment)
        setPunishments(newPunishments)

        setModalComponent(null)
      }

      switch (selectedItem) {
        case 3:
          modalForm = (
            <OgranichenieSvobody
              onSave={onSave}
              onClose={() => setModalComponent(null)}
            />
          )
      }
      setModalComponent(
        <Modal isOpen onClose={() => setModalComponent(null)}>
          {modalForm}
        </Modal>
      )
    }

    setModalComponent(
      <Modal isOpen onClose={() => setModalComponent(null)}>
        <Select
          header='Дополнительное наказание'
          items={additionalPunishmentTypes}
          onClose={() => setModalComponent(null)}
          onSubmit={additionalSubmitHandler}
        />
      </Modal>
    )
  }

  const addMainPunishmentHandler = (e) => {
    e.preventDefault()

    const mainSubmitHandler = (selectedItem) => {
      let modalForm = null

      const onSave = (rates = []) => {
        const mainPunishment = {
          name: mainPunishmentTypes[selectedItem],
          rates,
          additionalPunishments: [],
        }
        const newPunishments = [...punishments]
        newPunishments.push(mainPunishment)
        setPunishments(newPunishments)

        setModalComponent(null)
      }

      switch (selectedItem) {
        case 2:
          modalForm = (
            <ObyazatelnieRaboty
              onSave={onSave}
              onClose={() => setModalComponent(null)}
            />
          )
      }
      setModalComponent(
        <Modal isOpen onClose={() => setModalComponent(null)}>
          {modalForm}
        </Modal>
      )
    }

    setModalComponent(
      <Modal isOpen onClose={() => setModalComponent(null)}>
        <Select
          header='Основное наказание'
          items={mainPunishmentTypes}
          onClose={() => setModalComponent(null)}
          onSubmit={mainSubmitHandler}
        />
      </Modal>
    )
  }

  const submitHandler = (e) => {
    e.preventDefault()
  }

  return (
    <>
      <SideMenu>
        <div className='side-header'>
          <h2>Изменения НПА</h2>
          <button className='btn btn-submit'>Внести</button>
        </div>
        <input type='text' placeholder='Найти...' className='search' />
        <ul>
          <li className='important'>217.1 (30.05.2021)</li>
        </ul>
      </SideMenu>
      <main>
        <div className='content-container'>
          <h1>Внесение редакции НПА</h1>
          <form className='card form'>
            <h2 className='card__header'>Основная информация</h2>
            <div className='form__input-labeled'>
              <label htmlFor=''>Статья и часть</label>
              <div className='input-set'>
                <input
                  type='text'
                  placeholder='Номер'
                  value={inputs.number}
                  className='form__input'
                  name='number'
                  onChange={inputChangeHandler}
                />
                <input
                  type='text'
                  placeholder='Часть'
                  className='form__input'
                  value={inputs.part}
                  name='part'
                  onChange={inputChangeHandler}
                />
              </div>
            </div>
            <div className='form__input-labeled'>
              <label htmlFor=''>В редакции от</label>
              <div className='input-set'>
                <input
                  type='text'
                  placeholder='ФЗ'
                  value={inputs.federalLaw}
                  className='form__input'
                  name='federalLaw'
                  onChange={inputChangeHandler}
                />
                <DatePicker
                  name='publishDate'
                  locale={ru}
                  className='form__input'
                  selected={inputs.publishDate}
                  onChange={publishDateChangeHandler}
                  minDate={Date.parse('Jan 1, 1996')}
                  maxDate={Date.now()}
                  dateFormat='dd.MM.yyyy'
                />
              </div>
            </div>
            <input
              type='text'
              placeholder='Полное наименование НПА'
              value={inputs.name}
              className='form__input-long'
              name='name'
              onChange={inputChangeHandler}
            />
            <h2 className='card__header'>Виды наказаний</h2>
            <div className='grid-width punishments-area'>
              {punishments.map((mPunishment, i) => (
                <div className='punishment-item' key={i}>
                  <p className='punishment-name'>{mPunishment.name}❌</p>
                  {mPunishment.rates.map((rate, k) => (
                    <p key={k}>
                      От {rate.from} до {rate.to} часов
                    </p>
                  ))}

                  {mPunishment.additionalPunishments.map((aPunishment, i) => (
                    <div className='punishment-item additional' key={i}>
                      <p className='punishment-name'>{aPunishment.name}❌</p>
                      {aPunishment.rates.map((rate, k) => (
                        <p key={k}>
                          От {rate.from} до {rate.to} месяцев
                        </p>
                      ))}
                    </div>
                  ))}
                  <button
                    className='btn btn-submit additional'
                    onClick={(e) => addAdditionalPunishmentHandler(e, i)}
                  >
                    Добавть дополнительное наказание
                  </button>
                </div>
              ))}
              <button
                className='btn btn-submit'
                onClick={addMainPunishmentHandler}
              >
                Добавть основное наказание
              </button>
            </div>
            <div className='input-set grid-width'>
              <button className='btn btn-cancel' onClick={submitHandler}>
                Отклонить
              </button>
              <button className='btn btn-ok' onClick={submitHandler}>
                Принять
              </button>
            </div>
          </form>
          {modalComponent}
        </div>
      </main>
    </>
  )
}
