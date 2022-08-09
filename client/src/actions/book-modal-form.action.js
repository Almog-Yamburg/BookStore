const bookModalActionTypes = {
    UPDATE_FORM_FIELD: "UPDATE_FORM_FIELD",
};

export const updateAction = (value, isValid, message, field) => {
    const action = {
        type: bookModalActionTypes.UPDATE_FORM_FIELD,
        payload: {
            value,
            isValid,
            message,
            field,
        },
    };
};

export default bookModalActionTypes;
