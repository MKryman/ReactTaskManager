import React, {useState} from "react";
import {Eye, EyeSlash} from 'react-bootstrap-icons';
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {

    const navigate = useNavigate();
    const [passwordShown, setPasswordShown] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '', 
        lastName: '',
        email: '',
        password:''
    });

    const onTextChange = e => {
        const copy = {...formData};
        copy[e.target.name] = e.target.value;
        setFormData(copy);
    }

    const onFormSubmit = async e => {
        e.preventDefault();
        await axios.post('/api/account/signup', formData);
        navigate('/login');
    }

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    }

    return (
        <div className="row" style={{minHeight: "80vh", display: 'flex', aligneItems: 'center'}} >
            <div className="col-md-6 offset-md-3 bg-light p-4 rounded shadow">
                <h3>Sign up for a new account</h3>
                <form onSubmit={onFormSubmit}>
                    <input onChange={onTextChange} value={formData.firstName} type="text" name="firstName" placeholder="First Name" className="form-control" />
                    <br />
                    <input onChange={onTextChange} value={formData.lastName} type="text" name="lastName" placeholder="Last Name" className="form-control" />
                    <br />
                    <input onChange={onTextChange} value={formData.email} type="text" name="email" placeholder="Email" className="form-control"/>
                    <br />
                    <div className="input-group mb-3">
                        <input type={passwordShown ? "text" : "password"} className="form-control" value={formData.password} onChange={onTextChange} name="password" placeholder="Password" aria-label="Password" aria-describedby="passwordEye" />
                        <span style={{ marginLeft: 580, marginTop: 2.3, position: 'absolute', fontSize: 'large', zIndex: 200, cursor: 'pointer' }}>
                            {passwordShown ? <EyeSlash className="input-group-addon" onClick={togglePassword}></EyeSlash> : <Eye onClick={togglePassword}></Eye>}
                        </span>
                    </div>
                    <button className="btn btn-primary w-100">Signup</button>
                </form>
            </div>
        </div>
    );
}

export default Signup;