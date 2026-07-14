import apiClient from './api'
import { ChatRequest, ChatResponse, DatabaseSchema } from './types'

export const analysisService = {
  /**
   * Send a chat message to the AI analyst
   */
  async chat(message: string, sessionId: string): Promise<string> {
    try {
      const payload: ChatRequest = {
        message,
        session_id: sessionId,
      }
      const response = await apiClient.post<ChatResponse>('/analyst/chat', payload)
      return response.data.response
    } catch (error) {
      console.error('Error calling analyst chat:', error)
      throw error
    }
  },

  /**
   * Fetch the database schema
   */
  async getSchema(): Promise<DatabaseSchema> {
    try {
      const response = await apiClient.get<DatabaseSchema>('/analyst/schema')
      return response.data
    } catch (error) {
      console.error('Error fetching schema:', error)
      throw error
    }
  },

  /**
   * Check if backend is online
   */
  async checkHealth(): Promise<boolean> {
    try {
      const response = await apiClient.get('/')
      return response.status === 200
    } catch (error) {
      console.error('Backend health check failed:', error)
      return false
    }
  },
}
