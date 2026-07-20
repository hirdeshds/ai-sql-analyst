'use client'

import { useRef, useEffect } from 'react'
import { useAnalystChat } from '@/lib/hooks'
import { ChatInterface } from '@/components/ChatInterface'
import { ChatMessage } from '@/components/ChatMessage'
import { Sidebar } from '@/components/Sidebar'
import styles from './page.module.css'

export default function Home() {
  const { chats, loading, error, sendMessage, clearChats } = useAnalystChat()
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (chats.length > 0) {
      scrollToBottom()
    }
  }, [chats])

  const isEmpty = chats.length === 0

  const sidebarHistory = chats.map((c) => ({
    id: c.id,
    message: c.message,
    timestamp: c.timestamp,
  }))

  return (
    <div className={styles.layout}>
      {/* Sidebar */}
      <Sidebar
        chatHistory={sidebarHistory}
        onNewChat={clearChats}
      />

      {/* Main Area */}
      <main className={styles.main}>
        {/* Top bar */}
        <header className={styles.topBar}>
          <div className={styles.topBarLeft}>
            {!isEmpty && (
              <h2 className={styles.threadTitle}>
                {chats[0]?.message.slice(0, 50)}{chats[0]?.message.length > 50 ? '...' : ''}
              </h2>
            )}
          </div>
          <div className={styles.topBarRight}>
            {!isEmpty && (
              <button onClick={clearChats} className={styles.newThreadBtn} id="clear-btn">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                  <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
                </svg>
                New thread
              </button>
            )}
          </div>
        </header>

        {/* Scrollable content */}
        <div className={`${styles.content} ${isEmpty ? styles.contentCentered : styles.contentScrollable}`}>
          {/* Chat messages */}
          {!isEmpty && (
            <div className={styles.messages}>
              <div className={styles.messagesInner}>
                {chats.map((chat) => (
                  <ChatMessage
                    key={chat.id}
                    message={chat.message}
                    response={chat.response}
                    timestamp={chat.timestamp}
                  />
                ))}
                {loading && (
                  <ChatMessage
                    key="loading"
                    message=""
                    response=""
                    timestamp={new Date()}
                    isLoading
                  />
                )}
                <div ref={messagesEndRef} />
              </div>
            </div>
          )}

          {/* Input area */}
          <div className={`${styles.inputWrapper} ${isEmpty ? styles.inputWrapperCentered : styles.inputWrapperBottom}`}>
            <ChatInterface
              onSendMessage={sendMessage}
              loading={loading}
              error={error}
              isEmpty={isEmpty}
            />
            {!isEmpty && (
              <p className={styles.disclaimer}>
                SQL Analyst can make mistakes. Verify important queries before running.
              </p>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
