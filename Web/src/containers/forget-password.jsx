import React, { useEffect, useRef, useState } from 'react';
import hamaraImage from "./images/cm-main-img.png";
import "./css/app.css";
import './css/line-awesome.css'
import './css/style.css'
import './css/responsive.css'
import { Link, useHistory } from "react-router-dom";
import url from "../core/index";
import axios from "axios";


axios.defaults.withCredentials = true



function ForgotPassword() {
    var history = useHistory();
    var password = useRef();
    var passwordText = useRef();
    var email = useRef();
    var otp = useRef();
    var [forgot, setForgot] = useState(false);
    var [forgotEmail, setForgotEmail] = useState();

    useEffect(() => {

        password.current.style.display = "none";
        document.getElementById('otp').style.display = 'none';

    }, [])

    function forgot_password(e) {
        e.preventDefault();
        axios({
            method: 'post',
            url: `${url}/auth/forget-password`,
            data: {
                userEmail: email.current.value,
              
            },
        }).then((response) => {
            alert('check your email');
            setForgotEmail(email.current.value);
            email.current.value = '';
            password.current.style.display = 'initial'
            otp.current.style.display = 'initial'
            email.current.style.display = 'none';
            document.getElementById('otp').style.display = 'initial';

            setForgot(true);
        }, (error) => {

            console.log("an error occured");

        })
    }
    function setPassword(e) {
        e.preventDefault();
        console.log('forgot email=>',forgotEmail);
        axios({
            method: 'post',
            url: url + "/auth/forget-password-step-2",
            data: {
                userEmail: forgotEmail,
                otp : otp.current.value,
                newPassword : passwordText.current.value,
            },
        }).then((response) => {
            history.push("/");
            alert('Password changed succesfully');
            setForgot(true);
        }, (error) => {

            alert("wrong otp or error");

        })
    }

    return (
        <div className="wrapper">
            <div className="wrapper">
                <div className="sign-in-page">
                    <div className="signin-popup">
                        <div className="signin-pop">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="cmp-info">
                                        <div className="cm-logo">
                                            <img src="" alt="" />
                                            <p> We Deal in Electronic items
                                                   </p>
                                            <img src={hamaraImage} alt="" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="login-sec">
                                        <ul className="sign-control">
                                            <li data-tab="tab-1" className="current"><Link to="/">Sign in </Link></li>
                                            <li> <Link to="/signup">Signup </Link> </li>
                                        </ul>

                                        <div className="sign_in_sec current" id="tab-1">

                                            <h3>{forgot === false ? "Enter email" : "Enter new password"} </h3>

                                            <div className="signup-tab">
                                                <i className="fa fa-long-arrow-left"></i>

                                                <ul>
                                                    {/* <li data-tab="tab-3" className="current">{loginResponse}</li> */}
                                                    {/* <li data-tab="tab-4"><a href="#" title="">Company</a></li> */}
                                                    {/* <li >   <Link to="/vendorsignin"> Company </Link> </li> */}

                                                </ul>
                                            </div>

                                            <form onSubmit={(e) => forgot === false ? forgot_password(e) : setPassword(e)}>
                                                <div className="row">
                                                    <div className="col-lg-12 no-pdd">
                                                        <div className="sn-field">
                                                            <input autoComplete="on" ref={email} type="email" name="email" placeholder="Enter Email" />
                                                            <i className="la la-user"></i>
                                                        </div>
                                                    </div>
                                                    <div ref={password} className="col-lg-12 no-pdd">
                                                        <div className="sn-field">
                                                            <input ref={passwordText} type="password" name="password" placeholder="Enter New Password" />
                                                            <i className="la la-lock"></i>
                                                        </div>
                                                    </div>

                                                    <div id='otp' className="col-lg-12 no-pdd">
                                                        <div className="sn-field">
                                                            <input ref={otp} type="text" name="password" placeholder="Enter Otp" />
                                                            <i className="la la-lock"></i>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12 no-pdd">
                                                        <button>{forgot === false ? "Proceed" : "Change Password"}</button>
                                                    </div>
                                                </div>
                                            </form>




                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="footy-sec">
                    <div className="container">


                    </div>
                </div>
                {/* {
                    loggedIn ? <Redirect to="/userdashboard" /> : ""
                } */}

            </div>
        </div>
    );

}


export default ForgotPassword;



