import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  completeChat,
  startGame,
  tryPin,
  type ChatMessageDto,
  type ChatInputDto,
  type PinInputDto,
  type StartInputDto,
  type PinOutputDto,
} from '@/api/game'

export const useGameStore = defineStore('game', () => {
  const level = ref(0)
  const messages = ref<ChatMessageDto[]>([])
  const hint = ref('****')

  const start = async () => {
    try {
      const body = {
        difficulty: 1,
      } as StartInputDto
      const data = await startGame(body)
      hint.value = data.hint
    } catch (error) {
      console.error(error)
    }
  }

  const changeLevel = async (lvl: number, prompt: string) => {
    level.value = lvl
    messages.value = [{ role: 'assistant', content: prompt }]
  }

  const pin = async (code: string): Promise<PinOutputDto> => {
    const body = {
      code: code,
      level: level.value,
    } as PinInputDto
    const data = await tryPin(body)
    return data
  }

  const chat = async (prompt: string): Promise<number> => {
    messages.value.push({ role: 'user', content: prompt })
    const body = {
      level: level.value,
      messages: messages.value,
    } as ChatInputDto
    const data = await completeChat(body)
    messages.value.push({ role: 'assistant', content: data.response })
    return messages.value.filter((m) => m.role === 'user').length
  }

  return { level, hint, messages, start, pin, chat, changeLevel }
})
