<template>
  <div class="container">
    <div class="top">top</div>
    <div class="graph-container" id="graph-container">
      <div id="graph"></div>
      <div class="graph-component">
        <Panel
          :selectedData="selectedData"
          :selectedType="selectedType"
          @close="handlePanelClose"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Panel from "@/components/Panel/index.vue";
import useGraphDataStore from "@/store/modules/graphData";
import G6 from "@antv/g6";
import { Graph } from "@antv/g6";
import { nextTick, onMounted, ref } from "vue";

let graph: Graph;
const graphDataStore = useGraphDataStore();
const selectedData = ref();
const selectedType = ref();

graphDataStore.$subscribe((mutation) => {
  console.log(mutation);
  if (!Array.isArray(mutation.events)) {
    const newValue = mutation.events.newValue;
    graph.data(newValue);
  }
  graph.render();
});
graphDataStore.fetchData();

onMounted(() => {
  nextTick(() => {
    initGraph();
    initGraphEvent();
  });
});

const initGraph = () => {
  const container = document.getElementById("graph-container");
  graph = new G6.Graph({
    container: "graph",
    width: container?.offsetWidth,
    height: container?.offsetHeight,
  });
};

const initGraphEvent = () => {
  graph.on("node:click", (event) => {
    const nodeData: any = event.item?.getModel();
    selectedType.value = "node";
    selectedData.value = nodeData;
  });

  graph.on("edge:click", (event) => {
    const edgeData: any = event.item?.getModel();
    selectedType.value = "edge";
    selectedData.value = edgeData;
  });

  graph.on("canvas:click", (event) => {
    selectedType.value = null;
    selectedData.value = null;
  });
};

const handlePanelClose = () => {
  selectedType.value = "";
};
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.top {
  height: 10%;
}

.graph-container {
  flex: 1;
  position: relative;
}

.graph-content {
  height: 100%;
  width: 100%;
}
</style>
