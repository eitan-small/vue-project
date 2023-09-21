<template>
  <div class="body">
    <el-form label-position="top">
      <el-form-item label="源设备名">
        <el-input
          disabled
          v-model="props.selectedData.sourceData.sourceNode.deviceName"
        />
      </el-form-item>
      <el-form-item label="目标备名">
        <el-input
          v-model="props.selectedData.sourceData.targetNode.deviceName"
          disabled
        />
      </el-form-item>
      <el-form-item label="链路类型">
        <el-select
          v-model="props.selectedData.sourceData.linkType"
          placeholder=""
          @blur="onBlur"
        >
          <el-option
            v-for="linkType in linkTypes"
            :key="linkType.id"
            :label="linkType.label"
            :value="linkType.value"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { getDictionaryByType } from "@/api/network";
import useGraphDataStore from "@/store/modules/graphData";
import { onMounted, ref } from "vue";

const props = defineProps(["selectedData"]);
const graphDataStore = useGraphDataStore();
const linkTypes = ref([]);

onMounted(async () => {
  const response = await getDictionaryByType("link_type");
  if (response.status == 200) {
    linkTypes.value = response.data;
  }
});

const onBlur = () => {
  graphDataStore.graph.render();
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
