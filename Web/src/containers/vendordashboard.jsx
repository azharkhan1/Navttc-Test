import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import url from "../core/index";
import "./css/app.css";
import './css/line-awesome.css'
import './css/style.css'
import './css/responsive.css'
import './css/bootstrap.min.css'
import './css/font-awesome.min.css'
import './css/line-awesome-font-awesome.min.css'
import './css/jquery.mCustomScrollbar.min.css'
import './css/flatpickr.min.css'
import "./css/dashboard.css";


// import global state
import { useGlobalState } from "../context/globalContext";
import { Link } from 'react-router-dom';
import Logout from '../components/logout';


let data = [];


export default function UserDashboard() {

    const globalState = useGlobalState();
    var searchText = useRef();
    var [products, setProducts] = useState([]);
    const [change, handleChange] = useState();
    useEffect(() => {
        axios({
            method: 'get',
            url: `${url}/getproducts`
        }).then((res) => {
            data = res.data.products;
            setProducts(data);
        }).catch((err) => {
            console.log('error')
        })
    }, [change]);

    const handleSearch = () => {

        if (!searchText.current.value) handleChange(!change);

        const products = data.filter((post) => {
            return post.productName.includes(searchText.current.value)
        }
        )
        setProducts(products)
        if (!searchText.current.value) handleChange(!change);
    }




    return (
        <div>
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

                        <input onChange={handleSearch} ref={searchText} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />



                        <Logout />
                    </div>
                </nav>
                <main>
                    <div className="main-section">
                        <div className="container">
                            <div className="main-section-data">
                                <div className="row">
                                    <div className="col-lg-9 col-md-8 no-pd">
                                        <div className="main-ws-sec">
                                            <div className="posts-section">
                                                <div className="row">
                                                    {
                                                        products.map((value, index) => {
                                                            return <div key={index} className="card mr-2 mt-2" style={{ width: "15rem" }} >
                                                                <img style={{ height: "170px" }} src={value.productImage} className="card-img-top" alt="..." />
                                                                <div className="card-body">
                                                                    <div className="gradient-img">
                                                                    </div>
                                                                    <h2>{value.productName}</h2>
                                                                    <p className="card-text">
                                                                        {value.productDescription}
                                                                    </p>
                                                                </div>
                                                                <ul className="list-group list-group-flush">
                                                                    <li className="list-group-item">

                                                                        <span className="pricing">STARTING AT <span className="price-of-product">${parseInt(value.productPrice)}</span></span>
                                                                    </li>
                                                                </ul>

                                                            </div>
                                                        })
                                                    }
                                                </div>


                                                {/* Loding Logo */}
                                                <div className="process-comm">
                                                    <div className="spinner">
                                                        <div className="bounce1"></div>
                                                        <div className="bounce2"></div>
                                                        <div className="bounce3"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-3 pd-right-none no-pd">
                                        <div className="right-sidebar">

                                            <hr />
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    )
}