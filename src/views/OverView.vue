<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router'
import { useGameStore } from '@/stores/game'
import { ref } from 'vue'

const store = useGameStore()
const router = useRouter()
const route = useRoute()

// Get Query String lvl for which level cause the game over
const lvl = route.query.lvl as string
const level = ref(lvl)
console.log('game over', level.value)

const startGame = async () => {
  await store.start()
  document.startViewTransition(() => {
    router.push('/lvl/1')
  })
}
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
            <div class="font-bold text-3xl mb-2">Try Again...?</div>
            <p class="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
              Maiores et perferendis eaque, exercitationem praesentium nihil.
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
