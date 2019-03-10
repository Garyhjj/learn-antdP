import {myRequest } from '@/utils/request';
import {replaceQuery} from '@/utils';

export function getHeaders() {
    return myRequest('projects/headers?status=Open&startDate=&endDate=&owner=FX823')
}

export function getPeople(header_id ) {
    return myRequest('projects/people?header_id='+header_id)
}

const getLineApi = `projects/lines?header_id={header_id}&assignee=&status=&bu=&code=&customer=&model=&startDate=&endDate=&owner=`

export function getlines(opts) {
    return myRequest(replaceQuery(getLineApi,opts));
}