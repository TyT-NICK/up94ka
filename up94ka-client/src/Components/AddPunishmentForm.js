import React from 'react'

export const AddPunishmentForm = ({ name, isAdditional, children }) => {
  return (
    <form className='card'>
      <h2 className='card__header'>{name}</h2>
      {isAdditional && (
        <>
          <label htmlFor=''>Необязательное</label>
          <input type='checkbox' />
        </>
      )}
      {children}
    </form>
  )
}
