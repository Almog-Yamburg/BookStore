import environments from "../environments/environments";

export const adminSignup = async (data) => {
    const response = await fetch(`${environments.API_URL}/admins/signup`, {
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

export const adminLogin = async (data) => {
    const response = await fetch(`${environments.API_URL}/admins/login`, {
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

export const adminLogout = async (authContextValue) => {
    const response = await fetch(`${environments.API_URL}/admins/logout`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${authContextValue.assignAccessState.token}`,
        },
    });

    if (!response.ok) throw new Error();

    const responseObj = response.json();

    return responseObj;
};
