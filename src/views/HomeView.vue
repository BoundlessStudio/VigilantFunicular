<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'
import { formatSiUnit } from 'format-si-unit'
import bolt from '../assets/bolt.png'

const store = useGameStore()
const router = useRouter()

const loadingSuccesses = ref(Array(10).fill(0))
const loadingAttempts = ref(Array(10).fill(0))
let intervalId: number | null = null

const startGame = () => {
  router.push('/game')
}

const updateLoadingNumbers = () => {
  loadingSuccesses.value = loadingSuccesses.value.map(() => Math.floor(Math.random() * 100))
  loadingAttempts.value = loadingAttempts.value.map(() => Math.floor(Math.random() * 100))
}

onMounted(() => {
  store.setup()
  intervalId = setInterval(updateLoadingNumbers, 100)

  store.$subscribe(() => {
    if (store.summary.successes.length && store.summary.attempts.length) {
      if (intervalId) {
        clearInterval(intervalId)
        intervalId = null
      }
      loadingSuccesses.value = store.summary.successes
      loadingAttempts.value = store.summary.attempts
    }
  })
})

onUnmounted(() => {
  if (intervalId) {
    clearInterval(intervalId)
  }
})
</script>

<template>
  <a
    href="https://bolt.new/"
    target="_blank"
    rel="noopener"
    class="fixed top-4 right-4 w-20 h-20 z-50"
  >
    <img
      :src="bolt"
      alt="Bolt Icon"
      class="w-full h-full drop-shadow-lg bg-white rounded-full p-2 border border-neutral-200"
    />
  </a>
  <main class="min-h-screen h-full">
    <div class="container mx-auto flex flex-col md:flex-row">
      <div class="md:w-1/2">
        <img src="@/assets/background.main.png" />
      </div>
      <div class="md:w-1/2 -mt-50 sm:-mt-100 md:mt-0 p-10 flex items-center justify-center">
        <div class="max-w-lg rounded overflow-hidden drop-shadow-xl bg-white">
          <div class="px-6 py-4">
            <div class="font-bold text-5xl mb-2 py-2">guards.it</div>
            <div class="font-bold text-xl mb-2 py-2py-2">Objective</div>
            <p class="text-gray-700 text-base">
              Outwit the AI bots and get them to reveal the key needed to unlock the next level.
            </p>
            <div class="font-bold text-xl mb-2">Levels</div>
            <div class="flex gap-2">
              <ul v-for="i in 10" :key="i">
                <li>
                  <img
                    :src="'https://api.dicebear.com/7.x/bottts/svg?seed=' + i"
                    class="w-12 h-12 rounded-full"
                  />
                  <div
                    title="Success"
                    class="w-full bg-green-100 text-green-800 text-xs font-medium me-2 mb-1 rounded-sm dark:bg-green-900 dark:text-green-300 text-center"
                  >
                    {{ formatSiUnit(loadingSuccesses[i - 1]) }}
                  </div>
                  <div
                    title="Attempts"
                    class="w-full bg-purple-100 text-purple-800 text-xs font-medium me-2 rounded-sm dark:bg-purple-900 dark:text-purple-300 text-center"
                  >
                    {{ formatSiUnit(loadingAttempts[i - 1]) }}
                  </div>
                </li>
              </ul>
            </div>
            <p class="text-gray-700 text-base pt-5">
              From Trivial to Comical to Madding and Impossible We have 10 levels for you to
              explore. Each controlled by a bot with a different strategy, tricks, and safeguards.
            </p>
            <div class="flex justify-center p-2">
              <button
                @click="startGame"
                class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
              >
                START
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
