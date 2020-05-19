import React, { Component } from 'react';
import { Route} from "react-router-dom";
import HeaderBarMenu from '../HeaderBarMenu';
import CandidateStatesListView from "./CandidateStatesListView.js";
import CandidatesView from "./CandidatesView.js";
import CandidateInsertView from "./CandidateInsertView.js";
import PositionsView from "./PositionsView.js";
import NewPositionView from "./NewPositionView.js";
import HomeView from "./HomeView.js";

	class MainView extends Component {
		
		constructor (props) {
			super(props);
			this.validateSession();
//			this.logout.bind(this);
		}
		
		validateSession = () => {
			console.log("validateSession - START");
			if (false) {
				this.props.history.push('/login');			
			}
		}
		
		logout = () => {
			console.log("MainView.LOGOUT - START");
			this.props.history.push('/login');
		}
		
		render() {
			return (
					<React.Fragment>
					<HeaderBarMenu userLoggedEmail="mau@bau.it" logout={this.logout}/>
					<Route exact path="/" component={HomeView}/>
					<Route exact path="/candidates" component={CandidatesView}/>
		            <Route path="/candidates/:id" component={CandidatesView}/>
		            <Route exact path="/insertNewCandidate" component={CandidateInsertView}/>
					<Route exact path="/candidateStates" component={CandidateStatesListView}/>
					<Route exact path="/newPosition" component={NewPositionView}/>
				    <Route exact path="/positionsList" component={PositionsView}/>
				    </React.Fragment>
			);
		}
	}
	export default MainView;