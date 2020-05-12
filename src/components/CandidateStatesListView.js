import React, { Component } from 'react';
import * as Constants from '../constants' ;
//const BACKEND_HOST_SERVICE = "http://centauri.proximainformatica.com" ;
//const APPLICATION_CONTEXT = "/cerepro.hr.backend" ;
//const ENV = "dev" ;
////const BACKEND_API_PREFIX = BACKEND_HOST_SERVICE + APPLICATION_CONTEXT + ENV ;
////for local development....uncomment the above
//const BACKEND_API_PREFIX = "http://localhost:8080/cerepro.hr.backend" ;

const CANDIDATE_STATES_API = '/api/v1/candidateStates/' ;
const FULL_API_URI = Constants.BACKEND_API_PREFIX + CANDIDATE_STATES_API ;
class CandidateStatesListView extends Component {
		
	
	
		componentDidMount() {			
			console.log("CandidateStatesListView.componentDidMount - START");
			
			console.log("CandidateStatesListView.componentDidMount - DEBUG - FULL_API_URI: " + FULL_API_URI);
//	        fetch(Constants.BACKEND_API_PREFIX + '/api/v1/candidateStates/', {
			fetch(FULL_API_URI, {
	        	  "method": "GET"})
	        .then(res => res.json())
	        .then((data) => {
	          this.setState({ candidateStates: data });	 
	          console.log("CandidateStatesListView.componentDidMount - DEBUG - data.length: " + data.length);
	        })
	        .catch(console.log)
	      }
		
		render() {
			return (
				<div>
					<h1>Informazioni su...</h1>
					<p>
						Questa pagina contiene informazioni generiche
						sulla applicazione che stai utilizzando.
					</p>
					<p>
						Il progetto è stato realizzato con React, una libreria
						ideata da Facebook per lo sviluppo di <strong>SPA</strong>,
						ovvero (<em>Single Page Application</em>), dinamiche e
						performanti, che possono essere all'occorrenza diventare
						<strong>multiview</strong> e supportare più viste.
					</p>
					<p>
						Scopri tutte le funzionalità di React leggendo la
						<a href="https://www.html.it/guide/react-la-guida/">guida di HTML.it</a>.
					</p>
				</div>
			);
		}
	}
	
export default CandidateStatesListView;
	
	