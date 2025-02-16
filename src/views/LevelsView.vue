<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import LevelUnknown from '@/levels/LevelUnknown.vue'
import LevelOne from '@/levels/LevelOne.vue'
import LevelTwo from '@/levels/LevelTwo.vue'
import LevelThree from '@/levels/LevelThree.vue'
import LevelFour from '@/levels/LevelFour.vue'
import LevelFive from '@/levels/LevelFive.vue'
import LevelSix from '@/levels/LevelSix.vue'
import LevelSeven from '@/levels/LevelSeven.vue'
import LevelEight from '@/levels/LevelEight.vue'
import LevelNine from '@/levels/LevelNine.vue'
import LevelTen from '@/levels/LevelTen.vue'

const route = useRoute()
const level = ref(LevelUnknown)

// Helper to pick a component based on ID
function pickLevelComponent(id: string | undefined) {
  switch (id) {
    case '1':
      return LevelOne
    case '2':
      return LevelTwo
    case '3':
      return LevelThree
    case '4':
      return LevelFour
    case '5':
      return LevelFive
    case '6':
      return LevelSix
    case '7':
      return LevelSeven
    case '8':
      return LevelEight
    case '9':
      return LevelNine
    case '10':
      return LevelTen
    default:
      return LevelUnknown
  }
}

// Watch for changes in route.params.id
watch(
  () => route.params.id,
  (id) => {
    level.value = pickLevelComponent(id as string)
  },
  // By setting immediate: true, the watch runs immediately
  // to handle the initial value.
  { immediate: true },
)
</script>

<template>
  <component :is="level"></component>
</template>
