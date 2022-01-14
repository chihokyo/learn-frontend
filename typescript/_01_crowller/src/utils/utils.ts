// 定义接口response的格式
interface Result {
  success: boolean;
  errMsg?: string;
  data: any;
}

export const getResponseData = (data: any, errMsg?: string): Result => {
  if (errMsg) {
    return {
      success: false,
      errMsg,
      data,
    };
  }
  return {
    success: true,
    data,
  };
};
