import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./sidebar.styles.css";

import {
    initialTokenAction,
    initialUserTypeAction,
} from "../../../actions/assign-access.action.js";

import { AuthContext } from "../../../contexts/Auth.context";
import { logout } from "../../../services/user.service";
import { adminLogout } from "../../../services/admin.service";

const Sidebar = (props) => {
    const authContextValue = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const response = await logout(authContextValue);
            const message = response.message;
            alert(message);

            localStorage.removeItem("USER");
            authContextValue.dispatchAssignAccessState(
                initialTokenAction(null)
            );
            authContextValue.dispatchAssignAccessState(
                initialUserTypeAction("")
            );
            props.hideSidebar();
            navigate("/");
        } catch (error) {
            alert("Something went wrong!");
        }
    };

    const handleAdminLogout = async () => {
        try {
            const response = await adminLogout(authContextValue);
            const message = response.message;
            alert(message);

            localStorage.removeItem("ADMIN");
            authContextValue.dispatchAssignAccessState(
                initialTokenAction(null)
            );
            authContextValue.dispatchAssignAccessState(
                initialUserTypeAction("")
            );

            props.hideSidebar();
            navigate("/");
        } catch (error) {
            alert("Something went wrong!");
        }
    };

    return (
        <div className={`sidebar-backdrop ${props.className}`}>
            <div className="sidebar">
                <button
                    type="button"
                    className="close-btn"
                    onClick={props.hideSidebar}
                >
                    X
                </button>

                <ul className="sidebar-items">
                    <li className="sidebar-item">
                        <Link to="/" onClick={props.hideSidebar}>
                            Home
                        </Link>
                    </li>

                    {!authContextValue.assignAccessState.token && (
                        <li className="sidebar-item">
                            <Link to="/login" onClick={props.hideSidebar}>
                                Login
                            </Link>
                        </li>
                    )}

                    {authContextValue.assignAccessState.token && (
                        <li className="sidebar-item">
                            <button
                                type="button"
                                className="logout-btn"
                                onClick={
                                    authContextValue.assignAccessState
                                        .userType === "USER"
                                        ? handleLogout
                                        : handleAdminLogout
                                }
                            >
                                Logout
                            </button>
                        </li>
                    )}

                    {authContextValue.assignAccessState.userType === "USER" && (
                        <li className="sidebar-item">
                            <Link to="/cart" onClick={props.hideSidebar}>
                                Cart
                            </Link>
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
