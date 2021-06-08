import { Header } from './Components/Header'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import './App.css'
import { PunishmentPage } from './Pages/PunishmentPage'

function App() {
  return (
    <Router>
      <Header></Header>

      <Switch>
        <Route path="/punishment">
          <PunishmentPage />
        </Route>
      </Switch>
      <Redirect to="/punishment" />
    </Router>
  )
}

export default App
