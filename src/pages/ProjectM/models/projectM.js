import {getHeaders, getlines, getPeople} from '@/services/project';

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
        },
        * fetchLines({ payload }, {call,put}) {
            const res = yield call(getlines,payload);
           yield put({type: 'saveLines',payload: res});
        },
        * fetchPeople({ payload }, {call,put}) {
            const res = yield call(getPeople,payload);
            yield put({type: 'savePeople',payload: res});
        }
    },
    reducers: {
        saveHeaders(state,{ payload }) {
            return {...state,headers: payload}
        },
        saveLines(state,{ payload }) {
            return {...state,lines: payload}
        },
        savePeople(state,{ payload }) {
            return {...state,people: payload}
        }
    }
}