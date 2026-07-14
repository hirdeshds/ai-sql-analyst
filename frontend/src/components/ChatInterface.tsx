'use client'

import { useState } from 'react'
import styles from './ChatInterface.module.css'

interface ChatInterfaceProps {
  onSendMessage: (message: string) => Promise<void>
  loading: boolean
  error: string | null
}

export const ChatInterface = ({ onSendMessage, loading, error }: ChatInterfaceProps) => {
  const [input, setInput] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    try {
      await onSendMessage(input)
      setInput('')
    } catch (err) {
      console.error('Failed to send message:', err)
    }
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me about your data..."
          disabled={loading}
          className={styles.input}
        />
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
      {error && <div className={styles.error}>{error}</div>}
    </div>
  )
}
