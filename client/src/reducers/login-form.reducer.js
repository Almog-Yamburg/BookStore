import loginFormActionTypes from "../actions/login-form.actions.js";

export const LOGIN_FORM_INITIAL_STATE = {
    values: {
        email: "",
        password: "",
    },
    validities: {
        email: true,
        password: true,
    },
    errorMessages: {
        email: "",
        password: "",
    },
};

const loginReducer = (state, action) => {
    switch (action.type) {
        case loginFormActionTypes.UPDATE_FORM_FIELD: {
            const { field } = action.payload;

            const updatedValues = {
                ...state.values,
                [field]: action.payload.value,
            };
            const updatedValidities = {
                ...state.validities,
                [field]: action.payload.isValid,
            };
            const updatedErrorMessages = {
                ...state.errorMessages,
                [field]: action.payload.errorMessage,
            };

            const updatedState = {
                values: updatedValues,
                validities: updatedValidities,
                errorMessages: updatedErrorMessages,
            };

            return updatedState;
        }
        default:
            return state;
    }
};

export default loginReducer;
