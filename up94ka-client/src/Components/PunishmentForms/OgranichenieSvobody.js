import React, { useState } from 'react'

export const OgranichenieSvobody = ({ isAdditional, onSave, onClose }) => {
  const [rates, setRates] = useState([{ from: '', to: '', measure: 'month' }])

  const inputChangeHandler = (e, i) => {
    const { name, value } = e.target

    const newRates = [...rates]
    newRates[i] = { ...newRates[i], [name]: value }
    setRates(newRates)
  }

  const closeHandler = (e) => {
    e.preventDefault()
    onClose()
  }

  const saveHandler = (e) => {
    e.preventDefault()
    onSave(rates)
  }

  return (
    <form className='form card'>
      <h2 className='card__header'>Ограничение свободы</h2>
      {isAdditional && (
        <>
          <label htmlFor=''>Необязательное</label>
          <input type='checkbox' />
        </>
      )}
      <div className='input-set'>
        <label htmlFor=''>От</label>
        <input
          type='text'
          placeholder='от'
          value={rates.from}
          className='form__input'
          name='from'
          onChange={(e) => inputChangeHandler(e, 0)}
        />
        <select name='measureFrom'>
          <option>мес.</option>
          <option>лет</option>
        </select>
        <label htmlFor=''>до</label>
        <input
          type='text'
          placeholder='до'
          value={rates.to}
          className='form__input'
          name='to'
          onChange={(e) => inputChangeHandler(e, 0)}
        />
        <select name='measureTo' defaultValue='1'>
          <option>мес.</option>
          <option>лет</option>
        </select>
      </div>
      <div className='input-set grid-width'>
        <button className='btn btn-cancel' onClick={closeHandler}>
          Отмена
        </button>
        <button className='btn btn-ok' onClick={saveHandler}>
          Отправить
        </button>
      </div>
    </form>
  )
}
