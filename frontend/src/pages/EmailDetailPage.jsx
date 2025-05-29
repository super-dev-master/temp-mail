import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { FaArrowLeft, FaTrash } from 'react-icons/fa'
import { motion } from 'framer-motion'
import DOMPurify from 'dompurify'
import { useEmail } from '../context/EmailContext'
import LoadingSpinner from '../components/LoadingSpinner'
import '../styles/EmailDetailPage.css'

const EmailDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const {emails} = useEmail();
  const [email, setEmail] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    setLoading(true);
    const matched = emails.filter(v => (v.timestamp == id));
    setEmail(matched.length > 0 ? matched[0] : null);
    setLoading(false);
  }, [id])
  
  if (loading) {
    return <LoadingSpinner />
  }
  
  if (!email) {
    return (
      <div className="email-not-found">
        <h2>Email Not Found</h2>
        <p>The email you're looking for doesn't exist or has been deleted.</p>
        <button onClick={() => navigate('/')} className="back-button">
          <FaArrowLeft /> Back to Inbox
        </button>
      </div>
    )
  }
  
  const sanitizedContent = DOMPurify.sanitize(email.body_plain)
  
  return (
    <motion.div 
      className="email-detail-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="email-detail-header">
        <button onClick={() => navigate('/')} className="back-button">
          <FaArrowLeft /> Back
        </button>
      </div>
      
      <div className="email-detail-content">
        <h1 className="email-subject">{email.subject}</h1>
        
        <div className="email-meta">
          <div className="email-sender">From: {email.from}</div>
          <div className="email-date">
            {format(new Date(email.timestamp), 'MMM d, yyyy h:mm a')}
          </div>
        </div>
        
        <div className="email-body">
          <div 
            className="email-html-content"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        </div>
      </div>
    </motion.div>
  )
}

export default EmailDetailPage