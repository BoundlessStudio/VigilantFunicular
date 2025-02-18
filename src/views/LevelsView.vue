<script setup lang="ts">
import { shallowRef, watch } from 'vue'
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
const level = shallowRef(LevelUnknown)

// Helper to pick a component based on ID
function pickLevelComponent(id: number) {
  switch (id) {
    case 1:
      return LevelOne
    case 2:
      return LevelTwo
    case 3:
      return LevelThree
    case 4:
      return LevelFour
    case 5:
      return LevelFive
    case 6:
      return LevelSix
    case 7:
      return LevelSeven
    case 8:
      return LevelEight
    case 9:
      return LevelNine
    case 10:
      return LevelTen
    default:
      return LevelUnknown
  }
}

watch(
  () => route.params.id,
  (id) => {
    const lvl = parseInt(id as string, 0)
    level.value = pickLevelComponent(lvl)
  },
  { immediate: true },
)
</script>

<template>
  <component :is="level"></component>
</template>
