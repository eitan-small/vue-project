<template>
  <div class="header">
    <div class="title">属性面板</div>
    <div class="close">
      <el-button>
        <SvgIcon name="close" />
      </el-button>
    </div>
  </div>
  <div class="body">
    <div class="device-name">
      <h3>{{ props.selectedData.deviceName }}</h3>
    </div>
    {{ props.selectedData }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps(["selectedData"]);
</script>

<style scoped>
.header {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  border-bottom: 1px solid var(--border-color-base);
  border-radius: 2px 2px 0 0;
}

.title {
  margin: 0;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  color: #4d4d4d;
}

.el-button {
  border: none;
  width: 32px;
  height: 32px;
}

.body {
  padding: 12px;
  overflow: auto;
  font-size: 14px;
  line-height: 1.5715;
  word-wrap: break-word;
}
</style>
