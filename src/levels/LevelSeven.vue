<script setup lang="ts">
import ChatComponent from '@/components/ChatComponent.vue'
import PinComponent from '@/components/PinComponent.vue'
import LampComponent from '@/components/LampComponent.vue'
import { onMounted, ref } from 'vue'

const chatMessages = ref<Array<{ text: string; isAi: boolean }>>([
  { text: `Hello! I'm ABC Bot. How can I help you today?`, isAi: true },
])

const seconds = ref(60)
onMounted(() => {
  setInterval(() => {
    seconds.value--
    if (seconds.value === 0) {
      seconds.value = 60
    }
  }, 1000)
})
</script>

<template>
  <main class="h-screen overflow-hidden">
    <div class="container mx-auto flex flex-col md:flex-row">
      <div class="md:w-1/2 relative">
        <div class="z-1 alarm-light">
          <LampComponent></LampComponent>
        </div>
        <img class="z-2" src="@/assets/background.4.png" />
        <div class="z-3 count-down">{{ seconds }}</div>
      </div>
      <div class="md:w-1/2 -mt-70 sm:-mt-90 md:mt-0 p-10 flex items-start justify-center">
        <div class="z-10 max-w-lg rounded overflow-hidden drop-shadow-xl bg-white">
          <div class="px-6 py-4">
            <div class="font-bold text-3xl mb-2">Level Seven</div>
            <p class="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
              Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
            <div>
              <PinComponent />
            </div>
            <div>
              <ChatComponent name="Quantum Core" :level="7" />
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

.alarm-light {
  @apply absolute text-white
  w-12 h-12
  2xl:left-64 xl:left-55 lg:left-43 md:left-32 sm:left-52 left-40
  2xl:top-10 xl:top-10 lg:top-8 md:top-6 sm:top-10 top-6;
}

.count-down {
  @apply absolute text-white cursor-pointer
  2xl:left-85 xl:left-75 lg:left-60 md:left-45 sm:left-70 left-11/24
  2xl:top-32 xl:top-30 lg:top-25 md:top-18 sm:top-30 top-1/5
  2xl:text-8xl xl:text-7xl lg:text-5xl md:text-3xl sm:text-7xl text-5xl;
  font-family: monospace;
}
</style>
