import React, { FunctionComponent, useState } from "react";
import loginImage from '../image/login1.jpg';
import {useNavigate} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { axiosInstance } from "../api";

interface LoginProps {
}

const Login: FunctionComponent<LoginProps> = () => {
    const [username, setUsername] = useState('');
    const [pass, setPass] = useState('');
    const navigate = useNavigate();

    function getLogin(data: {username: string, pass: string}): Promise<{err?: string, groupID?: string, name?: string}>{
        return axiosInstance.post('/login', data);
    }

    function handelLogin(e: React.FormEvent) {
        e.preventDefault();
        getLogin({
            username: username,
            pass: pass
        }).then(res => {
            if(res?.err){
                alert(res.err)
            }else if(res?.groupID) {
                localStorage.setItem('groupID', res.groupID);
                localStorage.setItem('username', res?.name || '');
                localStorage.setItem('id', username);
                if(localStorage.getItem('groupID') === 'AD'){
                    navigate('/admin')
                }else if(localStorage.getItem('groupID') === 'GV') {
                    navigate('/teacher');
                }else if(localStorage.getItem('groupID') === 'SV') {
                    console.log('SV');
                    navigate('/student');
                }
            }
        })
    }


    return (
        <section className="vh-100" style={{ backgroundImage: `linear-gradient(135deg, #C2FFD8 10%, #465EFB 100%)` }}>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col col-xl-10">
                        <div className="card shadow-lg" style={{ borderRadius: `1rem`}}>
                            <div className="row g-0">
                                <div className="col-md-6 col-lg-5 d-none d-md-block">
                                    <img src={loginImage}
                                        alt="login form" className="img-fluid" style={{ borderRadius: `1rem 0 0 1rem`}} />
                                </div>
                                <div className="col-md-6 col-lg-7 d-flex align-items-center">
                                    <div className="card-body p-4 p-lg-5 text-black">

                                        <form onSubmit={handelLogin}>
                                            <div className="d-flex align-items-center mb-3 pb-1">
                                                <span className="h1 fw-bold mb-0" style={{ color: `rgb(1, 15, 138)` }} >Login</span>
                                            </div>
                                            <div className="form-outline mb-4">
                                                <label className="form-label">Username</label>
                                                <input type="text" name="username"
                                                    value = {username}
                                                    className="form-control form-control-lg" 
                                                    onChange={(e) => {
                                                        setUsername(e.target.value)
                                                    }} required />
                                            </div>

                                            <div className="form-outline mb-4">
                                                <label className="form-label">Password</label>
                                                <input type="password" id="pass" name="pass"
                                                    value = {pass}
                                                    className="form-control form-control-lg" onChange={(e) => {
                                                        setPass(e.target.value)
                                                    }} required />
                                                {/* <span className="error" style={{ color: `red` }}></span> */}
                                            </div>

                                            <div className="pt-1 mb-4">
                                                <button className="btn btn-lg btn-block text-white" style={{backgroundColor: 'rgb(1, 15, 138)'}} type="submit">Login</button>
                                            </div>
                                        </form>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;