import {
  BrowserRouter as Router,
  HashRouter,
  Route,
  Link,
  Redirect,
  Switch,
} from "react-router-dom";
import React from "react";

// Importing containers
import Signup from "../containers/signup"
import AdminDashboard from "../containers/vendordashboard";
import Signin from "../containers/signin";
import ForgetPassword from "../containers/forget-password";
import AddProduct from "../containers/addProduct";
import UpdateProduct from '../containers/updateProduct.jsx'


//importing components
import Header from '../components/header';


import { useGlobalState } from "../context/globalContext.js";

export default function AppRouter() {

  const globalState = useGlobalState()

  return (




    <HashRouter>
      <Switch>

      {(globalState.loginStatus === false) ?
        <>
          <Route exact={true} path="/">
            <Signin />
          </Route>

          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/forget-password">
            <ForgetPassword />
          </Route>

          <Route path="*">
            <Redirect to="/" />
          </Route>
        </>
        : null}

      {/* private routes */}

   

      {(globalState.roll === "admin" && globalState.loginStatus === true) ?

<>

          <Route exact path="/">
            <AdminDashboard />
          </Route>
       
          <Route exact path="/addproduct">
            <AddProduct />
          </Route>
          <Route exact path="/update-product">
            <UpdateProduct />
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </>
        : null}
        </Switch>
    </HashRouter >

  );
}
