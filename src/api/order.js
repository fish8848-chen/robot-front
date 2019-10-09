import request from '@/utils/request'

export function getOrdersByRid(params) {
    return request({
        url: '/order/list',
        method: 'get',
        params
    })
}
export function listBtfunOrder(params) {
  return request({
    url: '/order/listBtfunOrder',
    method: 'get',
    params
  })
}
export function listHuobiOrder(params) {
  return request({
    url: '/order/listHuobiOrder',
    method: 'get',
    params
  })
}
export function getProfitInfo(params) {
    return request({
        url: '/orderProfit/list',
        method: 'get',
        params
    })
}

