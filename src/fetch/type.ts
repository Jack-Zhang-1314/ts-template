/* 使用者传递的参数,用于扩展用户行为 */
export interface IhttpCustomerOption {
  isHandleResult?: boolean //是否需要处理错误结果
  isShowLoading?: boolean //是否需要处理loading动画
  customHead?: HeadersInit //自定义请求头
  timeout?: number //自定义接口超时时间
  isFetched?: boolean //是否已经被调用过
  isAbort?: boolean //是否已经被调用过
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IDataType<T = any> {
  status: number
  data: T
  msg: string
}

export interface IErrorType {
  fetchStatus?: string
  error?: string
  netStatus?: number
}
