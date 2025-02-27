<script setup lang="ts">
import { computed, ref } from 'vue'
import { useGameStore } from '@/stores/game'
import { useRouter } from 'vue-router'
import InfoIcon from './InfoIcon.vue'

const router = useRouter()
const store = useGameStore()

const params = defineProps<{ limit: number }>()

const disable = ref(false)
const readonly = ref(false)
const message = ref('')

const sendMessage = async () => {
  try {
    if (!message.value) return

    disable.value = true
    const prompt = message.value
    message.value = ''
    const amount = await store.chat(prompt)
    readonly.value = amount >= params.limit
  } catch (error) {
    console.error(error)
    router.push('/gg?error=chat')
  } finally {
    disable.value = false
  }
}

const font = computed(() => {
  return store.level === 4 ? "font-family: 'Webdings'" : undefined
})
</script>

<template>
  <div class="flex flex-col">
    <div v-if="readonly">
      <div
        class="flex items-center p-3 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50"
        role="alert"
      >
        <InfoIcon />
        <span class="sr-only">Info</span>
        <div>
          <span class="font-medium">Warning!</span> Chat limit reached but you can still guess the
          pin code.
        </div>
      </div>
    </div>
    <div v-else class="flex-none flex gap-4 my-6">
      <input
        v-model="message"
        @keyup.enter="sendMessage"
        placeholder="Type your message..."
        type="text"
        maxlength="512"
        class="input flex-1 bg-gray-200 rounded p-2"
      />
      <button
        :disabled="disable"
        @click="sendMessage"
        class="bg-purple-500 hover:bg-purple-700 disabled:bg-zinc-500 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        Send
      </button>
    </div>

    <div class="flex flex-col-reverse gap-2">
      <div
        v-for="(msg, index) in store.messages"
        :key="index"
        :class="[
          'p-3 rounded-lg w-full flex gap-2',
          msg.role === 'assistant' ? 'bg-gray-300' : 'bg-gray-200',
        ]"
      >
        <div class="flex-none">
          <img
            v-if="msg.role === 'user'"
            :src="'https://api.dicebear.com/9.x/micah/svg?seed=Destiny&baseColor=f9c9b6&hairColor=9287ff'"
            class="w-6 h-6 rounded-full"
          />
          <img
            v-else
            :src="'https://api.dicebear.com/7.x/bottts/svg?seed=' + store.level"
            class="w-6 h-6 rounded-full"
          />
        </div>
        <div class="grow" v-if="msg.role === 'user'">
          {{ msg.content }}
        </div>
        <div class="grow" v-else :style="font">
          {{ msg.content }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
