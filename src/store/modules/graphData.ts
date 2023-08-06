import { defineStore } from "pinia";
import { getNetworkData } from "@/api/network";

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
        // this.updateNode();
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
      });
      console.log(this.data);
      this.graph.render();
    },
  },
  getters: {},
});

export default useGraphDataStore;
