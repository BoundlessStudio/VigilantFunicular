<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useGameStore } from '@/stores/game'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useGameStore()

const params = defineProps<{ limit: number }>()

const code = ref('')
const state = ref<boolean>(false)
const attempts = ref(0)
const left = computed(() => params.limit - attempts.value)

const codeChanged = async (code: string) => {
  try {
    attempts.value++

    const data = await store.pin(code)
    if (data.success) {
      store.next()
      return
    }
    if (attempts.value >= params.limit) {
      router.push('/gg')
      return
    }

    state.value = true
  } catch (error) {
    console.error(error)
    router.push('/gg?error=pin')
  }
}

watch(code, (newCode) => {
  if (newCode?.length === 4) {
    codeChanged(newCode)
  }
})
</script>

<template>
  <div class="flex flex-col items-center">
    <div class="font-bold text-2xl text-center">Pin Code</div>
    <div class="w-1/3">
      <div v-if="state" class="relative flex size-4">
        <div
          class="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75 mt-2 -ml-1"
        ></div>
        <div
          class="relative inline-flex size-4 rounded-full text-white bg-red-500 text-sm pl-1 mt-2 -ml-1"
          style="font-family: monospace"
        >
          {{ left }}
        </div>
      </div>
      <div
        :class="['flex p-1 border-4 rounded-lg', state ? 'border-red-500' : 'border-transparent']"
      >
        <input
          v-model="code"
          type="text"
          placeholder="****"
          maxlength="4"
          class="text-center rounded animate-none py-1 block w-full bg-white border-gray-200 shadow-sm mt-px -ms-px mt-0 text-2xl relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
