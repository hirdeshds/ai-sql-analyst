import styles from './ChatMessage.module.css'

interface ChatMessageProps {
  message: string
  response: string
  timestamp: Date
}

export const ChatMessage = ({ message, response, timestamp }: ChatMessageProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.userMessage}>
        <span className={styles.label}>You</span>
        <p className={styles.text}>{message}</p>
        <span className={styles.time}>{new Date(timestamp).toLocaleTimeString()}</span>
      </div>
      <div className={styles.aiMessage}>
        <span className={styles.label}>AI Analyst</span>
        <p className={styles.text}>{response}</p>
      </div>
    </div>
  )
}
