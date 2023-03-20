import React, { Component } from 'react';
import { Link } from "react-router-dom";

export class SurveysHeaderMenu extends Component {

	render() {
		return (
			<li className="nav-item dropdown">
				<button className="nav-link dropdown-toggle buttonDropdown navigationBarItem" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					Questionari
		        </button>

				<div className="dropdown-menu" aria-labelledby="navbarDropdown">
					
					<Link className="dropdown-item navigationBarItem" to="/question">Crea e Invia Sondaggi ai Candidati</Link>
				</div>
			</li>
		);
	}
}

export default SurveysHeaderMenu;