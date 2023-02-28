import React, { Component } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import * as Constants from '../../../constants.js';
import * as Commons from '../../../commons.js';
import HeaderBarMenuNavbarItem from '../../../HeaderBarMenuNavbarItem.js';
import 'bootstrap/dist/js/bootstrap.bundle';

const POSITION_CODES_API = '/api/v1/coursepage/';
const FULL_API_URI = Constants.BACKEND_API_PREFIX + POSITION_CODES_API;

export class CandidatesHeaderMenu extends Component {

	constructor(props) {
		super(props);
		this.state = {
			position_codes: []
		};
	}

	setPositionCodes = (data) => {
		this.setState({ position_codes: data });
	}

	componentDidMount() {
		Commons.executeFetch(FULL_API_URI, "GET", this.setPositionCodes);
	}

	render() {
		return (
			<li className="nav-item dropdown">
				<button className="nav-link dropdown-toggle buttonDropdown navigationBarItem" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					Surveys
		</button>

				<div className="dropdown-menu" aria-labelledby="navbarDropdown">
					<Link className="dropdown-item navigationBarItem" to="/surveys">Tutti i surveys</Link>
					{this.state.position_codes.map(item => <HeaderBarMenuNavbarItem key={item.code} code={item.code} />)}
				</div>
			</li>
		);
	}
}

export default CandidatesHeaderMenu;