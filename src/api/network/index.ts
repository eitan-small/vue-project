import request from "@/utils/request";

// 统一管理接口
enum API {
  NETWORKDATA_URL = "/network/data",
  SAVENETWORKDATA_URL = "/network/saveData",
  GETDICTIONARYBYtYPE_URL = "/network/dictionary/getByType",
  GETDEVICES_URL = "/network/networkDevices/list",
  GETCOMBOS_URL = "/network/networkDevices/getCombos",
  DELETECOMBO_URL = "/network/networkDevices/deleteCombo",
  SAVECOMBO_URL = "/network/networkDevices/saveCombo",
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

export const getCombos = () => request.post(API.GETCOMBOS_URL);

export const deleteCombo = (combo: string) =>
  request.get(API.DELETECOMBO_URL, {
    params: {
      combo: combo,
    },
  });

export const saveCombo = (data: any) => request.post(API.SAVECOMBO_URL, data);
