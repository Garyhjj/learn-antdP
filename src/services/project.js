import {myRequest } from '@/utils/request';


export function getHeaders() {
    return myRequest('projects/headers?status=Open&startDate=&endDate=&owner=FX823')
}