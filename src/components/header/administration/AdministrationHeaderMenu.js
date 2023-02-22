import React, { Component } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import * as Constants from '../../../constants.js';
import 'bootstrap/dist/js/bootstrap.bundle';

export class AdministrationHeaderMenu extends Component {
	
	render() {
		return (
			<li className="nav-item dropdown">
				<button className="nav-link dropdown-toggle buttonDropdown navigationBarItem" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					Amministrazione
		</button>

				<div className="dropdown-menu" aria-labelledby="navbarDropdown">
					<Link className="dropdown-item navigationBarItem" to="/users">Utenti</Link>
					<Link className="dropdown-item navigationBarItem" to="/roles">Ruoli</Link>					
				</div>
			</li>
		);
	}
}

export default AdministrationHeaderMenu ;