import {Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import { HeaderBanner } from './components/HeaderBanner'
import { FixturesPage } from './pages/FixturesPage'
import { TeamsPage } from './pages/TeamsPage'
import { LeaguesPage } from './pages/LeaguesPage'

const Layout = () => (
  <div style={{ padding: "1rem", backgroundColor: "#f0f0f0"}}>
    <HeaderBanner />
    {/* Other consistent elements can go here */}
    <Outlet />
  </div>
);

function App() {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<FixturesPage />} />
        <Route path="/teams" element={<TeamsPage />} />
        <Route path="/leagues" element={<LeaguesPage />} />
      </Route>
    </Routes>
  )
}

export default App
