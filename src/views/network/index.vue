<template>
  <div class="container">
    <div class="top">
      <ActionBar />
    </div>
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
import ActionBar from "@/components/ActionBar/index.vue";
import useGraphDataStore from "@/store/modules/graphData";
import G6 from "@antv/g6";
import { Graph } from "@antv/g6";
import { nextTick, onMounted, ref } from "vue";

let graph: Graph;
const graphDataStore = useGraphDataStore();
const selectedData = ref();
const selectedType = ref();

onMounted(() => {
  nextTick(async () => {
    initGraph();
    initGraphEvent();
  });
});

const initGraph = async () => {
  const container = document.getElementById("graph-container");
  graph = new G6.Graph({
    container: "graph",
    width: container?.offsetWidth,
    height: container?.offsetHeight,
    fitView: true,
    // layout: {
    //   type: "comboCombined",
    //   center: [0, 0], // 可选，默认为图的中心
    //   outerLayout: new G6.Layout["gForce"]({
    //     preventOverlap: true,
    //     minMovement: 0.1,
    //   }),
    // },
    // 必须将 groupByTypes 设置为 false，带有 combo 的图中元素的视觉层级才能合理
    groupByTypes: false,
    defaultCombo: {
      type: "rect", // Combo 类型
      // ... 其他配置
    },
    // defaultEdge: {
    //   type: "polyline",
    // },
    modes: {
      default: [
        "drag-canvas",
        "zoom-canvas",
        "drag-node",
        "drag-combo",
        {
          type: "drag-node",
          onlyChangeComboSize: true,
        },
      ], // 允许拖拽画布、放缩画布、拖拽节点
    },
  });
  graphDataStore.graph = graph;
  await graphDataStore.fetchData();
  graph.data(graphDataStore.data);
  graph.render();
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

  graph.on("canvas:click", () => {
    selectedType.value = null;
    selectedData.value = null;
  });
};

const handlePanelClose = () => {
  selectedType.value = "";
  console.log(graph.save());
};
</script>

<style scoped lang="scss">
.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.top {
  top: 0px;
  right: 0px;
  left: 0px;
  width: 100%;
  background-color: #ffffff;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
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
