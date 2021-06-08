import { useState, useEffect } from 'react'
import { useQuery } from '../Hooks/query.hook'
import { SideMenu } from '../Components/SideMenu'

export const PunishmentPage = () => {
  // const query = useQuery()
  const [inputs, setInputs] = useState({})

  // useEffect(() => {
  //   setInputs(query)
  // }, [query])

  return (
    <div className="page">
      <SideMenu>123</SideMenu>
      <main>213</main>
    </div>
  )
}
