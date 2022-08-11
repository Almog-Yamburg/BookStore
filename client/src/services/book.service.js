import environments from "../environments/environments";

export const getAllBooks = async () => {
    const response = await fetch(`${environments.API_URL}/books`);

    if (!response.ok) throw new Error();

    const responseObj = await response.json();

    return responseObj;
};

export const getOneBook = async (bookID) => {
    const response = await fetch(`${environments.API_URL}/books/${bookID}`);

    if (!response.ok) throw new Error();

    const responseObj = await response.json();

    return responseObj;
};

export const addNewBook = async (data, authContextValue) => {
    const response = await fetch(`${environments.API_URL}/books/new`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: authContextValue.assignAccessState.token,
        },
        body: JSON.stringify(data),
    });

    if (response.status !== 201) throw new Error();

    const responseObj = response.json();

    return responseObj;
};

export const updateBookData = async (data, authContextValue, bookID) => {
    const response = await fetch(`${environments.API_URL}/books/${bookID}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: authContextValue.assignAccessState.token,
        },
        body: JSON.stringify(data),
    });

    if (response.status !== 202) throw new Error();

    const responseObj = response.json();

    return responseObj;
};

export const deleteOneBook = async (authContextValue, bookID) => {
    const response = await fetch(`${environments.API_URL}/books/${bookID}`, {
        method: "DELETE",
        headers: {
            Authorization: authContextValue.assignAccessState.token,
        },
    });

    if (!response.ok) throw new Error();

    const responseObj = response.json();

    return responseObj;
};
