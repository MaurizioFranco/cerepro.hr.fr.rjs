import React, { Component } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
//import * as Constants from '../../../constants.js';
//import * as Commons from '../../../commons.js';
//import HeaderBarMenuNavbarItem from '../../../HeaderBarMenuNavbarItem.js';
import 'bootstrap/dist/js/bootstrap.bundle';

//const POSITION_CODES_API = '/api/v1/question/';
//const FULL_API_URI = Constants.BACKEND_API_PREFIX + POSITION_CODES_API;

export class QuestionsHeaderMenu extends Component {

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
					Questionari Admin
		</button>

				<div className="dropdown-menu" aria-labelledby="navbarDropdown">
					<Link className="dropdown-item navigationBarItem" to="/surveyquestions">Domande associate ai questionari</Link>
				<Link className="dropdown-item navigationBarItem" to="/surveys">Questionari</Link>
					
				</div>
			</li>
		);
	}
}

export default QuestionsHeaderMenu;