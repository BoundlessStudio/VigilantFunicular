<script setup lang="ts">
import { onMounted, shallowRef, watch } from 'vue'
// import { useRoute } from 'vue-router'
import { useGameStore } from '@/stores/game'
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
import { useRouter } from 'vue-router'

const store = useGameStore()
const router = useRouter()
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
  () => store.level,
  (lvl) => {
    if (lvl > 0 && lvl <= 10) level.value = pickLevelComponent(lvl)
    else router.push('/over')
  },
  { immediate: true },
)

onMounted(async () => {
  try {
    await store.start()
  } catch (error) {
    console.log(error)
    router.push('/over?error=start')
  }
})
</script>

<template>
  <component :is="level"></component>
</template>
