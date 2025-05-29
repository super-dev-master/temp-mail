import { createContext, useState, useContext, useEffect } from 'react'
import { generateRandomEmail } from '../utils/emailGenerator'

import axios from 'axios'

const EmailContext = createContext()

export const useEmail = () => useContext(EmailContext)

const EmailProvider = ({ children }) => {
  const [currentEmail, setCurrentEmail] = useState(localStorage.getItem('tempEmail') || '');

  const [emails, setEmails] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (currentEmail.length === 0) {
      getNewEmail();
      return;
    }
    localStorage.setItem('tempEmail', currentEmail);
    refreshInbox();
  }, [currentEmail])

  const refreshInbox = async () => {
    setIsLoading(true)

    try{
      const messages = await getEmailById(currentEmail);
    }
    catch(e){
      console.log(e);
    }
    setEmails(messages);

    setIsLoading(false)
  }

  const getNewEmail = () => {
    generateRandomEmail().then(
      email => setCurrentEmail(email)
    )

    setEmails([])
  }

  const getEmailById = async (id) => {
    try {
      const res = await axios.get(`https://mail.bargainbliss.cfd/inbox/${id}`);
      return res.data.messages; // assumes the server returns a single email object
    } catch (error) {
      console.error("Failed to fetch email:", error);
      return null;
    }
  };

  const value = {
    currentEmail,
    emails,
    isLoading,
    error,
    refreshInbox,
    getNewEmail,
    getEmailById
  }

  return (
    <EmailContext.Provider value={value}>
      {children}
    </EmailContext.Provider>
  )
}

export default EmailProvider