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
        <Legend id="legend" :items="legendItems" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Panel from "@/components/Panel/index.vue";
import Legend from "@/components/Legend/index.vue";
import ActionBar from "@/components/ActionBar/index.vue";
import useGraphDataStore from "@/store/modules/graphData";
import G6 from "@antv/g6";
import { Graph } from "@antv/g6";
import { nextTick, onMounted, ref } from "vue";

let graph: Graph;
const graphDataStore = useGraphDataStore();
const selectedData = ref();
const selectedType = ref();

const legendItems = ref([
  { type: "image", content: "/src/assets/icons/switch.svg", label: "交换机" },
  { type: "image", content: "/src/assets/icons/router.svg", label: "路由器" },
  { type: "image", content: "/src/assets/icons/firewall.svg", label: "防火墙" },
  { type: "image", content: "/src/assets/icons/server.svg", label: "服务器" },
  { type: "line", color: "#B1B3B8", thickness: 3, label: "万兆光纤链路" },
  { type: "line", color: "#B1B3B8", thickness: 1, label: "千兆光纤链路" },
  { type: "line", color: "#FFD700", thickness: 1, label: "千兆铜缆链路" },
]);

const edgeStyles = {
  万兆光纤链路: {
    lineWidth: 2,
    stroke: "#B1B3B8",
  },
  千兆光纤链路: {
    lineWidth: 1,
    stroke: "#B1B3B8",
  },
  千兆铜缆链路: {
    lineWidth: 1,
    stroke: "#FFD700",
  },
  // ...其他类型的样式定义
};

onMounted(() => {
  nextTick(async () => {
    initGraph();
    initGraphEvent();
  });
});

const initGraph = async () => {
  // 移动对齐插件
  const snapLine = new G6.SnapLine({
    line: {
      stroke: "#90c0ff",
    },
  });

  // 自定义节点
  G6.registerNode(
    "custom",
    {
      afterDraw(cfg, group) {
        const size = cfg.size;
        const width = size - 16;
        const height = size - 16;
        // 添加图片
        const image = group.addShape("image", {
          attrs: {
            x: -width / 2,
            y: -height / 2,
            width: width,
            height: height,
            img: cfg.img,
          },
          // must be assigned in G6 3.3 and later versions. it can be any value you want
          name: "image-shape",
        });
      },
      // 自定义锚点位置
      getAnchorPoints() {
        return [
          [0, 0.5],
          [1, 0.5],
          [0.5, 0],
          [0.5, 1],
        ];
      },
    },
    "circle",
  );

  const container = document.getElementById("graph-container");
  graph = new G6.Graph({
    container: "graph",
    width: container?.offsetWidth,
    height: container?.offsetHeight,
    fitView: true,
    groupByTypes: false,
    defaultCombo: {
      type: "rect",
    },
    defaultNode: {
      type: "custom",
      size: 36,
      labelCfg: {
        position: "bottom",
        style: {
          fontSize: 6,
        },
      },
    },
    nodeStateStyles: {
      related: {
        stroke: "white",
        shadowColor: "blue",
        shadowBlur: 5,
        lineWidth: 2,
        opacity: 1,
      },
      selected: {
        opacity: 1,
      },
      dark: {
        opacity: 0.5,
      },
    },
    edgeStateStyles: {
      selected: {
        opacity: 1,
      },
      dark: {
        opacity: 0.5,
      },
    },
    defaultEdge: {
      // type: "polyline",
      // 其他配置
    },
    modes: {
      default: [
        "drag-canvas",
        "zoom-canvas",
        "drag-combo",
        {
          type: "drag-node",
          onlyChangeComboSize: true,
        },
      ],
    },
    layout: {
      type: "comboCombined",
      outerLayout: new G6.Layout["dagre"]({
        // 该布局的参数
        nodesep: 30,
        ranksep: 30,
      }),
      innerLayout: new G6.Layout["dagre"]({
        nodesep: 10,
        ranksep: 10,
      }),
    },
    plugins: [snapLine],
  });
  graphDataStore.graph = graph;

  graph.edge((edge) => {
    edge.style = edgeStyles[edge.sourceData.linkType];
    return edge;
  });

  await graphDataStore.fetchData();
};

const initGraphEvent = () => {
  graph.on("node:click", (event) => {
    // 用于传递给 Panel
    const nodeData: any = event.item?.getModel();
    selectedType.value = "node";
    selectedData.value = nodeData;

    // 清除状态
    clearAllStats();
    setAllDark();
    // 设置点击节点为 selected
    const node = event.item;
    if (node != null) {
      graph.setItemState(node, "selected", !node.hasState("selected"));
      node.toFront();
      // 设置边和边连接的节点为 related
      node.getEdges().forEach((edge) => {
        graph.setItemState(edge, "selected", true);
        edge.toFront();
        // 与边连接的源节点
        const sourceNode = edge.getSource();
        if (edge.getSource().get("id") == node.get("id")) {
          graph.setItemState(sourceNode, "related", true);
          sourceNode.toFront();
        }
        // 与边连接的目标节点
        const targetNode = edge.getTarget();
        if (edge.getSource().get("id") == node.get("id")) {
          graph.setItemState(targetNode, "related", true);
          targetNode.toFront();
        }
      });
    }
  });

  graph.on("edge:click", (event) => {
    const edgeData: any = event.item?.getModel();
    selectedType.value = "edge";
    selectedData.value = edgeData;

    // 清除状态
    clearAllStats();
    setAllDark();
    graph.setItemState(event.item, "selected", true);
    // 关联的两个节点
    graph.setItemState(event.item.getSource(), "related", true);
    graph.setItemState(event.item.getTarget(), "related", true);
  });
};

const handlePanelClose = () => {
  selectedType.value = "";
  clearAllStats();
  setAllToBack();
};

const clearAllStats = () => {
  graph.getNodes().forEach(function (node) {
    graph.clearItemStates(node);
  });
  graph.getEdges().forEach(function (edge) {
    graph.clearItemStates(edge);
  });
};

const setAllDark = () => {
  graph.getNodes().forEach(function (node) {
    graph.setItemState(node, "dark", true);
  });
  graph.getEdges().forEach(function (edge) {
    graph.setItemState(edge, "dark", true);
  });
};

const setAllToBack = () => {
  graph.getNodes().forEach(function (node) {
    node.toBack();
  });
  graph.getEdges().forEach(function (edge) {
    edge.toBack();
  });
  graph.getCombos().forEach(function (combo) {
    combo.toBack();
  });
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
