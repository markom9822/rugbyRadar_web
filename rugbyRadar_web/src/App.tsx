import {Route, Routes } from 'react-router-dom'
import './App.css'
import { HeaderBanner } from './components/HeaderBanner'
import { FixturesPage } from './pages/FixturesPage'
import { TeamsPage } from './pages/TeamsPage'
import { LeaguesPage } from './pages/LeaguesPage'

function App() {

  return (
    <>
      <HeaderBanner/>

        <Routes>
          <Route path="/" element={<FixturesPage />} />
          <Route path="/teams" element={<TeamsPage />} />
          <Route path="/leagues" element={<LeaguesPage />} />
        </Routes>
    </>
  )
}

export default App
