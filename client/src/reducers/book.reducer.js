import bookActionTypes from "../actions/book-action.js";

export const BOOK_INITIAL_STATE = [];

const bookReducer = (state, action) => {
    switch (action.type) {
        case bookActionTypes.INITIAL_BOOK: {
            const books = action.payload.books;

            const updatedState = books;

            return updatedState;
        }
        case bookActionTypes.CREATE_BOOK: {
            const { bookData } = action.payload;
            const bookState = JSON.parse(JSON.stringify(state));

            bookState.push(bookData);

            return bookState;
        }
        case bookActionTypes.UPDATE_BOOK: {
            const { updatedBookData } = action.payload;

            const bookState = JSON.parse(JSON.stringify(state));

            const foundIndex = bookState.findIndex(
                (bookDoc) => bookDoc._id === updatedBookData._id
            );

            bookState[foundIndex] = updatedBookData;

            return bookState;
        }
        case bookActionTypes.DELETE_BOOK: {
            const bookID = action.payload.bookID;
            const bookState = JSON.parse(JSON.stringify(state));

            const updatedBooks = bookState.filter(
                (bookDoc) => bookDoc._id !== bookID
            );

            return updatedBooks;
        }

        default:
            return state;
    }
};

export default bookReducer;
