export interface Message {
  role: 'user' | 'assistant'
  content: string
  tags: string[]
}
