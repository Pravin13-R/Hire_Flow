import './App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/layout/Navbar.jsx'
import Sidebar from './components/layout/Sidebar.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Candidates from './pages/candidates/Candidates.jsx'
import AddCandidate from './pages/candidates/AddCandidate.jsx'
import CandidateDetails from './pages/candidates/CandidateDetails'
import CandidateEdit from './pages/candidates/CandidateEdit.jsx'
import Jobs from './pages/jobs/Jobs.jsx'
import AddJob from './pages/jobs/AddJob.jsx'
import Pipeline from './pages/Pipeline.jsx'
import Interviews from './pages/Interviews.jsx'
import SkillMatching from './pages/SkillMatching.jsx'
import Analytics from './pages/Analytics.jsx'
import Messages from './pages/Messages.jsx'
import Team from './pages/Team.jsx'
import Settings from './pages/Settings.jsx'


function App() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main">
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/candidates" element={<Candidates />} />
          <Route path="/candidates/add" element={<AddCandidate />} />
          <Route path="/candidates/edit/:id" element={<CandidateEdit />} />
          <Route path="/candidates/:id" element={<CandidateDetails />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/jobs/add" element={<AddJob />} />
            <Route path="/pipelines" element={<Pipeline />} />
            <Route path='/interviews' element={<Interviews />} />
            <Route path='/skill-matching' element={<SkillMatching />} />
            <Route path='/analytics' element={<Analytics />} />
            <Route path='/messages' element={<Messages />} />
            <Route path='/team' element={<Team />} />
            <Route path='/settings' element={<Settings />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
