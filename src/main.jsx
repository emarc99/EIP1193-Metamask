import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { MetaMaskProvider } from './context/useMetaMask.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MetaMaskProvider>
      <App />
    </MetaMaskProvider>
  </StrictMode>,
)
