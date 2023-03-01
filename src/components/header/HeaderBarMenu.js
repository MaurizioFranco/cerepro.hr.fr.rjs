import React, { Component } from 'react';

import centauri_academy_header_logo from '../../images/header_logo.png';
import './HeaderBarMenu.css';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import logout_icon from '../../images/logout_icon.png';
import CandidatesHeaderMenu from '../../components/header/candidates/CandidatesHeaderMenu.js';
import AdministrationHeaderMenu from '../../components/header/administration/AdministrationHeaderMenu.js';
import SurveysHeaderMenu from '../../components/header/surveys/SurveysHeaderMenu.js';
import QuestionsHeaderMenu from '../../components/header/questions/QuestionsHeaderMenu.js';

class HeaderBarMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userLoggedEmail: ''
		};
	}

	componentDidMount() {
		let userLoggedEmail = sessionStorage.getItem('userLoggedEmail');
		this.setState({
			userLoggedEmail: userLoggedEmail
		});
	}

	logout = () => {
		console.log("LOGOUT - START");
		this.props.logout();
	}

	render() {
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


						    <AdministrationHeaderMenu />
							<CandidatesHeaderMenu />
							<SurveysHeaderMenu />
							<QuestionsHeaderMenu />

							<li className="nav-item">
								<span className="nav-link navigationBarItem">Welcome {this.state.userLoggedEmail}</span>
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
