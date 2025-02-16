<script lang="ts" setup></script>

<template>
  <div class="relative">
    <div class="lamp-container">
      <div class="lamp"></div>
    </div>
    <div class="light-beams">
      <div class="beam"></div>
    </div>
  </div>
</template>

<style scoped>
.lamp-container {
  position: absolute;
  width: 100px;
  height: 100px;
  transform: translate(-50%, -50%);
  transition:
    top 1s linear,
    left 1s linear;
}

.lamp {
  width: 100px;
  height: 100px;
  background: radial-gradient(circle, rgba(255, 0, 0, 1), rgba(255, 0, 0, 0.1));
  border-radius: 50%;
  box-shadow: 0 0 50px red;
}

.light-beams {
  position: absolute;
  overflow: hidden;
  width: 400vh;
  height: 400vh;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition:
    top 1s linear,
    left 1s linear;
}

.beam {
  position: absolute;
  width: 100%;
  height: 100%;
  background: conic-gradient(
    rgba(255, 0, 0, 0.8) 0deg,
    rgba(255, 0, 0, 0.2) 30deg,
    rgba(0, 0, 0, 0) 60deg,
    rgba(0, 0, 0, 0) 300deg,
    rgba(255, 0, 0, 0.2) 330deg,
    rgba(255, 0, 0, 0.8) 360deg
  );
  animation: rotateBeams 1s linear infinite;
}

@keyframes rotateBeams {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
