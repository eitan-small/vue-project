<template>
  <Transition name="slide">
    <div class="panel" v-if="props.selectedType">
      <el-scrollbar>
        <div class="header">
          <div class="title">属性面板</div>
          <div class="close">
            <el-button @click="closePanel">
              <SvgIcon name="close" />
            </el-button>
          </div>
        </div>
        <div v-if="props.selectedType === 'node'">
          <NodeDetail :selectedData="props.selectedData" />
        </div>
        <div v-else-if="props.selectedType === 'edge'">
          <EdgeDetail :selectedData="props.selectedData" />
        </div>
      </el-scrollbar>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import NodeDetail from "@/components/Panel/NodeDetail/index.vue";
import EdgeDetail from "@/components/Panel/EdgeDetail/index.vue";

const props = defineProps(["selectedData", "selectedType"]);
const emit = defineEmits();
const closePanel = () => {
  emit("close");
};
</script>

<style scoped lang="scss">
.panel {
  width: 356px;
  height: unset;
  box-shadow:
    rgba(0, 0, 0, 0.08) 6px 0px 16px -8px,
    rgba(0, 0, 0, 0.05) 9px 0px 28px 0px,
    rgba(0, 0, 0, 0.03) 12px 0px 48px 16px;
  position: absolute;
  top: 4px;
  left: unset;
  right: 10px;
  bottom: 4px;
  background-color: white;
}

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

.slide-enter-active {
  transition: all 0.5s ease-out;
}

.slide-leave-active {
  transition: all 0.5s;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
}
</style>
