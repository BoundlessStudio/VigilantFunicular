<script setup lang="ts">
import LockIcon from '@/components/LockIcon.vue'
import UnlockIcon from '@/components/UnlockIcon.vue'
// import TimeIcon from '@/components/TimeIcon.vue'
// import AlertIcon from '@/components/AlertIcon.vue'
import { useRouter, useRoute } from 'vue-router'
import { useGameStore } from '@/stores/game'
import { ref } from 'vue'

const store = useGameStore()
const router = useRouter()
const route = useRoute()

// Get Query String lvl for which level cause the game over
const lvl = parseInt(route.query.lvl as string)
const level = ref(lvl)
// console.log('game over', level.value)

const startGame = async () => {
  await store.start()
  router.push('/lvl/1')
}

// Well Done
// You Reached Level X
// Try Again?
</script>

<template>
  <main class="h-screen">
    <div class="container mx-auto flex flex-col md:flex-row">
      <div class="md:w-1/2">
        <img src="@/assets/background.gameover.png" />
      </div>
      <div class="md:w-1/2 -mt-50 sm:-mt-100 md:mt-0 p-10 flex items-start justify-center">
        <div class="max-w-lg rounded overflow-hidden drop-shadow-xl bg-white">
          <div class="px-6 py-4">
            <div class="font-bold text-3xl py-4">Well Done!</div>
            <p class="text-gray-700 text-base">
              You fought bravely and pushed your limits, proving your skill and determination.
              Whether you conquered every obstacle or discovered new strategies along the way, this
              is a victory worth celebrating. Take a moment review your progress.
            </p>
            <div class="flex gap-2 py-2">
              <ul v-for="n in 10" :key="n">
                <li v-if="n <= level" class="text-green-500">
                  <UnlockIcon />
                </li>
                <li v-else class="text-amber-500">
                  <LockIcon />
                </li>
              </ul>
            </div>
            <div class="font-bold text-3xl py-4">Lessons...</div>
            <p class="text-gray-700 text-base">
              This game is a lesson about the security in Ai context. If you got through these
              levels then you have proved that. If you want to learn more about Ai security, have
              level suggestions or found a bug, consider exploring the project
              <a
                href="https://github.com/BoundlessStudio/FictionalSuccotash/"
                class="underline"
                target="_blank"
                >here</a
              >.
            </p>
            <div class="font-bold text-3xl py-4">Try Again?</div>
            <p class="text-gray-700 text-base">
              Not every journey ends in triumph, but every attempt brings you closer to success.
              Mistakes are lessons, and each retry is another step toward mastery. Take what you've
              learned, adapt, and rise again.
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
