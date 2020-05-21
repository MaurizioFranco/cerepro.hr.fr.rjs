import React, { Component } from 'react';
import { Route} from "react-router-dom";
import HeaderBarMenu from '../HeaderBarMenu';
import CandidateStatesListView from "./CandidateStatesListView.js";
import CandidatesView from "./CandidatesView.js";
import CandidateInsertView from "./CandidateInsertView.js";
import PositionsView from "./PositionsView.js";
import NewPositionView from "./NewPositionView.js";
import HomeView from "./HomeView.js";
import { ModalLoadingSpinnerComponent} from './loader/ModalLoadingSpinnerComponent';

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
				<div className="container-fluid">
				    <ModalLoadingSpinnerComponent />
				    <HeaderBarMenu logout={this.logout}/>
				    <div className="main pt-5">
						<Route exact path="/" component={HomeView}/>
						<Route exact path="/candidates" component={CandidatesView}/>
			            <Route path="/candidates/:id" component={CandidatesView}/>
			            <Route exact path="/insertNewCandidate" component={CandidateInsertView}/>
						<Route exact path="/candidateStates" component={CandidateStatesListView}/>
						<Route exact path="/newPosition" component={NewPositionView}/>
					    <Route exact path="/positionsList" component={PositionsView}/>
				    </div>
			    </div>
		);
	}
}
export default MainView;