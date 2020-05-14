import React, {Component} from 'react';
import centauri_academy_header_logo from './images/header_logo.png';
import './HeaderBarMenu.css';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

import 'bootstrap/dist/js/bootstrap.bundle';
//import 'bootstrap/dist/js/bootstrap.min.js';

class HeaderBarMenu extends Component {
	
	 
//	constructor (props) {
//		super(props);
//		const {userLoggedEmail} = this.props;
////		console.log(this.props);
////		console.log("email ricevuta: " + this.props.email);
////		this.courses = ['MICEACFS01', 'MICEACFS02', 'MICEACFS03', 'MICEACFS04', 'MICEACFS05'] ;
//	}
	render () {
//		
		return (
				<React.Fragment>
					<nav className="navbar navbar-expand-lg navbar-light bg-light ">
					  <Link to="/">
					  <img alt="centauri-academy-logo" src={centauri_academy_header_logo} className="logo" />
					  <span className="navbar-brand title">CeRePro.HR</span>
					  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
					    <span className="navbar-toggler-icon"></span>
					  </button>
					  </Link>
					  <div className="collapse navbar-collapse" id="navbarSupportedContent">
					    <ul className="navbar-nav mr-auto ">
					      <li className="nav-item">
					        <Link className="nav-link" to="/candidates">Candidati</Link>
					      </li>
					      <li className="nav-item">
					        <Link className="nav-link" to="/candidateStates">Stati candidatura</Link>
					      </li>
					      <li className="nav-item dropdown">
					        <button className="nav-link dropdown-toggle buttonDropdown" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					          Posizioni
					        </button>
					          
					        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
						        <Link className="dropdown-item" to="/positionsList">Lista posizioni</Link>
						        <div className="dropdown-divider"></div>
						        <Link className="dropdown-item" to="/newPosition">Inserisci nuova posizione</Link>
					        </div>
					      </li>
					      <li className="nav-item">
					        <Link className="nav-link disabled" to="/editProfile">Benvenuto: {this.props.userLoggedEmail}</Link>
					      </li>
					      <li className="nav-item">					        
					        <Link className="nav-link disabled" to="/logout">LOGOUT</Link>
					      </li>
					    </ul>	
					  </div>
					</nav>   
				</React.Fragment>
		);
	}
}

export default HeaderBarMenu ;
