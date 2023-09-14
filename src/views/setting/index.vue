<template>
  <div class="container">
    <div class="box">
      <el-card>
        <div class="card-header">
          <h2>分区设置</h2>
          <div>
            <el-button
              class="button"
              type="success"
              @click="centerDialogVisible = true"
              >添加分区</el-button
            >
          </div>
        </div>
        <el-table
          ref="singleTableRef"
          :data="combosFilterTableData"
          style="width: 100%"
          height="600"
        >
          <el-table-column fixed type="index" width="80" />
          <el-table-column prop="label" label="分区名" width="480" />
          <el-table-column align="right" width="480">
            <template #header>
              <el-input
                v-model="search"
                size="small"
                placeholder="搜索 分区名"
              />
            </template>
            <template #default="scope">
              <el-button
                size="small"
                @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button
              >
              <el-button
                size="small"
                type="danger"
                @click="handleComboDelete(scope.$index, scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>

    <div class="box">
      <el-card>
        <div class="card-header">
          <h2>设备类型设置</h2>
        </div>
        <el-table :data="tableData2" stripe style="width: 100%" height="600">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" width="180" />
        </el-table>
      </el-card>
    </div>

    <div class="box">
      <el-card>
        <div class="card-header">
          <h2>链路类型设置</h2>
        </div>
        <el-table :data="tableData3" stripe style="width: 100%" height="600">
          <el-table-column prop="date" label="Date" width="180" />
          <el-table-column prop="name" label="Name" width="180" />
          <el-table-column prop="address" label="Address" width="180" />
        </el-table>
      </el-card>
    </div>
  </div>

  <el-dialog
    v-model="centerDialogVisible"
    title="新增分区"
    width="30%"
    align-center
  >
    <el-input v-model="input" placeholder="分区名称" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleComboAdd">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { getDictionaryByType, deleteCombo, saveCombo } from "@/api/network";
import { ElMessage, ElMessageBox } from "element-plus";

// 搜索栏
const search = ref("");
// 对话框
const centerDialogVisible = ref(false);
const input = ref("");
let combosTableData = ref([]);
const combosFilterTableData = computed(() =>
  combosTableData.value.filter(
    (data) =>
      !search.value ||
      data.label.toLowerCase().includes(search.value.toLowerCase()),
  ),
);
const handleComboAdd = async () => {
  const trimmedValue = validateInputValue(input.value);
  if (trimmedValue) {
    const response = await saveCombo({ value: input.value });
    if (response.status == 200) {
      refreshData();
    } else {
      ElMessage.error(response.message);
    }
  }
  centerDialogVisible.value = false;
};
const handleComboDelete = async (index, row) => {
  ElMessageBox.confirm("将删除分区" + row.label + "，是否继续？", "Warning", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      try {
        await deleteCombo(row.label);
        refreshData();
        ElMessage({
          type: "success",
          message: "删除成功",
        });
      } catch (error) {
        ElMessage.error("删除分区失败：" + error.message);
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
  const response = await getDictionaryByType("combo");
  if (response.status == 200) {
    combosTableData.value = response.data;
  } else {
    console.log(response.message);
  }
};

const validateInputValue = (value) => {
  const trimmedValue = value.trim();
  if (trimmedValue === "") {
    ElMessage.error("请输入有效值");
    return false;
  }
  return trimmedValue;
};

onMounted(async () => {
  refreshData();
});

const tableData2 = [
  {
    date: "2016-05-03",
    name: "Tom1",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
const tableData3 = [
  {
    date: "2016-05-03",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-02",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-04",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
  {
    date: "2016-05-01",
    name: "Tom",
    address: "No. 189, Grove St, Los Angeles",
  },
];
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
