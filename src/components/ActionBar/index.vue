<template>
  <el-button @click="saveData">
    <SvgIcon name="save" />
    保存
  </el-button>
  <el-button @click="exportPNG">
    <SvgIcon name="save" />
    导出
  </el-button>
</template>

<script setup lang="ts">
import useGraphDataStore from "@/store/modules/graphData";
import html2canvas from 'html2canvas';
import { saveNetworkData } from "@/api/network";

const graphDataStore = useGraphDataStore();
const saveData = () => {
  const data = graphDataStore.graph.save();
  saveNetworkData(data);
};

const exportPNG = async () => {
  // graphDataStore.graph.downloadFullImage("网络拓扑图", "image/png", {
  //   backgroundColor: "#ffffff",
  // });
  const graphContainer = document.getElementById('graph');
  const legendContainer = document.getElementById('legend');

  const [graphCanvas, legendCanvas] = await Promise.all([
    html2canvas(graphContainer),
    html2canvas(legendContainer),
  ]);

  const combinedCanvas = document.createElement('canvas');
  combinedCanvas.width = Math.max(graphCanvas.width, legendCanvas.width);
  combinedCanvas.height = graphCanvas.height + legendCanvas.height;

  const context = combinedCanvas.getContext('2d');
  context.drawImage(graphCanvas, 0, 0);
  context.drawImage(legendCanvas, 8, 8);

  const imageUrl = combinedCanvas.toDataURL('image/png');

  const link = document.createElement('a');
  link.href = imageUrl;
  link.download = 'exported_image.png';
  link.click();
};
</script>
