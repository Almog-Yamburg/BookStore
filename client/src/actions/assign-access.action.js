const assignAccessActionTypes = {
    TOKEN_INITIAL_STATE: "TOKEN_INITIAL_STATE",
    USER_TYPE_INITIAL_STATE: "USER_TYPE_INITIAL_STATE",
};

export const initialTokenAction = (token) => {
    const action = {
        type: assignAccessActionTypes.TOKEN_INITIAL_STATE,
        payload: {
            token: token,
        },
    };

    return action;
};

export const initialUserTypeAction = (userType) => {
    const action = {
        type: assignAccessActionTypes.USER_TYPE_INITIAL_STATE,
        payload: {
            userType: userType,
        },
    };

    return action;
};

export default assignAccessActionTypes;
