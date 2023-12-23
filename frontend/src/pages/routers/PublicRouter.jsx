import React from "react";
import Login from "../connection/Login"
import Signup from "../connection/Signup";
import { Routes, Route } from 'react-router-dom';
import Homepage from "../homepage/Homepage";
import Layout from "../../components/header/Layout";
import Error from "../../utils/Error";



const PublicRouter = () => {
    return (
        <Routes>
            <Route element={<Layout/>}>
                <Route index element={<Homepage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Error />} />
            </Route>
        </Routes>
    )
}

export default PublicRouter