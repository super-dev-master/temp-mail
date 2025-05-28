import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Sidebar from './components/Sidebar'
import EmailProvider from './context/EmailContext'
import HomePage from './pages/HomePage'
import EmailDetailPage from './pages/EmailDetailPage'
import './styles/App.css'

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <EmailProvider>
      <div className="app-container">
        <Header toggleMobileMenu={toggleMobileMenu} isMobileMenuOpen={isMobileMenuOpen} />
        <div className="app-content">
          <Sidebar isOpen={isMobileMenuOpen || !isMobile} />
          <main className={`main-content ${isMobileMenuOpen && isMobile ? 'hidden' : ''}`}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/email/:id" element={<EmailDetailPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </EmailProvider>
  )
}

export default App