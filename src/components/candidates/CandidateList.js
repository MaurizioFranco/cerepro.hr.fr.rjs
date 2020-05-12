import React, {Component} from 'react';
import ListedCourseCandidate from './ListedCourseCandidate';
import CandidateFilterForm from './CandidateFilterForm';
import './candidates.css';

import * as Constants from '../../constants' ;

const CANDIDATE_API = '/api/v1/candidatecustom/paginated/1000/0/' ;
const FULL_API_URI = Constants.BACKEND_API_PREFIX + CANDIDATE_API ;

class CandidateList extends Component {
	constructor (props) {
		super(props);
		console.log("this.props: ");
		console.log(this.props);
//		this.setState({selectedCourseCode: this.props.selectedCourseCode});
//		this.state= {selectedCourseCode: this.props.selectedCourseCode};
//		console.log("email ricevuta: " + this.props.email);
		console.log("this.props.selectedCourseCode: ");
		console.log(this.props.selectedCourseCode);
//		this.courses = ['MICEACFS01', 'MICEACFS02', 'MICEACFS03', 'MICEACFS04', 'MICEACFS05'] ;
		
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
		selectedCourseCode: this.props.selectedCourseCode,
		filteredCandidateEmail : "" 
		
		}
	}
	
	printDebug = () => {
		console.log(this.props.selectedCourseCode);
	}
	
	listFiltering = (text) => {
		console.log(text);
		this.setState({filteredCandidateEmail: text});
	}
	
	componentDidMount() {			
		console.log("CandidateList.componentDidMount - START - FULL_API_URI: " + FULL_API_URI);
		fetch(FULL_API_URI, {"method": "GET"})
        .then(res => res.json())
        .then((data) => {
          this.setState({ candidates: data.content });	 
          console.log("CandidateList.componentDidMount - DEBUG - data.content.length: " + data.content.length);
        })
        .catch(console.log)
      }
	
	render () {
		return (
				<div className="panel-container">
				<div className="panel">
				<div className="panel-heading">
				Lista candidati
				</div>
				
				<CandidateFilterForm onSearchFormSubmit={this.listFiltering} />				
				<table onMouseOver={this.printDebug}>
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

export default CandidateList ;
