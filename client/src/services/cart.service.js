import environments from "../environments/environments";

export const getUserCart = async (authContextValue) => {
    const response = await fetch(`${environments.API_URL}/cart`, {
        headers: {
            Authorization: authContextValue.assignAccessState.token,
        },
    });

    if (!response.ok) throw new Error();

    const responseObj = await response.json();

    return responseObj;
};

export const addToCart = async (data, authContextValue) => {
    const response = await fetch(`${environments.API_URL}/cart/add-to-cart`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: authContextValue.assignAccessState.token,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error();

    const responseObj = await response.json();

    return responseObj;
};

export const updateQuantity = async (data, authContextValue) => {
    const response = await fetch(`${environments.API_URL}/cart/update`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            Authorization: authContextValue.assignAccessState.token,
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error();

    const responseObj = await response.json();

    return responseObj;
};

export const checkout = async (authContextValue) => {
    const response = await fetch(`${environments.API_URL}/cart`, {
        headers: {
            Authorization: authContextValue.assignAccessState.token,
        },
    });

    if (!response.ok) throw new Error();

    const responseObj = await response.json();

    return responseObj;
};

export const removeFromCart = async (data, authContextValue) => {
    const response = await fetch(
        `${environments.API_URL}/cart/remove-from-cart`,
        {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: authContextValue.assignAccessState.token,
            },
            body: JSON.stringify(data),
        }
    );

    if (!response.ok) throw new Error();

    const responseObj = await response.json();

    return responseObj;
};
