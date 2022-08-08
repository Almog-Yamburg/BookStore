const signupFormActionTypes = {
    UPDATE_FORM_FIELD: "UPDATE_FORM_FIELD",
};

export const updateAction = (value, isValid, message, field) => {
    const action = {
        type: signupFormActionTypes.UPDATE_FORM_FIELD,
        payload: {
            value,
            isValid,
            message,
            field,
        },
    };

    return action;
};

export default signupFormActionTypes;
