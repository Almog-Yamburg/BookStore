const bookModalActionTypes = {
    UPDATE_TITLE_NAME: "UPDATE_TITLE_NAME",
    UPDATE_AUTHOR_NAME: "UPDATE_AUTHOR_NAME",
    UPDATE_BOOK_COVER: "UPDATE_BOOK_COVER",
    UPDATE_DESCRIPTION: "UPDATE_DESCRIPTION",
    UPDATE_PAGES: "UPDATE_PAGES",
    UPDATE_PRICE: "UPDATE_PRICE",
};

export const updateTitleName = (value, isValid, errorMessage) => {
    const action = {
        type: bookModalActionTypes.UPDATE_TITLE_NAME,
        payload: {
            value: value,
            isValid: isValid,
            errorMessage: errorMessage,
        },
    };

    return action;
};

export const updateAuthorName = (value, isValid, errorMessage) => {
    const action = {
        type: bookModalActionTypes.UPDATE_AUTHOR_NAME,
        payload: {
            value: value,
            isValid: isValid,
            errorMessage: errorMessage,
        },
    };

    return action;
};

export const updateBookCover = (value, isValid, errorMessage) => {
    const action = {
        type: bookModalActionTypes.UPDATE_BOOK_COVER,
        payload: {
            value: value,
            isValid: isValid,
            errorMessage: errorMessage,
        },
    };

    return action;
};

export const updateDescription = (value, isValid, errorMessage) => {
    const action = {
        type: bookModalActionTypes.UPDATE_DESCRIPTION,
        payload: {
            value: value,
            isValid: isValid,
            errorMessage: errorMessage,
        },
    };

    return action;
};

export const updatePages = (value, isValid, errorMessage) => {
    const action = {
        type: bookModalActionTypes.UPDATE_PAGES,
        payload: {
            value: value,
            isValid: isValid,
            errorMessage: errorMessage,
        },
    };

    return action;
};

export const updatePrice = (value, isValid, errorMessage) => {
    const action = {
        type: bookModalActionTypes.UPDATE_PRICE,
        payload: {
            value: value,
            isValid: isValid,
            errorMessage: errorMessage,
        },
    };

    return action;
};

export default bookModalActionTypes;
