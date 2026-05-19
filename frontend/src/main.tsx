import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from "react-router";
import { LobbyPage } from './pages/Lobby/LobbyPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/lobby/:id" element={<LobbyPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
