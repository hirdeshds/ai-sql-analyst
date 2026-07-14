'use client'

import { useBackendHealth } from '@/lib/hooks'
import styles from './StatusIndicator.module.css'

export const StatusIndicator = () => {
  const { isOnline, loading } = useBackendHealth()

  if (loading) {
    return <div className={styles.loading}>Checking backend...</div>
  }

  return (
    <div className={`${styles.status} ${isOnline ? styles.online : styles.offline}`}>
      <span className={styles.dot}></span>
      {isOnline ? 'Backend Connected' : 'Backend Offline'}
    </div>
  )
}
