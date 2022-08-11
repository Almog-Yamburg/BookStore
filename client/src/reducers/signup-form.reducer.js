import signupFormActionTypes from "../actions/signup-form.actions.js";

export const SIGNUP_FORM_INITIAL_STATE = {
    values: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatedPassword: "",
    },
    validities: {
        firstName: true,
        lastName: true,
        email: true,
        password: true,
        repeatedPassword: true,
    },
    errorMessages: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        repeatedPassword: "",
    },
};

const signupFormReducer = (state, action) => {
    switch (action.type) {
        case signupFormActionTypes.UPDATE_FORM_FIELD: {
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
                [field]: action.payload.message,
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

export default signupFormReducer;
