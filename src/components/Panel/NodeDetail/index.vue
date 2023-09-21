<template>
  <div class="body">
    <el-form label-position="top">
      <el-form-item label="名称">
        <el-input disabled v-model="props.selectedData.sourceData.deviceName" />
      </el-form-item>
      <el-form-item label="分区">
        <el-select
          v-model="props.selectedData.sourceData.comboId"
          placeholder=""
          @blur="onBlur"
        >
          <el-option
            v-for="combo in combos"
            :key="combo.id"
            :label="combo.label"
            :value="combo.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="设备类型">
        <el-input disabled v-model="props.selectedData.sourceData.deviceType" />
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
const combos = ref([]);

onMounted(async () => {
  const response = await getDictionaryByType("combo");
  if (response.status == 200) {
    combos.value = response.data;
  }
});

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
