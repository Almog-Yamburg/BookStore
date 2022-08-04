import { createContext, useReducer } from "react";

import assignAccessReducer, {
    ASSIGN_ACCESS_INITIAL_STATE,
} from "../reducers/assign-access.reducer.js";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const userToken = localStorage.getItem("USER");
    const adminToken = localStorage.getItem("ADMIN");

    let INITIAL_STATE = ASSIGN_ACCESS_INITIAL_STATE;
    if (userToken) {
        INITIAL_STATE = {
            token: userToken,
            userType: "USER",
        };
    } else if (adminToken) {
        INITIAL_STATE = {
            token: adminToken,
            userType: "ADMIN",
        };
    }

    const [assignAccessState, dispatchAssignAccessState] = useReducer(
        assignAccessReducer,
        INITIAL_STATE
    );

    const value = {
        assignAccessState: assignAccessState,
        dispatchAssignAccessState: dispatchAssignAccessState,
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    );
};

export default AuthContextProvider;
