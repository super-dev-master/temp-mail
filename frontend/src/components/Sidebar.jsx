import { useEmail } from '../context/EmailContext'
import { FaSync, FaRandom } from 'react-icons/fa'
import { motion } from 'framer-motion'
import '../styles/Sidebar.css'

const Sidebar = ({ isOpen }) => {
  const { refreshInbox, getNewEmail, isLoading } = useEmail()
  
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-content">
        <div className="sidebar-section">
          <h3>Actions</h3>
          <motion.button
            className="sidebar-button"
            onClick={refreshInbox}
            disabled={isLoading}
            whileTap={{ scale: 0.95 }}
          >
          <FaSync className={isLoading ? 'spin' : ''} />
            Refresh Inbox
          </motion.button>
          
          <motion.button
            className="sidebar-button warning"
            onClick={getNewEmail}
            whileTap={{ scale: 0.95 }}
          >
            <FaRandom />
            Get New Email
          </motion.button>
        </div>
        
        <div className="sidebar-section">
          <h3>Information</h3>
          <div className="info-box">
            <p>
              Temporary emails last for 24 hours. All messages are automatically 
              deleted after this period.
            </p>
          </div>
        </div>
        
        <div className="sidebar-section">
          <h3>Premium Features</h3>
          <ul className="feature-list">
            <li>Custom domains</li>
            <li>Extended email storage (7 days)</li>
            <li>No advertisements</li>
            <li>Priority support</li>
          </ul>
          <motion.button 
            className="premium-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Upgrade to Premium
          </motion.button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar