'use client'

import styles from './Sidebar.module.css'
import { StatusIndicator } from './StatusIndicator'

interface SidebarProps {
  chatHistory: Array<{ id: string; message: string; timestamp: Date }>
  onNewChat: () => void
  onSelectChat?: (id: string) => void
  activeChatId?: string
}

export const Sidebar = ({ chatHistory, onNewChat, onSelectChat, activeChatId }: SidebarProps) => {
  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z"
              fill="currentColor" opacity="0.9"/>
          </svg>
        </div>
        <span className={styles.logoText}>SQL Analyst</span>
      </div>

      {/* New Thread Button */}
      <button className={styles.newButton} onClick={onNewChat} id="new-thread-btn">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M12 5v14M5 12h14" strokeLinecap="round" />
        </svg>
        New Thread
      </button>

      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navSection}>
          <a href="#" className={`${styles.navItem} ${styles.navItemActive}`} id="nav-home">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeLinejoin="round"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Home
          </a>
          <a href="#" className={styles.navItem} id="nav-schema">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <ellipse cx="12" cy="5" rx="9" ry="3"/>
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
            </svg>
            Database
          </a>
          <a href="#" className={styles.navItem} id="nav-history">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <circle cx="12" cy="12" r="10"/>
              <polyline points="12 6 12 12 16 14"/>
            </svg>
            History
          </a>
          <a href="#" className={styles.navItem} id="nav-insights">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M18 20V10M12 20V4M6 20v-6"/>
              <rect x="1" y="1" width="22" height="22" rx="2" ry="2" opacity="0"/>
            </svg>
            Insights
          </a>
        </div>

        {/* Recent History */}
        {chatHistory.length > 0 && (
          <div className={styles.historySection}>
            <span className={styles.sectionLabel}>Recent</span>
            {chatHistory.slice(-8).reverse().map((chat) => (
              <button
                key={chat.id}
                className={`${styles.historyItem} ${activeChatId === chat.id ? styles.historyItemActive : ''}`}
                onClick={() => onSelectChat?.(chat.id)}
                id={`history-${chat.id}`}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={styles.historyIcon}>
                  <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                </svg>
                <span className={styles.historyText}>{chat.message}</span>
              </button>
            ))}
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className={styles.footer}>
        <StatusIndicator />
      </div>
    </aside>
  )
}
