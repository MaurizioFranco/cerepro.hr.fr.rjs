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
			
//			this.state = {
//					userLoggedEmail: ''
//			}
			this.validateSession();
//			console.log(this.state) ;
//			this.logout.bind(this);
		}
		
		validateSession = () => {
//			console.log("validateSession - START");
			let userLoggedEmail = localStorage.getItem('userLoggedEmail');
//			console.log("userLoggedEmail in localStorage: " + userLoggedEmail) ;
			if ((userLoggedEmail===null)||(userLoggedEmail==='null')) {
//				console.log("userLoggedEmail in localStorage è null vado in login!!!! ") ;
				this.props.history.push('/login');
			}
//			else {
//				this.setState({'userLoggedEmail':userLoggedEmail});
////				console.log("userLoggedEmail: " + userLoggedEmail) ;
//			}
		}
		
		logout = () => {
			console.log("MainView.LOGOUT - START");
			localStorage.setItem('userLoggedEmail', null);
			this.props.history.push('/login');
		}
		
		render() {
			return (
					<div className="container-fluid">
						<HeaderBarMenu logout={this.logout}/>
						<Route exact path="/" component={HomeView}/>
						<Route exact path="/candidates" component={CandidatesView}/>
			            <Route path="/candidates/:id" component={CandidatesView}/>
			            <Route exact path="/insertNewCandidate" component={CandidateInsertView}/>
						<Route exact path="/candidateStates" component={CandidateStatesListView}/>
						<Route exact path="/newPosition" component={NewPositionView}/>
					    <Route exact path="/positionsList" component={PositionsView}/>
				    </div>
			);
		}
	}
	export default MainView;