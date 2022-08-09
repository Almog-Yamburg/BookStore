import bookModalFormActionTypes from "../actions/book-modal-form.action.js";

export const BOOK_MODAL_FORM_INITIAL_STATE = {
    values: {
        title: "",
        author: "",
        bookCover: "",
        description: "",
        pages: "",
        price: "",
    },
    validities: {
        title: true,
        author: true,
        bookCover: true,
        description: true,
        pages: true,
        price: true,
    },
    errorMessages: {
        title: "",
        author: "",
        bookCover: "",
        description: "",
        pages: "",
        price: "",
    },
};

const bookModalFormReducer = (state, action) => {
    switch (action.type) {
        case bookModalFormActionTypes.UPDATE_FORM_FIELD: {
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

export default bookModalFormReducer;
