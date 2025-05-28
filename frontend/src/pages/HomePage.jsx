import { useEmail } from '../context/EmailContext'
import EmailAddress from '../components/EmailAddress'
import EmailList from '../components/EmailList'
import LoadingSpinner from '../components/LoadingSpinner'
import '../styles/HomePage.css'

const HomePage = () => {
  const { currentEmail, emails, isLoading, error } = useEmail()
  
  return (
    <div className="home-page">
      <section className="email-address-section">
        <h1>Your Temporary Email Address</h1>
        <EmailAddress email={currentEmail} />
        <p className="instructions">
          Use this email address to receive messages. They will appear below automatically.
        </p>
      </section>
      
      <section className="inbox-section">
        <h2>Inbox</h2>
        {error && <div className="error-message">{error}</div>}
        {isLoading ? <LoadingSpinner /> : <EmailList emails={emails} />}
      </section>
    </div>
  )
}

export default HomePage