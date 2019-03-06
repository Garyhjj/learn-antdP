import {getHeaders} from '@/services/project';

export default {
    namespace: 'projectM',
    state: {
        headers: [],
        lines: [],
        people: []
    },
    effects: {
        * fetchHeader({ payload }, {call,put}) {
            const res = yield call(getHeaders);
            yield put({type: 'saveHeaders',payload: res});
        }
    },
    reducers: {
        saveHeaders(state,{ payload }) {
            return {...state,headers: payload}
        }
    }
}