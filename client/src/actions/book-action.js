const bookActionTypes = {
    INITIAL_BOOK: "INITIAL_BOOK",
    CREATE_BOOK: "CREATE_BOOK",
    UPDATE_BOOK: "UPDATE_BOOK",
    DELETE_BOOK: "DELETE_BOOK",
};

export const initialBook = (books) => {
    const action = {
        type: bookActionTypes.INITIAL_BOOK,
        payload: {
            books: books,
        },
    };

    return action;
};

export const createBook = (bookData) => {
    const action = {
        type: bookActionTypes.CREATE_BOOK,
        payload: {
            bookData: bookData,
        },
    };

    return action;
};

export const updateBook = (updatedBookData) => {
    const action = {
        type: bookActionTypes.UPDATE_BOOK,
        payload: {
            updatedBookData: updatedBookData,
        },
    };

    return action;
};

export const deleteBook = (bookID) => {
    const action = {
        type: bookActionTypes.DELETE_BOOK,
        payload: {
            bookID: bookID,
        },
    };

    return action;
};

export default bookActionTypes;
