import React, { useState } from "react";
import { Eye, EyeSlash } from 'react-bootstrap-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../AuthContext";
import axios from "axios";

const Login = () => {

    const [formData, setFormData] = useState({ email: '', password: '' });
    const [isValidLogin, setIsValidLogin] = useState(true);
    const [passwordShown, setPasswordShown] = useState(false);
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const onTextChange = e => {
        const copy = { ...formData };
        copy[e.target.name] = e.target.value;
        setFormData(copy);
    }

    const onFormSubmit = async e => {
        e.preventDefault();
        const { data } = await axios.post('/api/account/login', formData);
        const validLogin = !!data
        setUser(data);
        setIsValidLogin(validLogin);
        navigate('/');
    }

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

    return (
        <div className="row" style={{ minHeight: "80vh", display: "flex", alignItems: "center" }}>
            <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                <h3>Log in to your account</h3>
                {!isValidLogin && <span className="text-danger">Invalid username/password. Please try again.</span>}
                <form onSubmit={onFormSubmit}>
                    <input onChange={onTextChange} value={formData.email} type="text" name="email" placeholder="Email" className="form-control" />
                    <br />
                    <div className="input-group mb-3">
                        <input type={passwordShown ? "text" : "password"} onChange={onTextChange} value={formData.password} className="form-control" name="password" placeholder="Password" aria-label="Password" aria-describedby="passwordEye" />
                        <span style={{ marginLeft: 580, marginTop: 2.3, position: 'absolute', fontSize: 'large', zIndex: 200, cursor: 'pointer' }}>
                            {passwordShown ? <EyeSlash className="input-group-addon" onClick={togglePassword}></EyeSlash> : <Eye onClick={togglePassword}></Eye>}
                        </span>
                    </div>
                    <button className="btn btn-primary w-100" type="submit">Login</button>
                </form>
                <Link to='/signup'>Don't have an account yet? Sign up here!</Link>
            </div>
        </div>
    )
}

export default Login;