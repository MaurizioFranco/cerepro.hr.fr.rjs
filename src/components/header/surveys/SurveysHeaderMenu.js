import React, { Component } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
//import * as Constants from '../../../constants.js';
//import * as Commons from '../../../commons.js';
//import HeaderBarMenuNavbarItem from '../../../HeaderBarMenuNavbarItem.js';
import 'bootstrap/dist/js/bootstrap.bundle';

//const POSITION_CODES_API = '/api/v1/survey/';
//const FULL_API_URI = Constants.BACKEND_API_PREFIX + POSITION_CODES_API;

export class SurveysHeaderMenu extends Component {

	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		position_codes: []
	// 	};
	// }

	// setPositionCodes = (data) => {
	// 	this.setState({ position_codes: data });
	// }

	// componentDidMount() {
	// 	Commons.executeFetch(FULL_API_URI, "GET", this.setPositionCodes);
	// }

	render() {
		return (
			<li className="nav-item dropdown">
				<button className="nav-link dropdown-toggle buttonDropdown navigationBarItem" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					Questionari
		</button>

				<div className="dropdown-menu" aria-labelledby="navbarDropdown">
					<Link className="dropdown-item navigationBarItem" to="/surveys">Tutti i surveys</Link>
					<Link className="dropdown-item navigationBarItem" to="/question">Crea e Invia Sondaggi ai Candidati</Link>
				</div>
			</li>
		);
	}
}

export default SurveysHeaderMenu;