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
        case bookModalFormActionTypes.UPDATE_TITLE_NAME: {
            const updatedTitleValue = action.payload.value;
            const updatedIsTitleValid = action.payload.isValid;
            const updatedTitleErrorMessage = action.payload.errorMessage;

            const updatedValues = {
                ...state.values,
                title: updatedTitleValue,
            };
            const updatedValidities = {
                ...state.validities,
                title: updatedIsTitleValid,
            };
            const updatedErrorMessages = {
                ...state.errorMessages,
                title: updatedTitleErrorMessage,
            };

            const updatedState = {
                values: updatedValues,
                validities: updatedValidities,
                errorMessages: updatedErrorMessages,
            };

            return updatedState;
        }
        case bookModalFormActionTypes.UPDATE_AUTHOR_NAME: {
            const updatedAuthorNameValue = action.payload.value;
            const updatedIsAuthorNameValid = action.payload.isValid;
            const updatedAuthorNameErrorMessage = action.payload.errorMessage;

            const updatedValues = {
                ...state.values,
                author: updatedAuthorNameValue,
            };
            const updatedValidities = {
                ...state.validities,
                author: updatedIsAuthorNameValid,
            };
            const updatedErrorMessages = {
                ...state.validities,
                author: updatedAuthorNameErrorMessage,
            };

            const updatedState = {
                values: updatedValues,
                validities: updatedValidities,
                errorMessages: updatedErrorMessages,
            };

            return updatedState;
        }
        case bookModalFormActionTypes.UPDATE_BOOK_COVER: {
            const updatedBookCoverValue = action.payload.value;
            const updatedIsBookCoverValid = action.payload.isValid;
            const updatedBookCoverErrorMessage = action.payload.errorMessage;

            const updatedValues = {
                ...state.values,
                bookCover: updatedBookCoverValue,
            };
            const updatedValidities = {
                ...state.validities,
                bookCover: updatedIsBookCoverValid,
            };
            const updatedErrorMessages = {
                ...state.errorMessages,
                bookCover: updatedBookCoverErrorMessage,
            };

            const updatedState = {
                values: updatedValues,
                validities: updatedValidities,
                errorMessages: updatedErrorMessages,
            };

            return updatedState;
        }
        case bookModalFormActionTypes.UPDATE_DESCRIPTION: {
            const updatedDescriptionValues = action.payload.value;
            const updatedIsDescriptionValid = action.payload.isValid;
            const updatedDescriptionErrorMessage = action.payload.errorMessage;

            const updatedValues = {
                ...state.values,
                description: updatedDescriptionValues,
            };
            const updatedValidities = {
                ...state.validities,
                description: updatedIsDescriptionValid,
            };
            const updatedErrorMessages = {
                ...state.errorMessages,
                description: updatedDescriptionErrorMessage,
            };

            const updatedState = {
                values: updatedValues,
                validities: updatedValidities,
                errorMessages: updatedErrorMessages,
            };

            return updatedState;
        }
        case bookModalFormActionTypes.UPDATE_PAGES: {
            const updatedPagesValue = action.payload.value;
            const updatedIsPagesValid = action.payload.isValid;
            const updatedPagesErrorMessage = action.payload.errorMessage;

            const updatedValues = {
                ...state.values,
                pages: updatedPagesValue,
            };
            const updatedValidities = {
                ...state.validities,
                pages: updatedIsPagesValid,
            };
            const updatedErrorMessages = {
                ...state.errorMessages,
                pages: updatedPagesErrorMessage,
            };

            const updatedState = {
                values: updatedValues,
                validities: updatedValidities,
                errorMessages: updatedErrorMessages,
            };

            return updatedState;
        }
        case bookModalFormActionTypes.UPDATE_PRICE: {
            const updatedPriceValue = action.payload.value;
            const updatedIsPriceValid = action.payload.isValid;
            const updatedPriceErrorMessage = action.payload.errorMessage;

            const updatedValues = {
                ...state.values,
                price: updatedPriceValue,
            };
            const updatedValidities = {
                ...state.validities,
                price: updatedIsPriceValid,
            };
            const updatedErrorMessages = {
                ...state.errorMessages,
                price: updatedPriceErrorMessage,
            };

            const updatedState = {
                values: updatedValues,
                validities: updatedValidities,
                errorMessages: updatedErrorMessages,
            };

            return updatedState;
        }
        default: {
            return state;
        }
    }
};

export default bookModalFormReducer;
