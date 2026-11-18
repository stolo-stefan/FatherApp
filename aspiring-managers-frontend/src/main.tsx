import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { InternalLinkContext } from './lib/internalLink'
import { BrowserRouter, Link } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <InternalLinkContext.Provider value={Link}>
        <App />
      </InternalLinkContext.Provider>
    </BrowserRouter>
  </StrictMode>,
)
