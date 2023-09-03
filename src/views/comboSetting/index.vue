<template>
  <div>
    <el-button @click="addCardBox" type="primary">新增分区</el-button>
    <div v-for="combo in combos" :key="combo.id">
      <el-card class="box">
        <div class="text">
          <p>{{ combo.value }}</p>
          <el-select v-model="networkDeviceMap[combo.value]" placeholder="">
            <el-option
              v-for="device in devices"
              :key="device.id"
              :label="device.deviceName"
              :value="device.deviceName"
            />
          </el-select>
          <el-button @click="addCard(combo)" type="success">添加设备</el-button>
          <el-button @click="removeCardBox(boxIndex)" type="danger"
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
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getDevices, getCombos } from "@/api/network";

const cardBoxes = ref([]);
const newCardText = ref([]);

const combos = ref([]);
const devices = ref([]);
const networkDeviceMap = ref([]);

const addCardBox = () => {
  console.log("1111");
  //   combo.devices.push(networkDeviceMap[combo.id]);
  //   console.log(combo.devices);
};

const removeCardBox = (boxIndex) => {
  if (boxIndex >= 0 && boxIndex < cardBoxes.value.length) {
    cardBoxes.value.splice(boxIndex, 1);
    newCardText.value.splice(boxIndex, 1);
  }
};

const addCard = (combo) => {
  const deviceName = networkDeviceMap.value[combo.value];
  combo.devices.push({ deviceName: deviceName });
};

const removeCard = (combo, deviceName) => {
  combo.devices = combo.devices.filter(
    (element) => element.deviceName != deviceName,
  );
};

onMounted(async () => {
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
</style>
