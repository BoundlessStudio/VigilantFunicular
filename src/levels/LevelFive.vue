<script setup lang="ts">
import ChatComponent from '@/components/ChatComponent.vue'
import PinComponent from '@/components/PinComponent.vue'
import { useGameStore } from '@/stores/game'
import { onMounted } from 'vue'

const store = useGameStore()

onMounted(() => {
  store.reset("I'm Neural Ninja.")
  // store.changeLevel(5, "I'm Neural Ninja.")
})
</script>

<template>
  <main class="h-full min-h-screen">
    <div class="container mx-auto flex flex-col md:flex-row">
      <div class="md:w-1/2">
        <img src="@/assets/background.1.png" />
      </div>
      <div class="md:w-1/2 -mt-50 sm:-mt-100 md:mt-0 p-10 flex justify-center items-center">
        <div class="max-w-lg rounded overflow-hidden drop-shadow-xl bg-zinc-100">
          <div class="px-6 py-4">
            <div class="font-bold text-3xl mb-2">Level Five</div>
            <p class="text-gray-700 text-base">
              The AI begins speaking in riddles, mixing truths with decoys. Will you parse the
              pattern or get lost in the lies?
            </p>
            <div>
              <PinComponent :limit="10" />
            </div>
            <div>
              <ChatComponent :limit="10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
