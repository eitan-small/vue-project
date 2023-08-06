<template>
  <div class="body">
    <el-form label-position="top">
      <el-form-item label="Name">
        <el-input v-model="props.selectedData.sourceData.deviceName" />
      </el-form-item>
      <el-form-item label="ComboId">
        <el-input
          v-model="props.selectedData.sourceData.comboId"
          @blur="onBlur"
        />
      </el-form-item>
      <el-form-item label="DeviceType">
        <el-input v-model="props.selectedData.sourceData.deviceType" />
      </el-form-item>
    </el-form>
    {{ props.selectedData }}
  </div>
</template>

<script setup lang="ts">
import useGraphDataStore from "@/store/modules/graphData";

const props = defineProps(["selectedData"]);
const graphDataStore = useGraphDataStore();

const onBlur = () => {
  graphDataStore.updateNode();
};
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
