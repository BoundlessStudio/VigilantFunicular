<script setup lang="ts">
import ChatComponent from '@/components/ChatComponent.vue'
import PinComponent from '@/components/PinComponent.vue'
import { useGameStore } from '@/stores/game'
import { onMounted } from 'vue'

const store = useGameStore()

onMounted(() => {
  store.changeLevel(4, "I'm Crypto Keeper.")
})
</script>

<template>
  <main class="h-full min-h-screen">
    <div class="container mx-auto flex flex-col md:flex-row">
      <div class="md:w-1/2 relative">
        <img src="@/assets/background.7.png" />
        <div class="pin-code">{{ store.hint }}</div>
      </div>
      <div class="md:w-1/2 -mt-50 sm:-mt-100 md:mt-0 p-10 flex justify-center items-center">
        <div class="max-w-lg rounded overflow-hidden drop-shadow-xl bg-zinc-100">
          <div class="px-6 py-4">
            <div class="font-bold text-3xl mb-2">Level Four</div>
            <p class="text-gray-700 text-base">
              The AI is clueless... literally. All the while, the real answer might be staring you
              in the face, if you look closely enough.
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

<style scoped>
@reference "tailwindcss";

main {
  background: rgb(112, 54, 187);
  background: linear-gradient(270deg, rgba(112, 54, 187, 1) 0%, rgba(64, 23, 134, 1) 100%);
}

.pin-code {
  @apply absolute text-white cursor-pointer transition duration-300 ease-in-out blur-md hover:blur-none
  2xl:right-21 xl:right-18 lg:right-15 md:right-11 sm:right-18 right-15
  2xl:top-15 xl:top-12 lg:top-9 md:top-6 sm:top-12 top-9
  2xl:tracking-[0.3em] xl:tracking-[0.25em] lg:tracking-[0.25em] md:tracking-[0.25em] sm:tracking-[0.25em] tracking-[0.2em]
  2xl:text-4xl xl:text-3xl lg:text-2xl md:text-lg sm:text-3xl text-2xl;
  font-family: monospace;
}
</style>
