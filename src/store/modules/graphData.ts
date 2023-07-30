import { defineStore } from "pinia";
import { getNetworkInfo } from "@/api/network";

const useGraphDataStore = defineStore("GraphData", {
  state: () => ({
    data: null as any,
  }),
  actions: {
    async fetchData() {
      try {
        const response = await getNetworkInfo();
        this.data = response;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
  },
  getters: {},
});

export default useGraphDataStore;
