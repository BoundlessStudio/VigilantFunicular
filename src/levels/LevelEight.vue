<script setup lang="ts">
import ChatComponent from '@/components/ChatComponent.vue'
import PinComponent from '@/components/PinComponent.vue'
import { useGameStore } from '@/stores/game'
import { onMounted } from 'vue'

const store = useGameStore()

onMounted(() => {
  store.reset("I'm Binary Boss.")
  // store.changeLevel(8, "I'm Binary Boss.")
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
            <div class="font-bold text-3xl mb-2">Level Eight</div>
            <p class="text-gray-700 text-base">
              The stakes skyrocket. One wrong move, and you’re back to square one. Think
              carefully—there are no do-overs here.
            </p>
            <div>
              <PinComponent :limit="1" />
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
