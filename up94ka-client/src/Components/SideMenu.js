export const SideMenu = ({ children }) => {
  return (
    <aside className="side-menue">
      <div className="side-container">{children}</div>
      <p className="report">
        {'Нашли ошибку? '}
        <a>Сообщите о ней!</a>
      </p>
    </aside>
  )
}
