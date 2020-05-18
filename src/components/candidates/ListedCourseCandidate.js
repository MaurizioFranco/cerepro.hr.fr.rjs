import React, {Component} from 'react';
import PropTypes from 'prop-types';
import CandidateProfileImage from './CandidateProfileImage.js';
import CandidateProfileCVDownloadImage from './CandidateProfileCVDownloadImage.js';
import * as Constants from '../../constants' ;
import * as Messages from '../../messages.js' ;
import { Button } from 'react-bootstrap';

const CANDIDATE_API = '/api/v1/candidatecustom/' ;
const FULL_API_URI = Constants.BACKEND_API_PREFIX + CANDIDATE_API ;

class ListedCourseCandidate extends Component {
//	constructor (props) {
//		super(props);
////		console.log(this.props);
////		console.log("email ricevuta: " + this.props.email);
//		
//	}
	updateCandidate = (candidateId) => {
		console.log("called update form for candidate with id: " + candidateId);
	};
    deleteCandidate = (candidateId, candidateFirstname, candidateLastname) => {
//    	console.log("called delete for candidate with id: " + candidateId);
    	fetch(FULL_API_URI + candidateId, {
    		  method: 'DELETE',
    		})
//    		.then(res => res.text()) // or res.json()
//    		.then(res => console.log(res))
    		.then((response, data) => {
				  console.log(response.status); // Will show you the status
				  console.log(response);
			    if(!response.ok) {
//			    	console.log("No candidate deleted!!");
//			    	//throw new Error(response.status);
			    	this.props.notifyWithAlertDialog(Messages.CANDIDATE_NOT_DELETED_MESSAGE + candidateFirstname + " " + candidateLastname, Constants.DANGER_ALERT_DIALOG);
			    } else {
//			    	console.log("Candidate " + candidateId + " successfully deleted!!!");
			    	this.props.notifyWithAlertDialog(Messages.CANDIDATE_SUCCESSFULLY_DELETED_MESSAGE + candidateFirstname + " " + candidateLastname, Constants.SUCCESS_ALERT_DIALOG);
			    }
			  })
//			  .then((data) => {
//				this.setState({ candidates: data.content });
////			    console.log("DATA STORED");
//			  })
//			  .catch((error) => {
//			    console.log('error: ' + error);
////			    this.setState({ requestFailed: true });
//			    this.setState({ candidates: [] });
//			  });
	};
	
	
	render () {
		return (
				<React.Fragment>
				<tr className="gradeX odd" role="row">
				<td >{this.props.id}</td>
				<td><CandidateProfileImage img={this.props.imgpath}/></td>
				<td>{this.props.email}</td>
				<td>{this.props.firstname}</td>
				<td>{this.props.lastname}</td>
				<td><CandidateProfileCVDownloadImage cvExternalPath={this.props.cvExternalPath} /></td>
				<td>{this.props.insertedByFirstname}</td>
				<td><Button onClick={() => this.updateCandidate(this.props.id)} variant="primary">Modifica</Button></td>
				<td><Button onClick={() => this.deleteCandidate(this.props.id, this.props.firstname, this.props.lastname)} variant="danger">Elimina</Button></td> 
				</tr>
				</React.Fragment>
		);
	}
}

export default ListedCourseCandidate ;

ListedCourseCandidate.defaultProps = {
		firstname:"",
		lastname:"",
		id:"",
		cvExternalPath:"",
		email:"",
		imgpath:""
}

ListedCourseCandidate.propTypes = {
		name: PropTypes.string,
//		PropTypes.func.isRequired(name),
		surname: PropTypes.string,
}
