import { useState } from 'react'

interface Props {
  onSend: (text: string) => void
  disabled: boolean
}

export default function InputBar({ onSend, disabled }: Props) {
  const [value, setValue] = useState('')

  function submit() {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    submit()
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      submit()
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{
      display: 'flex',
      gap: '10px',
      padding: '16px 24px',
      borderTop: '1px solid var(--border)',
      backgroundColor: 'var(--bg-surface)',
    }}>
      <textarea
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Ask about wildfires, CO2 levels, climate legislation..."
        rows={1}
        style={{
          flex: 1,
          resize: 'none',
          background: 'var(--bg-elevated)',
          border: '1px solid var(--border)',
          borderRadius: '8px',
          color: 'var(--text-primary)',
          fontSize: '14px',
          padding: '10px 14px',
          fontFamily: 'inherit',
          outline: 'none',
          lineHeight: '1.5',
        }}
      />
      <button
        type="submit"
        disabled={!value.trim() || disabled}
        style={{
          padding: '10px 20px',
          borderRadius: '8px',
          background: disabled || !value.trim() ? 'var(--border)' : 'var(--accent)',
          color: '#fff',
          border: 'none',
          fontWeight: 600,
          fontSize: '14px',
          cursor: disabled || !value.trim() ? 'not-allowed' : 'pointer',
          fontFamily: 'inherit',
          transition: 'background 0.15s',
        }}
      >
        Send
      </button>
    </form>
  )
}
