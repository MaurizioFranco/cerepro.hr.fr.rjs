import React, { Component } from 'react';

import centauri_academy_header_logo from './images/header_logo.png';
import './HeaderBarMenu.css';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
//import * as Constants from './constants.js';
//import HeaderBarMenuNavbarItem from './HeaderBarMenuNavbarItem.js';
import 'bootstrap/dist/js/bootstrap.bundle';
import logout_icon from './images/logout_icon.png';
//import * as Commons from './commons.js';
import CandidatesHeaderMenu from './components/header/candidates/CandidatesHeaderMenu.js';

// const POSITION_CODES_API = '/api/v1/coursepage/';
// const FULL_API_URI = Constants.BACKEND_API_PREFIX + POSITION_CODES_API;

class HeaderBarMenu extends Component {
	// _isMounted = false;
	constructor(props) {
		super(props);
		//		this.logout.bind(this);
		//		Constants.getAuthorizationHeader();
		//		const {userLoggedEmail} = this.props;
		////		console.log(this.props);
		////		console.log("email ricevuta: " + this.props.email);
		////		this.courses = ['MICEACFS01', 'MICEACFS02', 'MICEACFS03', 'MICEACFS04', 'MICEACFS05'] ;

		//		this.validateSession.bind(this);
		//		this.validateSession();
		this.state = {
			// position_codes: []
			// ,
			userLoggedEmail: ''
		};
	}

	componentDidMount() {
		// this._isMounted = true;
		let userLoggedEmail = sessionStorage.getItem('userLoggedEmail');
		// if (this._isMounted) {
			this.setState({
				userLoggedEmail: userLoggedEmail
			});
			//this.fetchPositionCodes();
		// }

	}

	// componentWillUnmount() {
	// 	this._isMounted = false;
	// }
	//	handleLogout = history => () => {
	//		  store.remove('loggedIn');
	//		  history.push('/login');
	//		};

	//	validateSession = () => {
	//		console.log("validateSession - START");
	//		if (true) {
	//			this.props.history.push('/login');			
	//		}
	//	}

	// fetchPositionCodes = () => {
	// 	//		console.log("CandidateList.fetchPositionCodes - DEBUG - FULL_API_URI: " + FULL_API_URI);
	// 	let token = sessionStorage.getItem('headerToken');
	// 	let headerToken = Commons.getAuthorizationHeaderFromToken(token);
	// 	fetch(FULL_API_URI, {
	// 		method: "GET",
	// 		headers: headerToken
	// 	})
	// 		.then((response) => {
	// 			if (!response.ok) {
	// 				console.warn(response.status); // Will show you the status
	// 				//		    	console.log("No position codes found!!");
	// 			}
	// 			else return response.json();
	// 		})
	// 		.then((data) => {
	// 			//			  console.log(data);
	// 			if (data !== undefined) {
	// 				if (this._isMounted) {
	// 					this.setState({ position_codes: data });
	// 				}
	// 			}
	// 			//				    console.log(data);
	// 		})
	// 	//		  .catch((error) => {
	// 	//		    console.log('error: ' + error);
	// 	////				    this.setState({ requestFailed: true });
	// 	//		    this.setState({ candidates: [] });
	// 	//		  });

	// }

	logout = () => {
		console.log("LOGOUT - START");
		this.props.logout();
	}

	render() {
		//		
		return (
			<React.Fragment>
				<nav className="navbar navbar-expand-lg navbar-light  ">
					<Link to="/">
						<img alt="centauri-academy-logo" src={centauri_academy_header_logo} className="logo" />
						<span className="navbar-brand title">CeRePro.HR</span>
						<button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
							<span className="navbar-toggler-icon"></span>
						</button>
					</Link>
					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav ml-auto ">
							
							
							<CandidatesHeaderMenu />
							
							{/*
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
					      */}
							<li className="nav-item">
								<span className="nav-link navigationBarItem">Benvenuto {this.state.userLoggedEmail}</span>
							</li>
							<li className="nav-item">
								<button className="nav-link buttonDropdown" onClick={this.logout}>
									<img src={logout_icon} className="logoutIcon" alt='logout' />
								</button>
							</li>

						</ul>
					</div>
				</nav>
			</React.Fragment>
		);
	}
}

export default HeaderBarMenu;
