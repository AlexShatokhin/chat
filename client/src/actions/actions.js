export const setUserInformation = (authInformation) => ({
    type: "CHANGE_USER_INFORMATION",
    payload: authInformation
})

export const addSocket = (socket) => ({
    type: "ADD_REF",
    payload: socket
})