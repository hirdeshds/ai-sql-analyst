// API Request/Response Types
export interface ChatRequest {
  message: string
  session_id: string
}

export interface ChatResponse {
  response: string
}

export interface DatabaseSchema {
  [key: string]: any
}

export interface Chat {
  id: string
  message: string
  response: string
  timestamp: Date
}
