<template>
  <div>
    <el-button @click="centerDialogVisible = true" type="primary"
      >新增分区</el-button
    >
    <div v-for="combo in combos" :key="combo.id">
      <el-card class="box">
        <div class="text">
          <p>{{ combo.value }}</p>
          <el-select
            v-model="networkDeviceMap[combo.value]"
            multiple
            placeholder=""
            class="selector"
          >
            <el-option
              v-for="device in devices"
              :key="device.id"
              :label="device.deviceName"
              :value="device.deviceName"
            />
          </el-select>
          <el-button @click="addCard(combo)" type="success">添加设备</el-button>
          <el-button @click="saveCardBox(combo)" type="primary"
            >保存分区</el-button
          >
          <el-button @click="removeCardBox(combo)" type="danger"
            >删除分区</el-button
          >
        </div>
        <div class="box-content">
          <el-card
            v-for="device in combo.devices"
            :key="device.deviceName"
            class="card"
          >
            <div class="card-content">
              {{ device.deviceName }}
              <el-button
                @click="removeCard(combo, device.deviceName)"
                type="text"
                >删除</el-button
              >
            </div>
          </el-card>
        </div>
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
        <el-button type="primary" @click="addCardBox">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getDevices, getCombos, deleteCombo, saveCombo } from "@/api/network";
import { ElMessage } from "element-plus";

const combos = ref([]);
const devices = ref([]);
const networkDeviceMap = ref([]);

// 对话框
const centerDialogVisible = ref(false);
const input = ref("");

const addCardBox = () => {
  const trimmedValue = validateInputValue(input.value);
  if (trimmedValue) {
    combos.value.push({ value: trimmedValue, devices: [] });
    centerDialogVisible.value = false;
  }
};

const saveCardBox = async (combo) => {
  try {
    await saveCombo(combo);
    refreshData();
  } catch (error) {
    ElMessage.error("保存分区失败：" + error.message);
  }
};

const removeCardBox = async (combo) => {
  try {
    await deleteCombo(combo.value);
    refreshData();
  } catch (error) {
    ElMessage.error("删除分区失败：" + error.message);
  }
};

const addCard = (combo) => {
  const deviceNames = networkDeviceMap.value[combo.value];

  // 如果 deviceName 为空，直接返回
  if (!deviceNames) {
    return;
  }

  if (!combo.devices) {
    combo.devices = [];
  }

  console.log(deviceNames);

  deviceNames.forEach((deviceName) => {
    // 检查 combo.devices 中是否已经存在相同的 deviceName
    const exists = combo.devices.some(
      (device) => device.deviceName === deviceName,
    );

    // 如果已经存在相同的 deviceName，直接返回
    if (exists) {
      return;
    }

    combo.devices.push({ deviceName: deviceName });
  });

  networkDeviceMap.value[combo.value] = [];
};

const removeCard = (combo, deviceName) => {
  combo.devices = combo.devices.filter(
    (element) => element.deviceName != deviceName,
  );
};

const refreshData = async () => {
  const response = await getDevices();
  if (response.status == 200) {
    devices.value = response.data;
  } else {
    console.log(response.message);
  }
  const comboResponse = await getCombos("combo");
  if (comboResponse.status == 200) {
    combos.value = comboResponse.data;
  } else {
    console.log(comboResponse.message);
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
</script>

<style scoped>
.box {
  margin: 20px;
  width: 90%;
  vertical-align: top;
}

.text {
  padding: 16px;
}

.box-content {
  padding: 16px;
  display: flex;
  flex-wrap: wrap;
}

.card {
  margin: 8px 8px;
  width: 200px;
}

.card-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
