import React, { Component } from 'react';
import { Route} from "react-router-dom";
import HeaderBarMenu from './header/HeaderBarMenu';
import CandidateStatesView from "./candidateStates/CandidateStatesView.js";
import CandidatesView from "./CandidatesView.js";
import CandidateInsertView from "./CandidateInsertView.js";
import PositionsView from "./PositionsView.js";
import NewPositionView from "./NewPositionView.js";
import CandidatesStatisticsView from "./candidates/statistics/CandidatesStatisticsView.js";
import CoursePagesView from './coursePages/CoursePagesView';
import UsersView from "./users/UsersView.js";
import HomeView from "./HomeView.js";
import CandidateUpdateView from "./candidates/update/CandidateUpdateView.js" ;
import { ModalLoadingSpinnerComponent} from './loader/ModalLoadingSpinnerComponent';
import './MainView.css';
import { Container } from 'react-bootstrap';
import QuestionView from './QuestionView';
import RegisterQuestionView from './RegisterQuestionView';

class MainView extends Component {
	constructor (props) {
		super(props);
		this.validateSession();
	}
	
	validateSession = () => {
		let userLoggedEmail = sessionStorage.getItem('userLoggedEmail');
		if ((userLoggedEmail===null)||(userLoggedEmail==='null')) {
			this.props.history.push('/login');
		}
	}
	
	logout = () => {
		console.log("MainView.LOGOUT - START");
		sessionStorage.clear();
		this.props.history.push('/login');
	}
	
	render() {
		return (
				<Container fluid>
				    <ModalLoadingSpinnerComponent />
				    <HeaderBarMenu logout={this.logout}/>
				    <div className="main">
						<Route exact path="/" component={HomeView}/>
						<Route exact path="/candidates" component={CandidatesView}/>
			            <Route path="/candidates/:id" component={CandidatesView}/>
			            <Route path="/editCandidate/:id" component={CandidateUpdateView}/>
			            <Route exact path="/insertNewCandidate" component={CandidateInsertView}/>
						<Route exact path="/candidateStates" component={CandidateStatesView}/>
						<Route exact path="/newPosition" component={NewPositionView}/>
					    <Route exact path="/positionsList" component={PositionsView}/>
						<Route exact path="/candidatesStatistics" component={CandidatesStatisticsView}/>
						<Route exact path="/users" component={UsersView}/>
						<Route exact path="/roles" component={CandidatesStatisticsView}/>
						<Route exact path="/coursepage" component={CoursePagesView}/>
						<Route exact path="/question" component={QuestionView}/>
						<Route exact path="/registerQuestion" component={RegisterQuestionView}/>
						
				    </div>
			    </Container>
		);
	}
}
export default MainView;