import styles from './ChatMessage.module.css'

interface ChatMessageProps {
  message: string
  response: string
  timestamp: Date
  isLoading?: boolean
}

export const ChatMessage = ({ message, response, timestamp, isLoading }: ChatMessageProps) => {
  return (
    <div className={`${styles.thread} fade-in`}>
      {/* User Question */}
      <div className={styles.questionBlock}>
        <div className={styles.questionAvatar}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/>
          </svg>
        </div>
        <div className={styles.questionContent}>
          <span className={styles.questionLabel}>You</span>
          <p className={styles.questionText}>{message}</p>
          <span className={styles.timestamp}>{new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
        </div>
      </div>

      {/* AI Answer */}
      <div className={styles.answerBlock}>
        <div className={styles.answerAvatar}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L14.5 9.5H22L16 14L18.5 21.5L12 17L5.5 21.5L8 14L2 9.5H9.5L12 2Z"/>
          </svg>
        </div>
        <div className={styles.answerContent}>
          <span className={styles.answerLabel}>SQL Analyst</span>
          {isLoading ? (
            <div className={styles.loadingIndicator}>
              <span className={styles.loadingDot} />
              <span className={styles.loadingDot} />
              <span className={styles.loadingDot} />
            </div>
          ) : (
            <div className={styles.answerText}>
              {formatResponse(response)}
            </div>
          )}
          {!isLoading && (
            <div className={styles.answerFooter}>
              <button className={styles.actionBtn} title="Copy response" id={`copy-${timestamp?.getTime()}`}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                </svg>
                Copy
              </button>
              <button className={styles.actionBtn} title="Share response" id={`share-${timestamp?.getTime()}`}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
                Share
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function formatResponse(text: string) {
  // Split into sections by detecting SQL code blocks and newlines
  const lines = text.split('\n')
  const elements: React.ReactNode[] = []
  let inCodeBlock = false
  let codeLines: string[] = []
  let key = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true
        codeLines = []
      } else {
        elements.push(
          <div key={key++} className={styles.codeBlock}>
            <div className={styles.codeHeader}>
              <span>SQL</span>
              <button className={styles.codeCopyBtn} onClick={() => navigator.clipboard?.writeText(codeLines.join('\n'))}>
                Copy
              </button>
            </div>
            <pre className={styles.code}><code>{codeLines.join('\n')}</code></pre>
          </div>
        )
        inCodeBlock = false
        codeLines = []
      }
    } else if (inCodeBlock) {
      codeLines.push(line)
    } else if (line.trim()) {
      elements.push(<p key={key++} className={styles.paragraph}>{line}</p>)
    }
  }

  // Flush any remaining code
  if (codeLines.length > 0) {
    elements.push(
      <pre key={key++} className={styles.code}><code>{codeLines.join('\n')}</code></pre>
    )
  }

  return elements.length > 0 ? elements : <p className={styles.paragraph}>{text}</p>
}
