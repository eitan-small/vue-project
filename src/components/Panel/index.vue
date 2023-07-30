<template>
  <div class="panel">
    <div v-if="props.selectedType === 'node'">
      <NodeDetail :selectedData="props.selectedData" />
    </div>
    <div v-else-if="props.selectedType === 'edge'">
      <EdgeDetail :selectedData="props.selectedData" />
    </div>
  </div>
</template>

<script setup lang="ts">
import NodeDetail from "@/components/Panel/NodeDetail/index.vue";
import EdgeDetail from "@/components/Panel/EdgeDetail/index.vue";

const props = defineProps(["selectedData", "selectedType"]);
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
}
</style>
