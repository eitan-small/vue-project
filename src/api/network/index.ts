import request from "@/utils/request";

// 统一管理接口
enum API {
  NETWORKINFO_URL = "/network/info",
}

// 对外暴露函数
export const getNetworkInfo = () => request.post(API.NETWORKINFO_URL);
