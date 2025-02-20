<script setup lang="ts">
import LockIcon from '@/components/LockIcon.vue'
import UnlockIcon from '@/components/UnlockIcon.vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '@/stores/game'

const store = useGameStore()
const router = useRouter()

const startGame = () => {
  router.push('/game')
}
</script>

<template>
  <main class="min-h-screen h-full">
    <div class="container mx-auto flex flex-col md:flex-row">
      <div class="md:w-1/3">
        <img src="@/assets/background.gameover.png" />
      </div>
      <div class="md:w-2/3 -mt-50 sm:-mt-100 md:mt-0 p-10 flex items-start justify-center">
        <div class="max-w-2xl rounded overflow-hidden drop-shadow-xl bg-white">
          <div class="px-6 py-4">
            <div class="font-bold text-3xl py-2">Well Done!</div>
            <p class="text-gray-700 text-base">
              You fought bravely and pushed your limits, proving your skill and determination.
              Whether you conquered every obstacle or discovered new strategies along the way, this
              is a victory worth celebrating. Take a moment review your progress.
            </p>
            <div class="flex gap-2 py-2">
              <ul v-for="n in 10" :key="n">
                <li v-if="n < store.level" class="text-green-500">
                  <UnlockIcon />
                </li>
                <li v-else class="text-amber-500">
                  <LockIcon />
                </li>
              </ul>
            </div>
            <div class="font-bold text-3xl py-2">Lessons</div>
            <p class="text-gray-700 text-base">
              This game is a lesson about the security in Ai context. If you got through these
              levels then you have proved that trying to secure Ai context is a nearly impossible
              task. If you want to learn more about Ai security, have level suggestions or found a
              bug, consider lets us know
              <a href="https://x.com/VenatioStudios" class="underline" target="_blank"
                >@VenatioStudios</a
              >.
            </p>
            <div class="font-bold text-3xl py-2">Share</div>
            <p class="text-gray-700 text-base">
              You should share you accomplishments, tell the world how you did!
            </p>
            <p>
              <a
                target="_blank"
                class="flex gap-1 items-center text-2xl"
                :href="
                  'https://twitter.com/intent/tweet?hashtags=GuardsIt,UnlockChallenge&text=' +
                  encodeURI(
                    `https://guards.it.com \nI made it level ${store.level}!\nHow far will you go?\n`,
                  )
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  x="0px"
                  y="0px"
                  width="20"
                  height="20"
                  viewBox="0 0 50 50"
                >
                  <path
                    d="M 50.0625 10.4375 C 48.214844 11.257813 46.234375 11.808594 44.152344 12.058594 C 46.277344 10.785156 47.910156 8.769531 48.675781 6.371094 C 46.691406 7.546875 44.484375 8.402344 42.144531 8.863281 C 40.269531 6.863281 37.597656 5.617188 34.640625 5.617188 C 28.960938 5.617188 24.355469 10.21875 24.355469 15.898438 C 24.355469 16.703125 24.449219 17.488281 24.625 18.242188 C 16.078125 17.8125 8.503906 13.71875 3.429688 7.496094 C 2.542969 9.019531 2.039063 10.785156 2.039063 12.667969 C 2.039063 16.234375 3.851563 19.382813 6.613281 21.230469 C 4.925781 21.175781 3.339844 20.710938 1.953125 19.941406 C 1.953125 19.984375 1.953125 20.027344 1.953125 20.070313 C 1.953125 25.054688 5.5 29.207031 10.199219 30.15625 C 9.339844 30.390625 8.429688 30.515625 7.492188 30.515625 C 6.828125 30.515625 6.183594 30.453125 5.554688 30.328125 C 6.867188 34.410156 10.664063 37.390625 15.160156 37.472656 C 11.644531 40.230469 7.210938 41.871094 2.390625 41.871094 C 1.558594 41.871094 0.742188 41.824219 -0.0585938 41.726563 C 4.488281 44.648438 9.894531 46.347656 15.703125 46.347656 C 34.617188 46.347656 44.960938 30.679688 44.960938 17.09375 C 44.960938 16.648438 44.949219 16.199219 44.933594 15.761719 C 46.941406 14.3125 48.683594 12.5 50.0625 10.4375 Z"
                  ></path>
                </svg>
                Tweet
              </a>
            </p>
            <div class="font-bold text-3xl py-2">Try Again?</div>
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

<style scoped></style>
