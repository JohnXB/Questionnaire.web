function userReducer(state, action) {
    switch (action.type) {
        case 'ADD_TOKEN':
            return {
                token:action.token
            }

        default:
            return state  // 没有匹配的action type，返回原来的state
    }
}


function reducer(state, action) {
    return {
        user: userReducer(state.user, action)
    }
}

export default reducer
