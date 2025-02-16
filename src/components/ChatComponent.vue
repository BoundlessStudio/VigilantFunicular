<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  level: number
  name: string
}

const props = defineProps<Props>()
const message = ref('')
const sendMessage = () => {}
const chatMessages = ref<Array<{ text: string }>>([
  { text: `Hello! I'm ${props.name}. How can I help you today?` },
])
</script>

<template>
  <div>
    <div class="flex items-center gap-4 py-4 border-b border-gray-100">
      <img
        :src="'https://api.dicebear.com/7.x/bottts/svg?seed=' + props.level"
        class="w-12 h-12 rounded-full"
      />
      <h2 class="text-xl font-semibold text-gray-800">{{ props.name }}</h2>
    </div>

    <div class="flex-1 overflow-y-auto space-y-4">
      <div
        v-for="(msg, index) in chatMessages"
        :key="index"
        :class="['p-3 rounded-lg max-w-[80%]', 'bg-gray-100 mr-auto']"
      >
        {{ msg.text }}
      </div>
    </div>

    <div class="flex gap-4 mt-6">
      <input
        v-model="message"
        @keyup.enter="sendMessage"
        placeholder="Type your message..."
        type="text"
        class="input flex-1"
      />
      <button
        @click="sendMessage"
        class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
      >
        Send
      </button>
    </div>
  </div>
</template>

<style scoped></style>
