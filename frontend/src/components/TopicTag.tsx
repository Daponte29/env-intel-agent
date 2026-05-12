const TAG_COLORS: Record<string, string> = {
  event: '#ef4444',
  science: '#10b981',
  law: '#8b5cf6',
  statistic: '#f59e0b',
}

interface Props {
  tag: string
}

export default function TopicTag({ tag }: Props) {
  const color = TAG_COLORS[tag] ?? '#64748b'
  return (
    <span style={{
      display: 'inline-block',
      padding: '2px 10px',
      borderRadius: '9999px',
      fontSize: '11px',
      fontWeight: 600,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      color,
      border: `1px solid ${color}`,
      backgroundColor: `${color}18`,
      marginRight: '6px',
      marginTop: '8px',
    }}>
      {tag}
    </span>
  )
}
