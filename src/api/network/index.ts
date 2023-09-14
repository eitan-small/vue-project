import request from "@/utils/request";

// 统一管理接口
enum API {
  NETWORKDATA_URL = "/network/data",
  SAVENETWORKDATA_URL = "/network/saveData",
  GETDICTIONARYBYtYPE_URL = "/network/dictionary/getByType",
  GETDEVICES_URL = "/network/networkDevices/list",
  ADDCOMBOS_URL = "/network/networkDevices/addCombo",
  DELETECOMBO_URL = "/network/networkDevices/deleteCombo",
  SAVECOMBO_URL = "/network/networkDevices/saveCombo",
  GETCOMBOS_URL = "/network/networkDevices/getCombos",
  GETADDDEVICES_URL = "/network/networkDevices/getAddDevices",
  ADDCOMBODEVICES_URL = "/network/networkDevices/addComboDevices",
  DELETEDEVICECOMBO_URL = "/network/networkDevices/deleteDeviceCombo",
  GETDEVICETYPES_URL = "/network/networkDevices/getDeviceTypes",
  DELETEDEVICETYPE_URL = "/network/networkDevices/deleteDeviceType",
}

// 对外暴露函数
export const getNetworkData = () => request.post(API.NETWORKDATA_URL);

export const saveNetworkData = (data: any) =>
  request.post(API.SAVENETWORKDATA_URL, data);

export const getDictionaryByType = (type: string) =>
  request.get(API.GETDICTIONARYBYtYPE_URL, {
    params: {
      type: type,
    },
  });

export const getDevices = () => request.post(API.GETDEVICES_URL);

export const deleteCombo = (combo: string) =>
  request.get(API.DELETECOMBO_URL, {
    params: {
      combo: combo,
    },
  });

export const addCombo = (combo: string) =>
  request.get(API.ADDCOMBOS_URL, {
    params: {
      combo: combo,
    },
  });

export const getCombos = () => request.post(API.GETCOMBOS_URL);

export const getAddDevices = (combo: string, type: string) =>
  request.get(API.GETADDDEVICES_URL, {
    params: {
      combo: combo,
      type: type,
    },
  });

export const addComboDevices = (data: any) =>
  request.post(API.ADDCOMBODEVICES_URL, data);

export const deleteDeviceCombo = (deviceName: string) =>
  request.get(API.DELETEDEVICECOMBO_URL, {
    params: {
      deviceName: deviceName,
    },
  });

export const getDeviceTypes = () => request.post(API.GETDEVICETYPES_URL);

export const deleteDeviceType = (deviceName: string) =>
  request.get(API.DELETEDEVICETYPE_URL, {
    params: {
      deviceName: deviceName,
    },
  });
