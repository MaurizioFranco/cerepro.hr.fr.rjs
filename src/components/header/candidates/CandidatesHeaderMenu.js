import React, { Component } from 'react';
import './CandidatesHeaderMenu.css';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import * as Constants from '../../../constants.js';
import * as Commons from '../../../commons.js';
import HeaderBarMenuNavbarItem from '../../../HeaderBarMenuNavbarItem.js';
import 'bootstrap/dist/js/bootstrap.bundle';

export class CandidatesHeaderMenu extends Component {

	constructor(props) {
		super(props);
		this.state = {
			position_codes: [],
			showDropdown: false
		};
	}

	setPositionCodes = (data) => {
		this.setState({ position_codes: data });
	}

	toggleDropdown = () => {
		this.setState({
			showDropdown: !this.state.showDropdown
		});
	};

	componentDidMount() {
		Commons.executeFetch(Constants.FULL_COURSEPAGE_API_URI, "GET", this.setPositionCodes);
	}

	render() {
		return (
			<li className="nav-item dropdown">
				<button className="nav-link dropdown-toggle buttonDropdown navigationBarItem" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onMouseOver={() => this.setState({ showDropdown: false })}>
					Candidature/Posizioni
				</button>

				<div className="dropdown-menu" aria-labelledby="navbarDropdown">
					<Link className="dropdown-item navigationBarItem" to="/insertNewCandidate" onMouseOver={() => this.setState({ showDropdown: false })}>Inserisci nuovo candidato</Link>

					<Link className="dropdown-item navigationBarItem" to="/coursepage" onMouseOver={() => this.setState({ showDropdown: false })}>Candidature/Posizioni</Link>
					{/* <Link className="dropdown-item navigationBarItem" to="/candidatesStatistics">Statistiche candidature</Link> */}


					<div className="dropdown-divider"></div>
					{/* <Link className="dropdown-item navigationBarItem" to="/candidates">Tutti i candidati</Link>
					{this.state.position_codes.map(item => <HeaderBarMenuNavbarItem key={item.code} code={item.code} />)} */}
					<div className="nav-item dropright">
						<Link className="dropdown-item dropdown-toggle navigationBarItem dropright" to="#" id="navbarDropdown2" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" onMouseOver={() => this.setState({ showDropdown: true })}>
							Tutti i candidati
						</Link>
						<div  className={`dropdown-menu dropright ${this.state.showDropdown ? 'show' : ''}`} aria-labelledby="navbarDropdown2">
							<Link className="dropdown-item navigationBarItem" to="/candidates">Tutti i candidati</Link>
							{this.state.position_codes.map(item => <HeaderBarMenuNavbarItem key={item.code} code={item.code} />)}
						</div>
					</div>
				</div>
			</li>
		);
	}
}

export default CandidatesHeaderMenu;