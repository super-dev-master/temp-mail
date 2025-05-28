import { motion } from 'framer-motion'
import '../styles/LoadingSpinner.css'

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <motion.div
        className="loading-spinner"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <p>Loading...</p>
    </div>
  )
}

export default LoadingSpinner