import type { Message } from './types'

const API_URL = import.meta.env.VITE_API_URL as string

export interface ChatResponse {
  reply: string
  tags: string[]
  session_id: string
}

export async function sendMessage(
  sessionId: string,
  messages: Pick<Message, 'role' | 'content'>[]
): Promise<ChatResponse> {
  const res = await fetch(`${API_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ session_id: sessionId, messages }),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({})) as { detail?: string }
    throw new Error(err.detail ?? 'Failed to get response')
  }
  return res.json() as Promise<ChatResponse>
}

export async function fetchSessionMessages(sessionId: string): Promise<Message[]> {
  const res = await fetch(`${API_URL}/sessions/${sessionId}/messages`)
  if (!res.ok) throw new Error('Failed to fetch messages')
  return res.json() as Promise<Message[]>
}
