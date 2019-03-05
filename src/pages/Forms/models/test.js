export default {
    namespace: 'ttt',
    state: {
        ii: 456
    },
    reducers: {
        'hello/@@start'(state) {
            console.log(state,456);
            return {...state,...payload}
        },
        hello(state, {payload}) {
            console.log(state,payload);
            return {...state,...payload}
        }
    }
}