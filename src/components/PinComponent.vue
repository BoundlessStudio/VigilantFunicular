<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const pinInputs = ref<HTMLInputElement[]>([])

const code = ref('')
const emit = defineEmits(['codeChanged'])

watch(code, (newCode) => {
  if (newCode?.length === 4) {
    emit('codeChanged', newCode)
  }
})

onMounted(() => {
  pinInputs.value.forEach((input, index) => {
    input.addEventListener('input', (event) => {
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
  <div class="px-10">
    <div class="font-bold text-xl mb-2 text-center">Pin Code</div>
    <div class="sm:flex rounded-lg shadow-sm">
      <input
        v-for="(input, index) in 4"
        :key="index"
        type="text"
        maxlength="1"
        class="py-3 px-4 pe-11 block w-full border-gray-200 sm:shadow-sm -mt-px -ms-px first:rounded-t-lg last:rounded-b-lg sm:first:rounded-s-lg sm:mt-0 sm:first:ms-0 sm:first:rounded-se-none sm:last:rounded-es-none sm:last:rounded-e-lg text-sm relative focus:z-10 focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
        ref="pinInputs"
      />
    </div>
  </div>
</template>

<style scoped></style>
