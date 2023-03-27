import React, { Component } from 'react';
import { Route } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import HeaderBarMenu from './header/HeaderBarMenu';
import CandidateStatesView from "./candidateStates/CandidateStatesView.js";
import CandidatesView from "./candidates/CandidatesView.js";
import CandidateInsertView from "./CandidateInsertView.js";
import PositionsView from "./PositionsView.js";
import NewPositionView from "./NewPositionView.js";
import CandidatesStatisticsView from "./candidates/statistics/CandidatesStatisticsView.js";
import CoursePagesView from './coursePages/CoursePagesView';
import SurveysView from './surveyList/SurveyView'
import SurveyQuestionsView from './surveyQuestions/SurveyQuestionsView'
import UsersView from "./users/UsersView.js";
import HomeView from "./HomeView.js";
import CandidateUpdateView from "./candidates/update/CandidateUpdateView.js";
import { ModalLoadingSpinnerComponent } from './loader/ModalLoadingSpinnerComponent';
import './MainView.css';
import { Container } from 'react-bootstrap';
import QuestionView from './QuestionView';

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './loader/LoadingSpinnerComponent.css'
import proxima_arrow from '../images/proxima_red_great_arrow.png'
//import * as Commons from "../commons.js";

class MainView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userLoggedRole: null,
			loaderSpinner :false
		}
		this.validateSession();
	}

	validateSession = () => {
		let userLoggedEmail = sessionStorage.getItem('userLoggedEmail');
		let targetPage = window.location.hash.slice(2);
		if ((userLoggedEmail === null) || (userLoggedEmail === 'null')) {
			if(targetPage === ""){
				this.props.history.push(`/login`);
			}else{
				this.props.history.push(`/login?targetPage=${targetPage}`);
			}
		}
	}


	logout = () => {
		console.log("MainView.LOGOUT - START");
		this.setState({ loaderSpinner: true }, () => {
            setTimeout(() => {
				sessionStorage.clear();
				this.props.history.push('/login');
            }, 500);
        });
	}

	render() {

		const { loaderSpinner } = this.state;

		const renderComponentWithRole = (Component, authorizedRole) => {
			const user = JSON.parse(sessionStorage.getItem("user"));
			const userLoggedRole = user.role;
			console.log("Il ruolo dell'utente attualmente loggato è il seguente: " + userLoggedRole + " typeof userLoggedRole " + typeof userLoggedRole);
			console.log("confronto con il seguente role value: " + authorizedRole + " typeof authorizedRole " + typeof authorizedRole);

			if (userLoggedRole===authorizedRole) {
				console.log("Check OK");
				return <Component/>;
			} else {
				console.log("Check KO");
				toast.error("Non hai le autorizzazioni necessarie per accedere a questa risorsa");
				this.props.history.push('/login');
				return null;
				// return false ;
			}
		};

		if (loaderSpinner) {
			return <div className="modalLoaderDialog">
				<div className="loader modalLoader">
					<img src={proxima_arrow} alt="loading..." className="proxima_arrow_spinner" />
				</div>
			</div>
		}

		return (
			<Container fluid>
				<ModalLoadingSpinnerComponent />
				<HeaderBarMenu logout={this.logout} />
				<div className="main">
					<Route exact path="/" component={HomeView} />
					<Route exact path="/candidates" component={CandidatesView} />
					<Route path="/candidates/:id" component={CandidatesView} />
					<Route path="/editCandidate/:id" component={CandidateUpdateView} />
					<Route exact path="/insertNewCandidate" component={CandidateInsertView} />
					<Route exact path="/candidateStates" component={CandidateStatesView} />
					<Route exact path="/newPosition" component={NewPositionView} />
					<Route exact path="/positionsList" component={PositionsView} />
					<Route exact path="/candidatesStatistics" component={CandidatesStatisticsView} />
					{/* <Route exact path="/users" render={() => renderComponentWithRole(UsersView, 0)} /> */}
					<Route exact path="/users" component={UsersView} />
					{/* <Route exact path="/roles" render={() => renderComponentWithRole(CandidatesStatisticsView, 0)} /> */}
					<Route exact path="/coursepage" component={CoursePagesView} />
					{/* <Route exact path="/question" render={() => renderComponentWithRole(QuestionView, 0) || renderComponentWithRole(QuestionView, 10) || renderComponentWithRole(QuestionView, 50)} /> */}
					<Route exact path="/question" component={QuestionView} />
					{/* <Route exact path="/surveys" render={() => renderComponentWithRole(SurveysView, 0) || renderComponentWithRole(SurveysView, 10) || renderComponentWithRole(SurveysView, 50)} /> */}
					<Route exact path="/surveys" component={SurveysView} />
					{/* <Route exact path="/surveyquestions" render={() => renderComponentWithRole(SurveyQuestionsView, 0) || renderComponentWithRole(SurveyQuestionsView, 10) || renderComponentWithRole(SurveyQuestionsView, 50)} /> */}
				    <Route exact path="/surveyquestions" component={SurveyQuestionsView} />
				</div>
				<ToastContainer autoClose={1500} />
			</Container>
		);
	}
}

export default MainView;