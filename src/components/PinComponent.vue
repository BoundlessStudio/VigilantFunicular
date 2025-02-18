<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useGameStore } from '@/stores/game'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useGameStore()

const params = defineProps<{ limit: number }>()

const pinInputs = ref<HTMLInputElement[]>([])
const code = ref('')
const attempts = ref(0)

const state = ref<boolean | undefined>(undefined)

const codeChanged = async (code: string) => {
  try {
    attempts.value++
    const data = await store.pin(code)
    if (data.success) {
      router.push('/lvl/' + (store.level + 1))
      return
    }
    if (attempts.value >= params.limit) {
      router.push('/over?lvl=' + store.level)
      return
    }

    state.value = false
  } catch (error) {
    console.error(error)
    router.push('/')
  }
}

watch(code, (newCode) => {
  if (newCode?.length === 0) {
    state.value = undefined
  } else if (newCode?.length === 4) {
    pinInputs.value[3].blur()
    codeChanged(newCode)
  }
})

onMounted(() => {
  pinInputs.value.forEach((input, index) => {
    input.addEventListener('input', () => {
      code.value = pinInputs.value.map((el) => el.value).join('')

      if (input.value.length === 1 && index < pinInputs.value.length - 1) {
        pinInputs.value[index + 1].focus()
      }
    })

    input.addEventListener('keydown', (event) => {
      if (event.key === 'Backspace' && input.value === '' && index > 0) {
        pinInputs.value[index - 1].focus()
      }
    })
  })
})
</script>

<template>
  <div>
    <div class="font-bold text-2xl mb-2 text-center">Pin Code</div>
    <div class="px-10">
      <div
        :class="[
          'flex p-1 border-4 rounded-lg',
          state == undefined ? 'border-transparent' : state ? 'border-green-500' : 'border-red-500',
        ]"
      >
        <input
          v-for="(input, index) in 4"
          :key="index"
          type="text"
          maxlength="1"
          class="text-center first:rounded-l-lg last:rounded-r-lg animate-none py-3 block w-full bg-white border-gray-200 shadow-sm mt-px -ms-px mt-0 text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          ref="pinInputs"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
