import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import HeaderBarMenu from './HeaderBarMenu';

import { BrowserRouter, Route } from "react-router-dom";
import CandidateStatesListView from "./components/CandidateStatesListView.js";
import CandidatesView from "./components/CandidatesView.js";
import CandidateInsertView from "./components/CandidateInsertView.js";
import PositionsView from "./components/PositionsView.js";
import NewPositionView from "./components/NewPositionView.js";
import HomeView from "./components/HomeView.js";

function App() {
  
  return (
    <div className="container-fluid">
        
        
        <BrowserRouter>
		  <div>
		  <HeaderBarMenu userLoggedEmail="mau@bau.it" />
			<Route exact path="/" component={HomeView}/>
		    <Route path="/candidates/:id" component={CandidatesView}/>
            <Route exact path="/candidates" component={CandidatesView}/>
            <Route exact path="/newCandidate" component={CandidateInsertView}/>
			<Route exact path="/candidateStates" component={CandidateStatesListView}/>
			<Route exact path="/newPosition" component={NewPositionView}/>
		    <Route exact path="/positionsList" component={PositionsView}/>
		  </div>
		</BrowserRouter>
    </div>
  );
}

export default App;
