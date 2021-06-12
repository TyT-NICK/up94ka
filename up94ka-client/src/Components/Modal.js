import React from 'react'
import ReactDOM from 'react-dom'

export const Modal = ({ isOpen, children, onClose }) => {
  if (!isOpen) return null

  return ReactDOM.createPortal(
    <>
      <div className='modal__overlay' onClick={onClose}></div>
      <div className='modal__container'>{children}</div>
    </>,
    document.querySelector('.modal')
  )
}

