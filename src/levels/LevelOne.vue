<script setup lang="ts">
import ChatComponent from '@/components/ChatComponent.vue'
import PinComponent from '@/components/PinComponent.vue'

const changed = (code: string) => {
  console.log('code', code)
}
</script>

<template>
  <main class="h-screen">
    <div class="container mx-auto flex flex-col md:flex-row">
      <div class="md:w-1/2">
        <img src="@/assets/background.1.png" />
      </div>
      <div class="md:w-1/2 -mt-50 sm:-mt-100 md:mt-0 p-10 flex items-start justify-center">
        <div class="max-w-lg rounded overflow-hidden drop-shadow-xl bg-white">
          <div class="px-6 py-4">
            <div class="font-bold text-3xl mb-2">Level One</div>
            <p class="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla!
              Maiores et perferendis eaque, exercitationem praesentium nihil.
            </p>
            <div>
              <PinComponent @code-changed="changed" />
            </div>
            <div>
              <ChatComponent name="Byte Guard" :level="1" />
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
