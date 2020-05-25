import React, { Component } from 'react';
import { Route} from "react-router-dom";
import HeaderBarMenu from '../HeaderBarMenu';
import CandidateStatesListView from "./CandidateStatesListView.js";
import CandidatesView from "./CandidatesView.js";
import CandidateInsertView from "./CandidateInsertView.js";
import PositionsView from "./PositionsView.js";
import NewPositionView from "./NewPositionView.js";
import HomeView from "./HomeView.js";
import CandidateUpdateView from "./candidates/update/CandidateUpdateView.js" ;
import { ModalLoadingSpinnerComponent} from './loader/ModalLoadingSpinnerComponent';
import './MainView.css';
import { Container } from 'react-bootstrap';

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
						<Route exact path="/candidateStates" component={CandidateStatesListView}/>
						<Route exact path="/newPosition" component={NewPositionView}/>
					    <Route exact path="/positionsList" component={PositionsView}/>
				    </div>
			    </Container>
		);
	}
}
export default MainView;