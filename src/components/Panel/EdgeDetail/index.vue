<template>
  <div class="body">{{ props.selectedData }}</div>
</template>

<script setup lang="ts">
const props = defineProps(["selectedData"]);
</script>

<style scoped>
.body {
  padding: 12px;
  overflow: auto;
  font-size: 14px;
  line-height: 1.5715;
  word-wrap: break-word;
}
</style>
