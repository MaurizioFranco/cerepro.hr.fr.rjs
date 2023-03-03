import React, {Component} from 'react';
import * as Constants from '../../constants' ;
import './CandidateInsertForm.css';
import * as Commons from '../../commons.js' ;
import { Redirect } from 'react-router-dom'
import { Button } from 'react-bootstrap';
import {withRouter} from 'react-router-dom'

class CandidateInsertForm extends Component {
	
	componentDidMount() {			
		
		this.fetchCourseCodes.bind(this);
		this.fetchCourseCodes();
		
      }
	
	constructor (props) {
		super(props);
		this.goBack = this.goBack.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
		this.state = {
				courseCodes : [],
				selectedPositionCode: '',
				
				firstname : '',
				lastname : '',
				positionCode : '',
				email: '',
				
				redirect: false
		}
		
		this.loggedUserId = Commons.getUserLoggedId() ;
	}
	
	redirectToCandidatesList = () => {
	    this.setState({
	      redirect: true
	    })
	  }

	 renderRedirect = () => {
	      if (this.state.redirect) {
	    	  let target = '/candidates/'+this.state.positionCode ;
	          return <Redirect to={target} />
	      }
	  }
	
	fetchCourseCodes = () =>{
//		console.log("CandidateInsertForm.fetchCourseCodes - DEBUG - FULL_COURSECODE_API_URI: " + FULL_COURSECODE_API_URI);
		Commons.executeFetch (Constants.FULL_COURSEPAGE_API_URI, 'GET', this.setCourseCodes);
	}
	
	setCourseCodes = (responseData) => {
		this.setState({ courseCodes: responseData });
	}
	  
	  handleSubmit(event) {
	    console.log(this.state);
	    event.preventDefault();
	    this.sendInsertRequest();
	  }
	
	sendInsertRequest = () => {
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
	    formData.append("userId", this.loggedUserId );
	    formData.append("insertedBy", this.loggedUserId );
	    formData.append("courseCode", this.state.positionCode);

//	    Commons.debugMessage(formData);
	    Commons.executeFetch (Constants.FULL_CANDIDATE_CUSTOM_API_URI, 'POST', this.redirectToCandidatesList, this.callbackKoFunction, formData);
//	    const options = {
//	      method: "POST",
//	      body: formData
//	    };
//	    fetch(FULL_CANDIDATE_CUSTOM_API_URI, options).then(() => {
//	    	
//	    	this.redirectToCandidatesList();
//	    });
	    
		
	}
	
	callbackKoFunction = () => {
		alert ("INSERIMENTO KO") ;
	}
	
    handleInputChange(event) {
	    const target = event.target;
	    const value = target.value;
	    const name = target.name;

	    this.setState({
	      [name]: value,    });
	}
    
    goBack(event){
    	event.preventDefault();
        this.props.history.goBack();
    }
	
//	
// <input type="tel" name="mobile" placeholder="Numero di telefono"
// onChange={this.onChangeInputMobile} />
// <input type="text" name="studyTitle" placeholder="titolo di studio"
// onChange={this.onChangeInputStudyTitle} />
// <input type="text" name="domicileCity" placeholder="domicilio"
// onChange={this.onChangeInputDomicileCity} />
// <label>Candidato a </label>
// <input type="checkbox" name="candidateGraduate"
// checked={this.state.candidateGraduate}
// onChange={this.onChangeInputCandidateGraduate} />Laurea
// <input type="checkbox" name="candidateHighGraduate"
// checked={this.state.candidateHighGraduate}
// onChange={this.onChangeInputCandidateHighGraduate} />Laurea magistrale
// <input type="checkbox" name="candidateHighStillGraduating"
// checked={this.state.candidateHighStillGraduating}
// onChange={this.onChangeInputCandidateStillGraduating} />Laurea/Laurea
// magistrale in corso
// <input type="submit" value="INSERISCI" />
// <label>Nome:</label>
	render () {
		return (
			<div className="panel-container">
			    {this.renderRedirect()}
			    <div className="panel">
			        <div className="panel-heading">
			           Inserisci nuovo candidato
			        </div>
			        <div className="panel-body">
			            <form onSubmit={this.handleSubmit}>
				            <div className="row">
				                <div className="col-25">
                                    <label>Nome</label>
                                </div>
                                <div className="col-75">
                                    <input type="text" className="candidate-input-form" name="firstname" placeholder="Nome" onChange={this.handleInputChange} required/>
                                </div>
				            </div>
				            <div className="row">
				                <div className="col-25">
				                    <label >Cognome</label>
				                </div>
				                <div className="col-75">
				                    <input type="text" className="candidate-input-form" name="lastname" placeholder="Cognome" onChange={this.handleInputChange} required/>
				                </div>
				            </div>
				            <div className="row">
				                <div className="col-25">
				                    <label>Email</label>
				                </div>
				                <div className="col-75">
				                    <input type="email" className="candidate-input-form" name="email" placeholder="Email" onChange={this.handleInputChange} required/>
				                </div>
				            </div>
				            <div className="row">
				                <div className="col-25">
				                    <label>Posizione</label>
				              </div>
				              <div className="col-75">
					              <select name="positionCode" className="candidate-input-form" defaultValue={this.state.selectedPositionCode} onChange={this.handleInputChange} required>
							        {this.state.courseCodes.map((e, key) => {
							        	return <option key={key} value={e.code}>{e.title}</option>;
							        })}
						          </select>
				              </div>
				            </div>
				            <div className="row">
				                <div className="col-25">
				                    <label>Allega CV(.doc,.pdf,.docx,.odt)</label>
				                </div>
				                <div className="col-75">
				                    <input type="file" id="cvpath" accept=".doc,.pdf,.docx,.odt" />
				                </div>
				            </div>
				            <div className="row">
				                <div className="col-25">
				                    <label>Allega immagine profilo(.png,.jpeg,.gif,.jpg)</label>
				                </div>
				                <div className="col-75">
				                    <input type="file" id="imgpath" accept=".png,.jpeg,.gif,.jpg" />
				                </div>
				            </div>
				            <div className="row insert-form-buttons">
				                <Button type="submit" variant="secondary">INSERISCI</Button>
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

export default withRouter(CandidateInsertForm);
