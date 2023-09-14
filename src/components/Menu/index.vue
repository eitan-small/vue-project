<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
  >
    <el-menu-item index="/">网络拓扑图</el-menu-item>
    <el-sub-menu index="setting">
      <template #title>设置</template>
      <el-menu-item index="comboSetting">分区设置</el-menu-item>
      <el-menu-item index="deviceTypeSetting">设备类型设置</el-menu-item>
      <!-- <el-menu-item index="linkTypeSetting">链路类型设置</el-menu-item> -->
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const activeIndex = ref("1");
const router = useRouter();
const handleSelect = (key: string) => {
  router.push(key);
};
</script>
