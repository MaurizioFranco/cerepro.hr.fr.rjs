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

import * as Constants from '../../constants.js';
import * as Commons from '../../commons.js';

class HeaderBarMenu extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userFullName: '',
			role: null,
		};
	}

	componentDidMount() {
		console.log("##########################################");
		Commons.executeFetch(Constants.FULL_APPLICATION_VERSION_URI, "GET", this.setApplicationVersion);
		console.log("##########################################");
		
		this.getUserValues();
	}

	setApplicationVersion = (data) => {
		console.log("##########################################"+data);
		console.log(data);
	}

	getUserValues = () => {
		try {
		  let { firstname, lastname, role } = JSON.parse(sessionStorage.getItem("user"));
		  this.setState({
			userFullName: firstname + " " + lastname,
			role: role
		  });
		} catch(error) {
		  console.error(error);
		  this.setState({
			userFullName: ""
		  });
		}
	  }

	logout = () => {
		console.log("LOGOUT - START");
		sessionStorage.clear();
		this.props.logout();
	}

	render() {
		const { userFullName } = this.state;

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


							{this.state.role === 0 && <AdministrationHeaderMenu />}
            				<CandidatesHeaderMenu />
            				{(this.state.role === 0 || this.state.role === 10 || this.state.role === 50) && <SurveysHeaderMenu />}
            				{(this.state.role === 0 || this.state.role === 10 ) && <QuestionsHeaderMenu />}

							<li className="nav-item">
								<span className="nav-link navigationBarItem">{userFullName}</span>
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
