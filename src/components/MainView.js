import React, { Component } from 'react';
import { Route } from "react-router-dom";
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

import * as Commons from "../commons.js";
import * as Constants from "../constants.js";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import './loader/LoadingSpinnerComponent.css'
import proxima_arrow from '../images/proxima_red_great_arrow.png'
import AllCandidateSurveysView from './candidateSurveys/AllCandidateSurveysView';
import CandidateSurveysToDoView from './candidateSurveys/CandidateSurveysToDoView';
import CandidateSurveysDidView from './candidateSurveys/CandidateSurveysDidView';
import CandidateSurveysExpiredView from './candidateSurveys/CandidateSurveysExpiredView';
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
					<Route exact path="/users" component={UsersView} />
					<Route exact path="/coursepage" component={CoursePagesView} />
					<Route exact path="/surveys" component={SurveysView} />
				    <Route exact path="/surveyquestions" component={SurveyQuestionsView} />
					<Route exact path="/allCandidateSurveys" component={AllCandidateSurveysView} />
					<Route exact path="/candidateSurveysToDo" component={CandidateSurveysToDoView} />
					<Route exact path="/candidateSurveysDid" component={CandidateSurveysDidView} />
					<Route exact path="/candidateSurveysExpired" component={CandidateSurveysExpiredView} />
				</div>
				<ToastContainer autoClose={1500} />
			</Container>
		);
	}
}

export default MainView;