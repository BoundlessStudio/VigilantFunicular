<script setup lang="ts">
import ChatComponent from '@/components/ChatComponent.vue'
import PinComponent from '@/components/PinComponent.vue'
import { useGameStore } from '@/stores/game'
import { onMounted } from 'vue'

const store = useGameStore()

onMounted(() => {
  store.reset("I'm Vault Vector.")
  // store.changeLevel(10, "I'm Vault Vector.")
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
            <div class="font-bold text-3xl mb-2">Level Ten</div>
            <p class="text-gray-700 text-base">
              Some safes guard treasures, others guard illusions. Don’t assume there’s anything left
              to find—but keep playing... but be warned you only get a single attempt to guess the
              pin.
            </p>
            <div>
              <PinComponent :limit="10" />
            </div>
            <div>
              <ChatComponent :limit="20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped></style>
