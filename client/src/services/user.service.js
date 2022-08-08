import environments from "../environments/environments";

export const signup = async (data) => {
    const response = await fetch(`${environments.API_URL}/users/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (response.status !== 201) throw new Error();

    const responseObj = await response.json();

    return responseObj;
};

export const login = async (data) => {
    const response = await fetch(`${environments.API_URL}/users/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error();

    const responseObj = await response.json();

    return responseObj;
};
