<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { useGameStore } from '@/stores/game'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useGameStore()

const params = defineProps<{ limit: number }>()

const pinInputs = ref<HTMLInputElement[]>([])
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
    pinInputs.value[3].blur()
    codeChanged(newCode)
  }
})

onMounted(() => {
  pinInputs.value.forEach((input, index) => {
    input.addEventListener('click', () => {
      pinInputs.value.forEach((el) => {
        el.value = ''
      })
    })

    input.addEventListener('paste', (event) => {
      const paste = (event.clipboardData?.getData('text') || '').trim() as string
      for (let i = 0; i < 4; i++) {
        const el = pinInputs.value[i]
        el.value = paste[i]
      }
    })

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
          v-for="(input, index) in 4"
          :key="index"
          type="text"
          maxlength="1"
          placeholder="#"
          class="text-center first:rounded-l-lg last:rounded-r-lg animate-none py-3 block w-full bg-white border-gray-200 shadow-sm mt-px -ms-px mt-0 text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
          ref="pinInputs"
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
