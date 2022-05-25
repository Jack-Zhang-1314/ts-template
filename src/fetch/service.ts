import type { IhttpCustomerOption } from './type'
import { handleFetchData } from './fetch'

export function get<T = any>(
  url: string,
  params?: RequestInit,
  httpCustomerOpertion: IhttpCustomerOption = {
    isHandleResult: false,
    isShowLoading: true,
  },
) {
  const fetchParams = Object.assign({}, { method: 'GET' }, params?.headers)
  return handleFetchData<T>(url, fetchParams, httpCustomerOpertion)
}

export function post<T = any>(
  url: string,
  params?: RequestInit,
  httpCustomerOpertion: IhttpCustomerOption = {
    isHandleResult: true,
    isShowLoading: true,
  },
) {
  const body = JSON.stringify(params?.body)
  const fetchParams = Object.assign(
    {},
    { method: 'POST', body },
    params?.headers,
  )
  return handleFetchData<T>(url, fetchParams, httpCustomerOpertion)
}
