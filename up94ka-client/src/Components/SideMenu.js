import { useState } from 'react'
import { Modal } from './Modal'

export const SideMenu = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const reportClickHandler = (e) => {
    e.preventDefault()

    setIsModalOpen(true)
  }

  return (
    <>
      <aside className='side-menu'>
        <div className='side-container'>{children}</div>
        <p className='side-menu__report'>
          {'Нашли ошибку? '}
          <span
            onClick={reportClickHandler}
            className='side-menu__report-button'
          >
            Сообщите о ней!
          </span>
        </p>
      </aside>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        123
      </Modal>
    </>
  )
}
