import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link } from "react-router-dom";



import "./css/app.css";
import './css/line-awesome.css'
import './css/style.css'
import './css/responsive.css'
import './css/bootstrap.min.css'
import './css/font-awesome.min.css'
import './css/line-awesome-font-awesome.min.css'
import './css/jquery.mCustomScrollbar.min.css'
import './css/flatpickr.min.css'
import "./css/vendorDashboard.css";

// importing context
import { useGlobalState } from "../context/globalContext";

// importing url 
import url from "../core";


import Logout from "../components/logout";


// import socket
import socket from "../config/socket";

axios.defaults.withCredentials = true;

export default function AddProduct() {

    const globalState = useGlobalState();
    var productDescription = useRef();
    var productName = useRef();
    var productPrice = useRef();
  
    function uploadProduct(e) {
        e.preventDefault();
        let formData = new FormData();
        formData.append("myFile", document.getElementById('myFile').files[0]);
        formData.append("productDescription",productDescription.current.value);
        formData.append("productName",productName.current.value);
        formData.append("productPrice",productPrice.current.value);

        axios({
            method: 'post',
            url: `${url}/uploadProduct`,
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' }
        })
            .then(res => {
                console.log('response is=>', res);
                alert('successfully added');
                productPrice.current.value = ''
                productName.current.value = ''
                productDescription.current.value=''
                document.getElementById('myFile').value = ''
            })
            .catch(err => {
                console.log(err);
            })
    }


    return (
        <div className="wrapper">
           <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <a className="navbar-brand" href="#">{globalState.user.userName}</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <Link to='/'><a className="nav-link" >Home <span className="sr-only">(current)</span></a></Link>
                            </li>
                            {/* <li className="nav-item active">
                                <Link to='/checkorders'><a className="nav-link" >See Orders<span className="sr-only"></span></a></Link>
                            </li> */}
                            <li className="nav-item active">
                                <Link to='/addproduct'><a className="nav-link" >Add Products<span className="sr-only"></span></a></Link>
                            </li>
                            <li className="nav-item active">
                                <Link to='/update-product'><a className="nav-link" >Update Product<span className="sr-only"></span></a></Link>
                            </li>
                        </ul>
                        <Logout />
                    </div>
                </nav>
            <main>
                <div className="main-section">
                    <div className="container">
                        <div className="main-section-data">
                            <div className="row">
                                <div className="col-lg-3 col-md-4 pd-left-none no-pd">
                                    <div className="main-left-sidebar no-margin">
                                        <div className="user-data full-width">
                                            <div className="user-profile">
                                                <div className="username-dt">
                                                    <div className="usr-pic">
                                                    </div>
                                                </div>
                                                <div className="user-specs">
                                                    <h3>{globalState.user.userName}</h3>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-8 no-pd">
                                    <form onSubmit={uploadProduct}>
                                        <div className="form-row">
                                            <div className="form-group col-md-6">
                                                <label htmlFor="inputEmail4">Product Name</label>
                                                <input ref={productName} required type="name" className="form-control" id="inputEmail4" placeholder="Enter product name" />
                                            </div>
                                            <div className="form-group col-md-6">
                                                <label htmlFor="inputPassword4">Product Description</label>
                                                <input ref={productDescription} required type="text" className="form-control" id="inputPassword4" placeholder="Enter Product Description" />
                                            </div>
                                        </div>

                                        {/* <div className="form-row"> */}
                                        <div className="form-group ">
                                            <label htmlFor="inputAddress">Price</label>
                                            <input ref={productPrice} required type="text" className="form-control col-md-6 " id="inputAddress" placeholder="Enter Product Price" />

                                        </div>


                                        {/* </div> */}
                                        <div className="form-group">
                                            <div className="form-group col-md-4">
                                                <label htmlFor="inputState">Choose File</label>
                                                <input required id="myFile" type="file"></input>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-primary">Add Product</button>
                                    </form>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>

    )
}