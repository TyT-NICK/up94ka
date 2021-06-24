import React, { useState } from 'react'

export const Select = ({ header, items, onClose, onSubmit }) => {
  const [selected, setSelected] = useState(0)

  const nextHandler = (e) => {
    e.preventDefault()
    onSubmit(selected)
  }

  const closeHandler = (e) => {
    e.preventDefault()
    onClose()
  }

  return (
    <div className='card select'>
      <h2 className='card__header'>{header}</h2>
      <ul>
        {items.map((item, i) => (
          <li
            className={i === selected ? 'selected' : undefined}
            onClick={() => setSelected(i)}
            key={item}
          >
            {item}
          </li>
        ))}
      </ul>
      <div className='input-set'>
        <button className='btn btn-cancel' onClick={closeHandler}>
          Закрыть
        </button>
        <button className='btn btn-ok' onClick={nextHandler}>
          Далее
        </button>
      </div>
    </div>
  )
}
