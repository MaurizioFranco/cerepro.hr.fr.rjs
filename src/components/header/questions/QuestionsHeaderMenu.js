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
	constructor(props) {
		super(props);
		this.state = {
			showDropdownHeader: false,
		};
	}

	render() {
		return (
			<li className="nav-item dropdown" onMouseLeave={() => this.setState({ showDropdownHeader: false })}>
				<button className="nav-link dropdown-toggle buttonDropdown navigationBarItem" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onMouseOver={() => this.setState({ showDropdownHeader: true })}>
					Questionari Admin
				</button>

				<div className={`dropdown-menu ${this.state.showDropdownHeader ? 'show' : ''}`} aria-labelledby="navbarDropdown">
					<Link className="dropdown-item navigationBarItem" to="/surveys">Questionari</Link>
					<Link className="dropdown-item navigationBarItem" to="/surveyquestions">Associazione domande/questionari</Link>

				</div>
			</li>
		);
	}
}

export default QuestionsHeaderMenu;