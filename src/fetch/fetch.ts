import type { IhttpCustomerOption, IDataType, IErrorType } from './type'
/**
 * A function that handles the fetch request.
 * @param {string} fetchUrl - The request address
 * @param {RequestInit} params - RequestInit
 * @param {IhttpCustomerOption} httpCustomerOperation - IhttpCustomerOption
 */
export function handleFetchData<T = any>(
  fetchUrl: string,
  params: RequestInit,
  httpCustomerOperation: IhttpCustomerOption,
): Promise<T> {
  const { isShowLoading } = httpCustomerOperation
  if (isShowLoading) {
    // loading
  }
  httpCustomerOperation.isAbort = false
  httpCustomerOperation.isFetched = false

  //处理请求头
  if (httpCustomerOperation.customHead) {
    params.headers = Object.assign(
      {},
      params.headers,
      httpCustomerOperation.customHead,
    )
  }

  //封装fetch,T是对返回数据的类型的约束和函数的T一样
  const fetchPromise = new Promise<T>((resolve, reject) => {
    fetch(fetchUrl, params)
      .then((response: Response) => {
        //放弃迟到的响应
        if (httpCustomerOperation.isAbort) {
          //请求超时
          return
        }
        if (isShowLoading) {
          // loading
        }
        httpCustomerOperation.isFetched = true
        response
          .json()
          .then((jsonData: T) => {
            if (response.ok) {
              // //返回处理结果
              // switch (jsonData.status) {
              //   case 5:
              //     //token失效,处理token
              //     break
              //   case 0 || undefined:
              //     //业务逻辑报错
              //     reject(handleFailedResult(jsonData, httpCustomerOperation))
              //     break
              //   default:
              //     // 正常返回
              //     resolve(handleResult(jsonData, httpCustomerOperation))
              // }
              console.log(handleResult(jsonData, httpCustomerOperation))
            } else {
              //接口判断
              //* status<200 || status>=300
              let msg = '服务器繁忙，请稍后再试'
              if (response.status === 404) {
                msg = '接口不存在'
              }
              reject(
                handleFailedResult(
                  {
                    fetchStatus: 'error',
                    netStatus: response.status,
                    error: msg,
                  },
                  httpCustomerOperation,
                ),
              )
            }
          })
          .catch((e) => {
            reject(
              handleFailedResult(
                {
                  fetchStatus: 'error',
                  error: e,
                  netStatus: response.status,
                },
                httpCustomerOperation,
              ),
            )
          })
      })
      .catch((e) => {
        if (httpCustomerOperation.isAbort) {
          // 请求超时后，放弃迟到的响应
          return
        }
        if (isShowLoading) {
          //取消动画
        }
        httpCustomerOperation.isFetched = true
        reject(
          handleFailedResult(
            { fetchStatus: 'error', error: e },
            httpCustomerOperation,
          ),
        )
      })
  })

  return Promise.race([fetchPromise, fetchTimeout(httpCustomerOperation)])
}

/* 处理后台返回的结果,包括业务逻辑的报错
 * 通过isHandleResult统一判断是否需要处理
 */
function handleResult(
  result: IDataType & IErrorType,
  httpCustomerOperation: IhttpCustomerOption,
) {
  if (result.status && httpCustomerOperation.isHandleResult) {
    //处理错误结果
    const errMsg = result.error || '服务器繁忙，请稍后再试'
    console.log(`出现业务错误${errMsg}`)
  }
  return result
}

function handleFailedResult(
  result: IDataType & IErrorType,
  httpCustomerOperation: IhttpCustomerOption,
) {
  if (result.status && httpCustomerOperation.isHandleResult === true) {
    const errMsg = result.error || '服务器开小差了，稍后再试吧'
    console.log(`${errMsg},${result.status}`)
  }
  const errorMsg =
    'Uncaught PromiseError: ' +
    (result.netStatus || '') +
    ' ' +
    (result.error || '')
  return errorMsg
}

function fetchTimeout(httpCustomerOperation: IhttpCustomerOption) {
  const { isShowLoading } = httpCustomerOperation
  return new Promise<any>((_, reject) => {
    setTimeout(() => {
      if (!httpCustomerOperation.isFetched) {
        //未收到响应,则开始超时逻辑,标记fetch放弃
        httpCustomerOperation.isFetched = true
        console.log('请求超时')
        if (isShowLoading) {
          // 取消
        }
        reject({ fetchStatus: 'timeout' })
      }
    }, httpCustomerOperation.timeout || 8000)
  })
}
