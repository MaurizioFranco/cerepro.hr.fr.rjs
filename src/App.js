import React from 'react';
import './App.css';

import HeaderBarMenu from './HeaderBarMenu';

import { BrowserRouter, Route } from "react-router-dom";
import CandidateStatesListView from "./components/CandidateStatesListView.js";
import CandidatesView from "./components/CandidatesView.js";
import PositionsView from "./components/PositionsView.js";
import HomeView from "./components/HomeView.js";

function App() {
  
  return (
    <div className="App">
        
        
        <BrowserRouter>
		  <div>
		  <HeaderBarMenu userLoggedEmail="mau@bau.it" />
			<Route exact path="/" component={HomeView}/>
			<Route exact path="/candidates" component={CandidatesView}/>
			<Route exact path="/candidateStates" component={CandidateStatesListView}/>
			<Route exact path="/positions" component={PositionsView}/>
		  </div>
		</BrowserRouter>
    </div>
  );
}

export default App;
