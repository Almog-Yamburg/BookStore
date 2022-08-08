import environments from "../environments/environments";

export const getAllBooks = async () => {
    const response = await fetch(`${environments.API_URL}/books`);

    if (!response) throw new Error();

    const responseObj = await response.json();

    return responseObj;
};

export const getOneBook = async (bookID) => {
    const response = await fetch(`${environments.API_URL}/books/${bookID}`);

    if (!response.ok) throw new Error();

    const responseObj = await response.json();

    return responseObj;
};
