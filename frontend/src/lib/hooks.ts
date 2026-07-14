'use client'

import { useState, useCallback, useEffect } from 'react'
import { analysisService } from './analysisService'
import { DatabaseSchema, Chat } from './types'
import { v4 as uuidv4 } from 'uuid'

export const useAnalystChat = () => {
  const [chats, setChats] = useState<Chat[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sessionId] = useState(() => uuidv4())

  const sendMessage = useCallback(async (message: string) => {
    setLoading(true)
    setError(null)

    try {
      const response = await analysisService.chat(message, sessionId)
      
      const newChat: Chat = {
        id: uuidv4(),
        message,
        response,
        timestamp: new Date(),
      }

      setChats((prev) => [...prev, newChat])
      return response
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to send message'
      setError(errorMessage)
      throw err
    } finally {
      setLoading(false)
    }
  }, [sessionId])

  const clearChats = useCallback(() => {
    setChats([])
    setError(null)
  }, [])

  return {
    chats,
    loading,
    error,
    sessionId,
    sendMessage,
    clearChats,
  }
}

export const useDatabaseSchema = () => {
  const [schema, setSchema] = useState<DatabaseSchema | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchSchema = async () => {
      try {
        setLoading(true)
        const data = await analysisService.getSchema()
        setSchema(data)
        setError(null)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch schema'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    fetchSchema()
  }, [])

  return { schema, loading, error }
}

export const useBackendHealth = () => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkHealth = async () => {
      try {
        setLoading(true)
        const online = await analysisService.checkHealth()
        setIsOnline(online)
      } catch (err) {
        setIsOnline(false)
      } finally {
        setLoading(false)
      }
    }

    checkHealth()
  }, [])

  return { isOnline, loading }
}
