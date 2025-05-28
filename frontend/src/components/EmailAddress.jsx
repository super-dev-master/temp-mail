import { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { FaCopy, FaCheck } from 'react-icons/fa'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/EmailAddress.css'

const EmailAddress = ({ email }) => {
  const [copied, setCopied] = useState(false)
  
  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  
  return (
    <div className="email-address-container">
      <div className="email-address-card">
        <div className="email-address">{email}</div>
        <CopyToClipboard text={email} onCopy={handleCopy}>
          <motion.button 
            className="copy-button"
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaCheck />
                  <span>Copied!</span>
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <FaCopy />
                  <span>Copy</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </CopyToClipboard>
      </div>
    </div>
  )
}

export default EmailAddress