import request from '@/utils/request'

export function getLogsByRid(params) {
    return request({
        url: '/logs/list',
        method: 'get',
        params
    })
}


