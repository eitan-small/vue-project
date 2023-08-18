<template>
  <div class="legend-container">
    <div v-for="(item, index) in items" :key="index" class="legend-item">
      <template v-if="item.type === 'image'">
        <img :src="item.content" class="legend-image" />
      </template>
      <template v-else-if="item.type === 'line'">
        <div
          :style="{
            backgroundColor: item.color,
            height: item.thickness + 'px',
          }"
          class="legend-line"
        ></div>
      </template>
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  items: Array,
});
</script>

<style scoped>
.legend-container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  position: absolute;
  top: 20px;
  left: 20px;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 4px;
  min-width: 500px;
}

.legend-image {
  width: 30px;
  height: 30px;
  margin-right: 30px;
}

.legend-line {
  width: 30px;
  margin-right: 30px;
}
</style>
