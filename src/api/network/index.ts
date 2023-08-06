import request from "@/utils/request";

// 统一管理接口
enum API {
  NETWORKDATA_URL = "/network/data",
  SAVENETWORKDATA_URL = "/network/saveData",
}

// 对外暴露函数
export const getNetworkData = () => request.post(API.NETWORKDATA_URL);

export const saveNetworkData = (data: any) =>
  request.post(API.SAVENETWORKDATA_URL, data);
