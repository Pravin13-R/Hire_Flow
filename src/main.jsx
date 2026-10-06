import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CandidateteProvider } from './context/CandidateContext.jsx'
import { JobProvider } from './context/JobContext.jsx'
import { InterviewProvider } from './context/InterviewContext.jsx'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { TeamProvider } from './context/TeamContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
  <CandidateteProvider>
    <JobProvider>
      <InterviewProvider>
        <TeamProvider>
          <App />
        </TeamProvider>
      </InterviewProvider>
    </JobProvider>
  </CandidateteProvider>
</BrowserRouter>
  </StrictMode>,
)
