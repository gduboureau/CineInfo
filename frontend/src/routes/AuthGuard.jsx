import React from "react";
import { Navigate } from "react-router";
import { accountService } from "../utils/AccountService";

const AuthGuard = ({ children }) => {

    if (!accountService.isLogged()) {
        return (
            <Navigate to="/login" />
        );
    }
    return children;
};

export default AuthGuard;
