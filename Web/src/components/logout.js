import axios from 'axios';
import url from '../core/index';
import { useGlobalState, useGlobalStateUpdate } from '../context/globalContext';






export default function Logout() {
    const globalState = useGlobalState();
    const updateGlobalState = useGlobalStateUpdate();

    function logout() {
        axios({
            method: 'post',
            url: `${url}/logout`

        }).then((response) => {
            alert(response.data);
            updateGlobalState((prevValue) => ({ ...prevValue, loginStatus: false, user: null, roll: null }));

        }, (error) => {
            console.log("error=>", error);
        })
    }

    return (
        <span className="navbar-text" onClick={logout}>
            <a href="#" className="nav-link logout" title="">
                <span><i className="fa fa-sign-out" aria-hidden="true"></i></span>
                            Logout
                        </a>
        </span>
    )
}