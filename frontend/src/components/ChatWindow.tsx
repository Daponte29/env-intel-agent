import { useEffect, useRef } from 'react'
import MessageBubble from './MessageBubble'
import type { Message } from '../types'

interface Props {
  messages: Message[]
  isLoading: boolean
}

export default function ChatWindow({ messages, isLoading }: Props) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  return (
    <div style={{
      flex: 1,
      overflowY: 'auto',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {messages.length === 0 && (
        <div style={{
          margin: 'auto',
          textAlign: 'center',
          color: 'var(--text-muted)',
        }}>
          <div style={{ fontSize: '32px', marginBottom: '12px' }}>🌍</div>
          <p style={{ fontSize: '15px', color: 'var(--text-secondary)' }}>
            Ask about environmental events, climate science, or policy.
          </p>
        </div>
      )}

      {messages.map((msg, i) => (
        <MessageBubble key={i} message={msg} />
      ))}

      {isLoading && (
        <div style={{ display: 'flex', justifyContent: 'flex-start', marginBottom: '16px' }}>
          <div style={{
            padding: '12px 16px',
            borderRadius: '12px 12px 12px 2px',
            background: 'var(--bg-elevated)',
            border: '1px solid var(--border)',
            color: 'var(--text-muted)',
            fontSize: '13px',
          }}>
            Searching and reasoning...
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  )
}
