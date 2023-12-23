import Login from "../connexion/Login"
import Register from "../connexion/Register"
import { Routes, Route } from 'react-router-dom';


const PublicRouter = () => {
    return (
        <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default PublicRouter