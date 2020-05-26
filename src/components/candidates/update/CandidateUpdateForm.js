import React, {Component} from 'react';
import './CandidateUpdateForm.css';
import * as Constants from '../../../constants' ;
import * as Commons from '../../../commons.js' ;
import CandidateUpdateFormPositionCodeSelect from './CandidateUpdateFormPositionCodeSelect.js' ;
import CandidateProfileCVDownloadImage from '../CandidateProfileCVDownloadImage.js' ;

import CandidateProfileImage from '../CandidateProfileImage.js';
import { Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import {withRouter} from 'react-router-dom'
const COURSE_CODE_API = '/api/v1/coursepage/' ;
const CANDIDATE_API = '/api/v1/candidatecustom/' ;
const FULL_COURSECODE_API_URI = Constants.BACKEND_API_PREFIX + COURSE_CODE_API ;
const FULL_CANDIDATE_API_URI = Constants.BACKEND_API_PREFIX + CANDIDATE_API ;

class CandidateUpdateForm extends Component {
	
	componentDidMount() {			
		Commons.debugMessage("CandidateUpdateForm.componentDidMount - START");
//		this.fetchCourseCodes.bind(this);
//		this.fetchCourseCodes();
		this.fetchUserDetail();
      }
	
	constructor (props) {
		super(props);
		const { match: { params } } = props;
		Commons.debugMessage("constructor - DEBUG - id: " + params.id);
		this.goBack = this.goBack.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
		this.state = {
				currentCandidateId : params.id,
				courseCodes : [],
//				selectedPositionCode: '',
//				positionCode : '',
//				candidate : {
				id: '',
				firstname : '',
				lastname : '',
				email: '',
				courseCode: '',
				oldCV: '',
				oldImg: '',
//				},
				redirect: false
		}
		
		this.loggedUserId = Commons.getUserLoggedId() ;
	}
	
//	redirectToCandidatesList = () => {
//	    this.setState({
//	      redirect: true
//	    })
//	  }
//	
//	 renderRedirect = () => {
//	      if (this.state.redirect) {
//	    	  let target = '/candidates/'+this.state.positionCode ;
//	          return <Redirect to={target} />
//	      }
//	  }
	
	fetchCourseCodes = () =>{
		Commons.executeFetch (FULL_COURSECODE_API_URI, 'GET', this.setCourseCodes);
	}
	
	fetchUserDetail = () =>{
		Commons.debugMessage("CandidateUpdateForm.fetchUserDetail - DEBUG - id: " + this.state.currentCandidateId);
		Commons.executeFetch (FULL_CANDIDATE_API_URI + this.state.currentCandidateId, 'GET', this.setCurrentCandidate);
//		this.initializeSelectedPositionCode();
	}
	
//	setCourseCodes = (responseData) => {
//		this.setState({ courseCodes: responseData });
////		this.initializeSelectedPositionCode();
//		
//	}
	
//	initializeSelectedPositionCode = () => {
//		Commons.debugMessage("CandidateUpdateForm.initializeSelectedPositionCode - START - this.state.candidate.courseCode: " + this.state.candidate.courseCode + " - this.state.courseCodes.length: "  +  this.state.courseCodes.length);
//		if ((this.state.courseCodes !== null) && (this.state.courseCodes.length>0) && (this.state.candidate.courseCode!==null)) {
//			for (let currentPosition of this.state.courseCodes) {
////				Commons.debugMessage("CandidateUpdateForm.initializeSelectedPositionCode - DEBUG - checking currentPosition.code: " + currentPosition.code + " - this.state.candidate.courseCode: " + this.state.candidate.courseCode);
//				if (currentPosition.code===this.state.candidate.courseCode) {
//					this.setState({selectedPositionCode:currentPosition.title});
//					Commons.debugMessage("CandidateUpdateForm.initializeSelectedPositionCode - DEBUG - selectedPositionCode: " + currentPosition.title);
//					break;
//				}
//			}
//		}
//	}
	
	setCurrentCandidate = (responseData) => {
		Commons.debugMessage("CandidateUpdateForm.setCurrentCandidate - START - destructuring");
		let {id, firstname, lastname, email, courseCode, imgpath, cvExternalPath} = responseData ;
		this.setState({ 
			    id: id,
			    firstname: firstname,
			    lastname: lastname,
			    email: email,
			    courseCode: courseCode,
			    oldImg: imgpath,
			    oldCV: cvExternalPath
			});
		
//		this.setState({ positionCode: this.state.candidate.courseCode });
	}
	  
	  handleSubmit(event) {
   	      Commons.debugMessage("CandidateUpdateForm.handleSubmit - START");
   	      Commons.debugMessage(this.state);
	      event.preventDefault();
	    this.sendUpdateRequest();
	  }
	
	sendUpdateRequest = () => {
		const formData = new FormData();

		const fileInput = document.querySelector("#imgpath");
		if (fileInput.files[0]!==undefined) {
			console.log("fileInput: " + fileInput);
			console.log("fileInput.files[0]: " + fileInput.files[0]);
			console.log("fileInput.files[0].name: " + fileInput.files[0].name);
			formData.append("files", fileInput.files[0])
			formData.append("imgpath", fileInput.files[0].name)
		}
		const fileInput2 = document.querySelector("#cvpath");
		if (fileInput2.files[0]!==undefined) {
			console.log("fileInput2: " + fileInput2);
			console.log("fileInput2.files[0]: " + fileInput2.files[0]);
			console.log("fileInput2.files[0].name: " + fileInput2.files[0].name);
			formData.append("files", fileInput2.files[0])
			formData.append("cvExternalPath", fileInput2.files[0].name)
		}
		
// formData.append("file", fileInput.files[0]);
	    formData.append("firstname", this.state.firstname);
	    formData.append("lastname", this.state.lastname);
	    formData.append("email", this.state.email);
	    formData.append("oldImg", this.state.oldImg);
	    formData.append("oldCV", this.state.oldCV);
	    formData.append("userId", this.loggedUserId);
	    formData.append("insertedBy", this.loggedUserId);
	    formData.append("courseCode", this.state.courseCode);
	    formData.append("candidateStatusCode", 100);
	    
	    Commons.debugMessage(formData);
//	    const options = {
//	      method: "PUT",
//	      body: formData
//	    };
//	    fetch(FULL_CANDIDATE_API_URI, options).then(() => {
//	    	
//	    	this.redirectToCandidatesList();
//	    });
	    
	    Commons.executeFetch (FULL_CANDIDATE_API_URI + this.state.currentCandidateId, 'PUT', this.redirectToCandidatesList, this.callbackKoFunction, formData);
		
	}
	
	callbackKoFunction = () => {
		alert ("INSERIMENTO KO") ;
	}
	
	redirectToCandidatesList = () => {
	    this.setState({
	      redirect: true
	    })
	}
	
	renderRedirect = () => {
	    Commons.debugMessage("CandidateUpdateForm.renderRedirect - START - this.state.redirect: " + this.state.redirect);
	    if (this.state.redirect) {
	    	Commons.debugMessage("CandidateUpdateForm.renderRedirect - START - this.state.courseCode: " + this.state.courseCode);
//	    	  let target = '/candidates/'+this.state.positionCode ;
	    	let target = '/candidates/' + this.state.courseCode;
	        return <Redirect to={target} />
	    }
	}
	
    handleInputChange(event) {
	    const target = event.target;
	    const value = target.value;
	    const name = target.name;

//	    this.setState({
//	      [name]: value,    });
	    this.setState({
		      [name]: value,    });
	}
    
    goBack(event){
    	event.preventDefault();
        this.props.history.goBack();
    }
    
    setCandidateNewPositionCode = (code) => {
    	Commons.debugMessage("code: " + code);
//    	this.setState({candidate: { courseCode: code}});
//    	this.state.courseCode = code ;
    	this.setState({courseCode: code});
//    	this.setState({positionCode: this.state.candidate.courseCode });
    }
	
	render () {
		return (
			<div className="panel-container">
			    {this.renderRedirect()}
			    <div className="panel">
			        <div className="panel-heading">
			           Modifica candidato
			        </div>
			        <div className="panel-body">
			            <form onSubmit={this.handleSubmit}>
				            <div className="row">
				                <div className="col-25">
                                    <label>Nome</label>
                                </div>
                                <div className="col-75">
                                    <input type="text" className="candidate-input-form" name="firstname" placeholder="Nome" onChange={this.handleInputChange} value={this.state.firstname} required/>
                                </div>
				            </div>
				            <div className="row">
				                <div className="col-25">
				                    <label >Cognome</label>
				                </div>
				                <div className="col-75">
				                    <input type="text" className="candidate-input-form" name="lastname" placeholder="Cognome" onChange={this.handleInputChange} value={this.state.lastname} required/>
				                </div>
				            </div>
				            <div className="row">
				                <div className="col-25">
				                    <label>Email</label>
				                </div>
				                <div className="col-75">
				                    <input type="email" className="candidate-input-form" name="email" placeholder="Email" onChange={this.handleInputChange} value={this.state.email} required/>
				                </div>
				            </div>
				            <div className="row">
				                <div className="col-25">
				                    <label>Posizione</label>
				              </div>
				              <div className="col-75">
				              {/*
					              <select name="positionCode" className="candidate-input-form" onChange={this.handleInputChange} required>
					              {this.state.courseCodes.map((e, key) => {
							        	if (this.state.candidate.courseCode===e.code) {
							        		return <option key={key} defaultValue value={e.code}>{e.title}</option>;	
							        	} else {
							        		return <option key={key} value={e.code}>{e.title}</option>;
							        	}
							        })}
						          </select>
						       */}
						          <CandidateUpdateFormPositionCodeSelect defaultValue={this.state.courseCode} setCandidateNewPositionCode={this.setCandidateNewPositionCode}/>
				              </div>
				            </div>
				            <div className="row">
				                <div className="col-25">
				                    <label>Allega CV(.doc,.pdf,.docx,.odt)</label>
				                </div>
				                <div className="col-75">
				                    <CandidateProfileCVDownloadImage cvExternalPath={this.state.oldCV} />
				                    &nbsp;&nbsp;&nbsp;
				                    <input type="file" id="cvpath" accept=".doc,.pdf,.docx,.odt" />
				                </div>
				            </div>
				            <div className="row">
				                <div className="col-25">
				                    <label>Allega immagine profilo(.png,.jpeg,.gif,.jpg)</label>
				                </div>
				                <div className="col-75">
				                    <CandidateProfileImage img={this.state.oldImg}/>
				                    &nbsp;&nbsp;&nbsp;
				                    <input type="file" id="imgpath" accept=".png,.jpeg,.gif,.jpg" />
				                </div>
				            </div>
				            <div className="row insert-form-buttons">
				                <Button type="submit" variant="secondary">MODIFICA</Button>
				                &nbsp;&nbsp;&nbsp;&nbsp;
				                <Button variant="warning" onClick={this.goBack}>Annulla</Button>
				            </div>
			            </form>
		            </div>
	            </div>
	        </div>
		);
	}
}

export default withRouter(CandidateUpdateForm);
