import { defineStore } from "pinia";
import { getNetworkData } from "@/api/network";
import G6 from "@antv/g6";

const subjectColors = [
  "#5F95FF",
  "#61DDAA",
  "#65789B",
  "#F6BD16",
  "#7262FD",
  "#78D3F8",
  "#9661BC",
  "#F6903D",
  "#008685",
  "#F08BB4",
];
const backColor = "#fff";
const theme = "default";
const disableColor = "#777";
const colorSets = G6.Util.getColorSetsBySubjectColors(
  subjectColors,
  backColor,
  theme,
  disableColor,
);

const useGraphDataStore = defineStore("GraphData", {
  state: () => ({
    data: null as any,
    graph: null as any,
  }),
  actions: {
    async fetchData() {
      const response = await getNetworkData();
      if (response.status == 200) {
        this.data = response.data;
        this.graph.data(this.data);
        this.updateNode();
      } else {
        console.log(response.message);
      }
    },
    updateNode() {
      this.data.nodes.forEach((ele: any) => {
        ele.comboId = ele.sourceData.comboId;
        const exists = this.data.combos.some(
          (combo: any) => combo.id == ele.comboId,
        );
        if (ele.comboId && !exists) {
          this.data.combos.push({
            id: ele.comboId,
            label: ele.comboId,
          });
        }
        ele.img = "/src/assets/icons/" + ele.sourceData.deviceType + ".svg";
      });
      this.data.combos.forEach((combo, i) => {
        const color = colorSets[i % colorSets.length];
        combo.style = {
          stroke: color.mainStroke,
          fill: color.mainFill,
          opacity: 0.8,
        };
        if (!combo.labelCfg) {
          combo.labelCfg = {
            position: "top",
          };
        }
      });
      this.graph.render();
    },
  },
  getters: {},
});

export default useGraphDataStore;
