<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'

const store = useGameStore()
const router = useRouter()

const bots = ref([
  'https://api.dicebear.com/7.x/bottts/svg?seed=1',
  'https://api.dicebear.com/7.x/bottts/svg?seed=2',
  'https://api.dicebear.com/7.x/bottts/svg?seed=3',
  'https://api.dicebear.com/7.x/bottts/svg?seed=4',
  'https://api.dicebear.com/7.x/bottts/svg?seed=5',
  'https://api.dicebear.com/7.x/bottts/svg?seed=6',
  'https://api.dicebear.com/7.x/bottts/svg?seed=7',
  'https://api.dicebear.com/7.x/bottts/svg?seed=8',
  'https://api.dicebear.com/7.x/bottts/svg?seed=9',
  'https://api.dicebear.com/7.x/bottts/svg?seed=10',
])

const startGame = async () => {
  await store.start()
  router.push('/lvl/1')
}
</script>

<template>
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
            <div class="font-bold text-xl mb-2 py-2">Levels</div>
            <div class="flex gap-2">
              <ul v-for="bot in bots" :key="bot">
                <li>
                  <img :src="bot" class="w-12 h-12 rounded-full" />
                </li>
              </ul>
            </div>
            <p class="text-gray-700 text-base">
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

<style scoped>
main {
  background: rgb(112, 54, 187);
  background: linear-gradient(270deg, rgba(112, 54, 187, 1) 0%, rgba(64, 23, 134, 1) 100%);
}
</style>
