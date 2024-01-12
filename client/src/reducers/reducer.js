const initialState = {
    authData: {},
    socket: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case "CHANGE_USER_INFORMATION": 
            return {
                ...state,
                authData: action.payload
            }

        case "ADD_REF":    
            return {
                ...state,
                socket: action.payload
            }

        default: return state;
            
    }
}

export default reducer;