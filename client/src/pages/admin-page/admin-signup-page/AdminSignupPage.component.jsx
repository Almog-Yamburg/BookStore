import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./admin-signup-page.styles.css";

import { AuthContext } from "../../../contexts/Auth.context";

import Card from "../../../components/card/Card.component";
import Loader from "../../../components/shared/loader/Loader.component";
import AdminSignupForm from "./admin-signup-form/AdminSignupForm.component";
import { LOADER_TIMEOUT } from "../../../constants/constants";

const AdminSignupPage = () => {
    const navigate = useNavigate();

    const authContextValue = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (authContextValue.adminToken) {
            navigate("/admins/dashboard");
        }

        setTimeout(() => {
            setIsLoading(false);
        }, LOADER_TIMEOUT);
    }, []);

    return isLoading ? (
        <Loader />
    ) : (
        <main className="signup-page">
            <Card className="signup-page-card">
                <h1>Hello New Admin!</h1>

                <AdminSignupForm />
            </Card>
        </main>
    );
};

export default AdminSignupPage;
