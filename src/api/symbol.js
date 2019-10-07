import request from '@/utils/request'
/**
 * 获取节点信息
 */
export function getSymbols(symbolsParam) {
    return request({
        url: '/symbol/symbols',
        method: 'get',
        params: symbolsParam
    })
}
