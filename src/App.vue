<script setup lang="ts">
import Menu from "@/components/Menu/index.vue";
</script>

<template>
  <Menu />
  <div>
    <router-view></router-view>
  </div>
</template>

<style scoped lang="scss">
div {
  h1 {
    color: $color;
  }
}
</style>
