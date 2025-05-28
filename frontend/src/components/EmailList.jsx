import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import { motion } from 'framer-motion'
import '../styles/EmailList.css'

const EmailList = ({ emails }) => {
  const navigate = useNavigate()
  
  if (emails.length === 0) {
    return (
      <div className="empty-inbox">
        <div className="empty-inbox-icon">📭</div>
        <h3>Your inbox is empty</h3>
        <p>New messages will appear here</p>
      </div>
    )
  }

  return (
    <div className="email-list">
      {emails.map((email, index) => (
        <motion.div 
          key={email.timestamp}
          className={`email-item ${email.read ? 'read' : 'unread'}`}
          onClick={() => navigate(`/email/${email.timestamp}`)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.01 }}
        >
          <div className="email-sender-info">
            <div className="email-sender">{email.from.split('<')[0].trim()}</div>
            <div className="email-time">
              {format(new Date(email.timestamp), 'h:mm a')}
            </div>
          </div>
          <div className="email-subject">
            {!email.read && <span className="unread-dot"></span>}
            {email.subject}
          </div>
          <div className="email-preview">
            {email.body_plain.replace(/<[^>]*>/g, '').substring(0, 60)}...
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default EmailList