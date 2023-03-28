import React, { Component } from 'react';
import { Link } from "react-router-dom";

export class SurveysHeaderMenu extends Component {

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
					Questionari
				</button>

				<div className={`dropdown-menu ${this.state.showDropdownHeader ? 'show' : ''}`}>

					<Link className="dropdown-item navigationBarItem" to="/candidateSurveysToDo">Crea e Invia Sondaggi ai Candidati</Link>
					<Link className="dropdown-item navigationBarItem" to="/candidateSurveysDid">Questionari eseguiti(Terminati e Non)</Link>
					<Link className="dropdown-item navigationBarItem" to="/candidateSurveysExpired">Questionari scaduti e non completati</Link>
					<Link className="dropdown-item navigationBarItem" to="/allCandidateSurveys">Tutti</Link>
				</div>
			</li>
		);
	}
}

export default SurveysHeaderMenu;