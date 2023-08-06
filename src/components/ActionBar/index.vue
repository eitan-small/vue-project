<template>
  <div>
    <el-button @click="saveData">
      <SvgIcon name="save" />
      保存
    </el-button>
  </div>
</template>

<script setup lang="ts">
import useGraphDataStore from "@/store/modules/graphData";
import { saveNetworkData } from "@/api/network";

const graphDataStore = useGraphDataStore();
const saveData = () => {
  const data = graphDataStore.graph.save();
  saveNetworkData(data);
};
</script>
