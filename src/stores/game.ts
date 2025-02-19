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
  getSummary,
  type SummaryDto,
} from '@/api/game'

export const useGameStore = defineStore('game', () => {
  const difficulty = ref(1)
  const level = ref(1)
  const messages = ref<ChatMessageDto[]>([])
  const hint = ref('')
  const summary = ref<SummaryDto>({
    attempts: new Array(10).fill(0),
    successes: new Array(10).fill(0),
  })

  const start = async () => {
    level.value = 1
    const body = {
      difficulty: difficulty.value,
    } as StartInputDto
    const data = await startGame(body)
    hint.value = data.hint
  }

  const reset = async (prompt: string) => {
    messages.value = [{ role: 'assistant', content: prompt }]
  }
  const next = () => {
    level.value++
    return level.value > 0 && level.value <= 10
  }
  // const changeLevel = async (lvl: number, prompt: string) => {
  //   level.value = lvl
  //   messages.value = [{ role: 'assistant', content: prompt }]
  // }

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

  const setup = async (): Promise<void> => {
    try {
      summary.value = await getSummary()
    } catch (error) {
      console.error(error)
    }
  }

  return { summary, level, hint, messages, start, pin, chat, reset, next, setup }
})
