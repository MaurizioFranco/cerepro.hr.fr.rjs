import React, {Component} from 'react';
import ListedCourseCandidate from './ListedCourseCandidate';
import CandidateFilterForm from './CandidateFilterForm';
import './candidates.css';

import * as Constants from '../../constants' ;
import { withRouter } from "react-router";



const CANDIDATE_API = '/api/v1/candidatecustom/paginated/1000/0/' ;
const FULL_API_URI = Constants.BACKEND_API_PREFIX + CANDIDATE_API ;

class CandidateList extends Component {
	UNSAFE_componentWillReceiveProps(nextProps){
//		console.log("CandidateList.componentWillReceiveProps - START - FULL_API_URI: " + FULL_API_URI);
////		console.log(nextProps);
		const { match: { params } } = nextProps;
		this.fetchCandidates(params.id);
//		console.log("CandidateList.componentWillReceiveProps() - DEBUG - Selected params.id:" + params.id);
//		let APT_TO_CALL = FULL_API_URI + (params.id!==undefined?params.id:'');
//		console.log("CandidateList.componentWillReceiveProps - DEBUG - APT_TO_CALL: " + APT_TO_CALL);
//		fetch(APT_TO_CALL, {"method": "GET"})
//        .then(res => res.json())
//        .then((data) => {
//          this.setState({ candidates: data.content });	 
////          console.log("CandidateList.componentDidMount - DEBUG - data.content.length: " + data.content.length);
//        })
	}
	constructor (props) {
		super(props);
		console.log("CandidateList.constructor() - START");
		this.state = {
				candidates : [],
//				candidates : [
//			{
//				email:"pippolallo@ymail.com",
//				id:15,
//				photoPath:"/aaa/1.png",
//				name:"Pilato",
//				surname:"Ponzio",
//				cvPath:"/aaa/1.pdf"
//			},
//			{
//				email:"pippolallo2@ymail.com",
//				id:13,
//				name:"Pilato",
//				surname:"Ponzio",
//			}
//		],
//		selectedCourseCode: this.props.selectedCourseCode,
		filteredCandidateEmail : "" 
		
		}
	}
	
//	printDebug = () => {
//		console.log(this.props.selectedCourseCode);
//	}
	
	listFiltering = (text) => {
//		console.log(text);
		this.setState({filteredCandidateEmail: text});
	}
	
	fetchCandidates = (positionCode) =>{
		const API_TO_CALL = FULL_API_URI + (positionCode!==undefined?positionCode:'');
		console.log("CandidateList.fetchCandidates - DEBUG - API_TO_CALL: " + API_TO_CALL);
//		let data = [] ;
//		fetch(APT_TO_CALL, {"method": "GET"
////		    withCredentials: true,
////		    headers: myHeaders
//		})
//		.then(function(response) {
//		    console.log(response.status); // Will show you the status
//		    if (!response.ok) {
//		        throw new Error("HTTP status " + response.status);
//		        data = [] ;
//		    } else {
//		    	console.log();
//		    	data = response.json();
//		    }
//		}).then (
//				//this.setState({ candidates: data.content })
//				this.state = { candidates: data.content }
//				)
		
				fetch(API_TO_CALL)
				  .then((response) => {
					  console.log(response.status); // Will show you the status
				    if(!response.ok) throw new Error(response.status);
				    else return response.json();
				  })
				  .then((data) => {
					this.setState({ candidates: data.content });
				    console.log("DATA STORED");
				  })
				  .catch((error) => {
				    console.log('error: ' + error);
//				    this.setState({ requestFailed: true });
				    this.setState({ candidates: [] });
				  });
		
//		.then(// ...
//				
//		fetch(APT_TO_CALL, {"method": "GET"})
//		.then(res => res.json())
//		.then((data) => {
//			
//			this.setState({ candidates: data.content });	 
////          console.log("CandidateList.componentDidMount - DEBUG - data.content.length: " + data.content.length);
//		})
//		.catch(console.log)
//		
	}
	componentDidMount() {			
//		console.log("CandidateList.componentDidMount - START - FULL_API_URI: " + FULL_API_URI);
		const { match: { params } } = this.props;
		this.fetchCandidates(params.id);
//		console.log("CandidateList.componentDidMount() - DEBUG - Selected params.id:" + params.id);
//		let APT_TO_CALL = FULL_API_URI + (params.id!==undefined?params.id:'');
//		console.log("CandidateList.componentDidMount - DEBUG - APT_TO_CALL: " + APT_TO_CALL);
//		fetch(APT_TO_CALL, {"method": "GET"})
//        .then(res => res.json())
//        .then((data) => {
//          this.setState({ candidates: data.content });	 
////          console.log("CandidateList.componentDidMount - DEBUG - data.content.length: " + data.content.length);
//        })
//        .catch(console.log)
      }
	
	
	
	render () {
		return (
				<div className="panel-container">
				<div className="panel">
				<div className="panel-heading">
				Lista candidati
				</div>
				
				<CandidateFilterForm onSearchFormSubmit={this.listFiltering} />				
				<table>
		        <thead>
		        <tr>
		        <th></th>
		        <th></th>
		        <th>Email</th>
		        <th>Nome</th>
		        <th>Cognome</th>
		        <th>CV</th>
		        <th>inserito da</th>
		        <th>&nbsp;</th>
		        <th>&nbsp;</th>
		        </tr>
		        </thead>
		        <tbody>	        
		          { this.state.candidates.filter(item => (item.email.includes(this.state.filteredCandidateEmail))||(item.firstname.includes(this.state.filteredCandidateEmail))||(item.lastname.includes(this.state.filteredCandidateEmail))).map(item => <ListedCourseCandidate key={item.id} email={item.email} id={item.id} imgpath={item.imgpath} firstname={item.firstname} lastname={item.lastname} cvExternalPath={item.cvExternalPath} insertedByFirstname={item.insertedByFirstname}/>) }
		        </tbody>  
		        </table>
		        </div>
		        </div>
		);
	}
}

//export default CandidateList ;
export default withRouter(CandidateList)
