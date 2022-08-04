import assignAccessActionTypes from "../actions/assign-access.action";

export const ASSIGN_ACCESS_INITIAL_STATE = {
    token: null,
    userType: "",
};

const assignAccessReducer = (state, action) => {
    switch (action.type) {
        case assignAccessActionTypes.TOKEN_INITIAL_STATE: {
            const assignAccessToken = action.payload.token;

            const updatedState = { ...state, token: assignAccessToken };

            return updatedState;
        }

        case assignAccessActionTypes.USER_TYPE_INITIAL_STATE: {
            const assignAccessUserType = action.payload.userType;

            const updatedState = { ...state, userType: assignAccessUserType };

            return updatedState;
        }

        default:
            return state;
    }
};

export default assignAccessReducer;
