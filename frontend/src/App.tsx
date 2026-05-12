import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import ChatWindow from './components/ChatWindow'
import InputBar from './components/InputBar'
import { sendMessage } from './api'
import type { Message } from './types'

function getOrCreateSessionId(): string {
  let id = sessionStorage.getItem('session_id')
  if (!id) {
    id = uuidv4()
    sessionStorage.setItem('session_id', id)
  }
  return id
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId] = useState<string>(getOrCreateSessionId)

  async function handleSend(text: string) {
    const userMessage: Message = { role: 'user', content: text, tags: [] }
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setIsLoading(true)

    try {
      const payload = nextMessages.map(m => ({ role: m.role, content: m.content }))
      const data = await sendMessage(sessionId, payload)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.reply,
        tags: data.tags,
      }])
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error'
      setMessages(prev => [...prev, { role: 'assistant', content: `Error: ${message}`, tags: [] }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <header style={{
        padding: '16px 24px',
        borderBottom: '1px solid var(--border)',
        backgroundColor: 'var(--bg-surface)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <span style={{ fontSize: '20px' }}>🌍</span>
        <div>
          <h1 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>
            EnviroLens
          </h1>
          <p style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>
            Events · Science · Policy
          </p>
        </div>
      </header>

      <ChatWindow messages={messages} isLoading={isLoading} />
      <InputBar onSend={handleSend} disabled={isLoading} />
    </div>
  )
}
