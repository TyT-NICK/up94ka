import { useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import ru from 'date-fns/locale/ru'
import 'react-datepicker/dist/react-datepicker.css'

export const PunishmentForm = ({ onSubmit, inputs, onChange }) => {
  // const [inputs, setInputs] = useState({
  //   crimeDate: Date.now(),
  //   decisionDate: Date.now(),
  //   number: '',
  //   part: '',
  // })

  const handleCrimeDateChange = (date) => {
    onChange({ ...inputs, crimeDate: Date.parse(date) })
  }

  const handleDecisionDateChange = (date) => {
    onChange({ ...inputs, decisionDate: Date.parse(date) })
  }

  const handleInputChange = (e) => {
    const name = e.target.name
    const value = e.target.value

    onChange({ ...inputs, [name]: value })
  }

  return (
    <form
      action=''
      onSubmit={(e) => onSubmit(e, inputs)}
      className='punishment-form form card'
    >
      <label htmlFor=''>Квалификация преступления</label>
      <div className='input-set'>
        <input
          type='text'
          placeholder='Номер'
          id='number'
          className='form__input'
          value={inputs.number}
          name='number'
          onChange={handleInputChange}
        />
        <input
          type='text'
          placeholder='Часть'
          value={inputs.part}
          className='form__input'
          name='part'
          onChange={handleInputChange}
        />
      </div>
      <label htmlFor=''>Дата совершения преступления</label>
      <div className='input-set'>
        <DatePicker
          name='crimeDate'
          locale={ru}
          selected={inputs.crimeDate}
          onChange={handleCrimeDateChange}
          className='form__input'
          minDate={Date.parse('Jan 1, 1996')}
          maxDate={Date.now()}
          dateFormat='dd.MM.yyyy'
        />
      </div>
      <label htmlFor=''>Дата вынесения решения</label>
      <div className='input-set'>
        <DatePicker
          name='decisionDate'
          locale={ru}
          className='form__input'
          selected={inputs.decisionDate}
          onChange={handleDecisionDateChange}
          minDate={Date.parse('Jan 1, 1996')}
          maxDate={Date.now()}
          dateFormat='dd.MM.yyyy'
        />
      </div>
      <button type='submit' className='btn btn-submit'>
        Узнать наказание
      </button>
    </form>
  )
}
