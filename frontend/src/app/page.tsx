'use client'

import { useAnalystChat } from '@/lib/hooks'
import { ChatInterface } from '@/components/ChatInterface'
import { ChatMessage } from '@/components/ChatMessage'
import { StatusIndicator } from '@/components/StatusIndicator'
import styles from './page.module.css'

export default function Home() {
  const { chats, loading, error, sendMessage, clearChats } = useAnalystChat()

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <header className={styles.header}>
          <h1>AI SQL Analyst</h1>
          <p>Ask questions about your data and get intelligent SQL insights</p>
          <StatusIndicator />
        </header>

        <section className={styles.chatSection}>
          <ChatInterface onSendMessage={sendMessage} loading={loading} error={error} />

          <div className={styles.chatHistory}>
            {chats.length === 0 ? (
              <div className={styles.empty}>
                <p>No conversations yet. Start by asking a question about your data!</p>
              </div>
            ) : (
              <>
                {chats.map((chat) => (
                  <ChatMessage
                    key={chat.id}
                    message={chat.message}
                    response={chat.response}
                    timestamp={chat.timestamp}
                  />
                ))}
              </>
            )}
          </div>

          {chats.length > 0 && (
            <button onClick={clearChats} className={styles.clearButton}>
              Clear Conversation
            </button>
          )}
        </section>
      </div>
    </main>
  )
}

