import Logout from '../components/logout';
import{
    Link
} from 'react-router-dom';


export default function Header({userName}){
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand" href="#">{userName}</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarText">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                  <Link to='/'><a className="nav-link" >Home <span className="sr-only">(current)</span></a></Link>
                </li>
                <li className="nav-item active">
                  <Link to='/myorders'><a className="nav-link" >See Orders<span className="sr-only"></span></a></Link>
                </li>
            </ul>
           <Logout/>
        </div>
    </nav>
    )
}