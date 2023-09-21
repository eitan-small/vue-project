<template>
  <div class="container">
    <div class="box">
      <el-card>
        <div class="card-header">
          <h2>设备类型设置</h2>
        </div>
        <el-table
          ref="singleTableRef"
          :data="combosFilterTableData"
          style="width: 100%"
          height="600"
        >
          <el-table-column type="expand">
            <template #default="props">
              <div m="4">
                <el-table :data="props.row.devices" border>
                  <el-table-column type="index" />
                  <el-table-column label="序列号" prop="serialNumber" />
                  <el-table-column label="设备名" prop="deviceName" />
                  <el-table-column label="分区" prop="comboId" />
                  <el-table-column align="right">
                    <template #default="scope">
                      <el-button
                        size="small"
                        type="danger"
                        text
                        @click="handleDeviceDelete(scope.$index, scope.row)"
                        >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </div>
            </template>
          </el-table-column>
          <el-table-column type="index" width="80" />
          <el-table-column prop="value" label="设备类型" width="480" />
          <el-table-column align="right" width="380">
            <template #header>
              <el-input
                v-model="search"
                size="small"
                placeholder="搜索 设备类型"
              />
            </template>
            <template #default="scope">
              <el-button size="small" @click="openDialog(scope.row)"
                >编辑</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </div>

  <el-dialog v-model="dialogVisible" title="新增设备" width="50%" align-center>
    <el-table
      :data="addDeviceList"
      style="width: 100%; height: 500px"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" />
      <el-table-column label="序列号" prop="serialNumber" />
      <el-table-column label="设备名" prop="deviceName" />
      <el-table-column label="设备类型" prop="deviceType" />
      <el-table-column label="分区" prop="comboId" />
    </el-table>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addDevices">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import {
  getDeviceTypes,
  addCombo,
  getAddDevices,
  addComboDevices,
  deleteDeviceType,
} from "@/api/network";
import { ElMessage, ElMessageBox } from "element-plus";

// 搜索栏
const search = ref("");

let combosTableData = ref([]);
const combosFilterTableData = computed(() =>
  combosTableData.value.filter(
    (data) =>
      !search.value ||
      data.value.toLowerCase().includes(search.value.toLowerCase()),
  ),
);

// 添加分区对话框
const dialogVisible = ref(false);
let comboId;
const openDialog = (row) => {
  dialogVisible.value = true;
  comboId = row.value;
  refreshAddDeviceList(row.value);
};

let addDeviceList = ref([]);
const refreshAddDeviceList = async (combo: string) => {
  const response = await getAddDevices(combo, "2");
  if (response.status == 200) {
    addDeviceList.value = response.data;
  }
};

const multipleSelection = ref([]);
const handleSelectionChange = (val) => {
  multipleSelection.value = val;
};

const addDevices = async () => {
  await addComboDevices({
    deviceType: comboId,
    devices: multipleSelection.value,
  });
  await refreshData();
  dialogVisible.value = false;
};

const handleDeviceDelete = async (index, row) => {
  ElMessageBox.confirm(
    "将删除设备" + row.deviceName + "，是否继续？",
    "Warning",
    {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning",
    },
  )
    .then(async () => {
      try {
        await deleteDeviceType(row.deviceName);
        refreshData();
        ElMessage({
          type: "success",
          message: "删除成功",
        });
      } catch (error) {
        ElMessage.error("删除失败：" + error.message);
      }
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "Delete canceled",
      });
    });
};

const refreshData = async () => {
  const response = await getDeviceTypes();
  if (response.status == 200) {
    combosTableData.value = response.data;
  }
};

onMounted(async () => {
  refreshData();
});
</script>

<style scoped>
.container {
  margin: 20px 20px;
  vertical-align: top;
  /* justify-content: space-between; */
  display: flex;
  flex-wrap: wrap;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.box {
  margin: 10px 10px;
}
</style>
