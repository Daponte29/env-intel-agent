import TopicTag from './TopicTag'
import type { Message } from '../types'

interface Props {
  message: Message
}

export default function MessageBubble({ message }: Props) {
  const isUser = message.role === 'user'

  return (
    <div style={{
      display: 'flex',
      justifyContent: isUser ? 'flex-end' : 'flex-start',
      marginBottom: '16px',
    }}>
      <div style={{
        maxWidth: '78%',
        padding: '12px 16px',
        borderRadius: isUser ? '12px 12px 2px 12px' : '12px 12px 12px 2px',
        background: isUser ? 'var(--accent)' : 'var(--bg-elevated)',
        border: isUser ? 'none' : '1px solid var(--border)',
        fontSize: '14px',
        lineHeight: '1.65',
        color: 'var(--text-primary)',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
      }}>
        {message.content}
        {!isUser && message.tags.length > 0 && (
          <div style={{ marginTop: '4px' }}>
            {message.tags.map(tag => <TopicTag key={tag} tag={tag} />)}
          </div>
        )}
      </div>
    </div>
  )
}
