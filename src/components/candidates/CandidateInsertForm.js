import React, {Component} from 'react';
import * as Constants from '../../constants' ;

const CANDIDATE_API = '/api/v1/coursepage/' ;
const FULL_API_URI = Constants.BACKEND_API_PREFIX + CANDIDATE_API ;

class CandidateInsertForm extends Component {
	
	componentDidMount() {			
//		const { match: { params } } = this.props;
		this.fetchCourseCodes();
      }
	
	constructor (props) {
		super(props);
		
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
		this.state = {
				courseCodes : [{code: "MICEACFS01", title: "corso full stack java developer - MILANO - 01"}],
				selectedPositionCode: '',
				
				firstname : '',
				lastname : '',
				positionCode : '',
				email: '',
//				candidateGraduate: false,
//			    candidateHighGraduate:false,
//			    candidateHighStillGraduating:false
		}
	}
	
	fetchCourseCodes = () =>{
		const API_TO_CALL = FULL_API_URI ;
		console.log("CandidateInsertForm.fetchCourseCodes - DEBUG - API_TO_CALL: " + API_TO_CALL);
		fetch(API_TO_CALL)
		  .then((response) => {
			  console.log(response.status); // Will show you the status
		    if(!response.ok) {
		    	console.warn('Course codes NOT FOUND!');
			    this.setState({ courseCodes: [] });
//			    this.courseCodes = [] ;
		    } else return response.json();
		  })
		  .then((data) => {
			  console.log(data);
			this.setState({ courseCodes: data });
//			  this.courseCodes = data.content ;
		  });	
		console.log("CandidateInsertForm.fetchCourseCodes - DEBUG - courseCodes.length: " + this.state.courseCodes.length);
	}
		  
	  
	  handleSubmit(event) {
	    console.log(this.state);
	    event.preventDefault();
	  }
	
    handleInputChange(event) {
	    const target = event.target;
	    const value = target.value;
	    const name = target.name;

	    this.setState({
	      [name]: value,    });
	}
//	
	
//	onChangeInputFirstname = (event) => {
////		console.log(event.target.value);
//		this.setState({firstname:event.target.value});
//	} 
//	onChangeInputLastname = (event) => {
////		console.log(event.target.value);
//		this.setState({lastname:event.target.value});
//	} 
//	onChangeInputEmail = (event) => {
////		console.log(event.target.value);
//		this.setState({email:event.target.value});
//	} 
//	onChangeInputPositionCode = (event) => {
////		console.log(event.target.value);
//		this.setState({positionCode:event.target.value});
//	}
//	onChangeInputMobile = (event) => {
////		console.log(event.target.value);
//		this.setState({candidateMobile:event.target.value});
//	}
//	
//	onChangeInputStudyTitle = (event) => {
////		console.log(event.target.value);
//		this.setState({candidateStudyTitle:event.target.value});
//	} 
//	onChangeInputDomicileCity = (event) => {
////		console.log(event.target.value);
//		this.setState({candidateDomicileCity:event.target.value});
//	}
//	onChangeInputCandidateGraduate = (event) => {
////		console.log(event.target.value);
//		this.setState({[event.target.name]:event.target.checked});
//	}
//	onChangeInputCandidateHighGraduate = (event) => {
////		console.log(event.target.value);
//		this.setState({[event.target.name]:event.target.checked});
//	}
//	onChangeInputCandidateStillGraduating = (event) => {
////		console.log(event.target.value);
//		this.setState({[event.target.name]:event.target.checked});
//	}
//	
//	insertNewCandidate = (event) => {
////		console.log(event.target.value);
////		this.setState({firstname:event.target.value});
//		console.log(this.state);
//		event.preventDefault();
//	} 
	
//	printDebug = () => {
//		console.log(this.props.selectedCourseCode);
//	}
	
//	
//	<input type="tel" name="mobile" placeholder="Numero di telefono" onChange={this.onChangeInputMobile}  />
//	<input type="text" name="studyTitle" placeholder="titolo di studio" onChange={this.onChangeInputStudyTitle} />
//	<input type="text" name="domicileCity" placeholder="domicilio" onChange={this.onChangeInputDomicileCity} />
//	<label>Candidato a </label>
//	<input type="checkbox" name="candidateGraduate" checked={this.state.candidateGraduate} onChange={this.onChangeInputCandidateGraduate} />Laurea
//	<input type="checkbox" name="candidateHighGraduate" checked={this.state.candidateHighGraduate} onChange={this.onChangeInputCandidateHighGraduate} />Laurea magistrale
//	<input type="checkbox" name="candidateHighStillGraduating" checked={this.state.candidateHighStillGraduating} onChange={this.onChangeInputCandidateStillGraduating} />Laurea/Laurea magistrale in corso
//	<input type="submit" value="INSERISCI" /> 
//	<label>Nome:</label>
	render () {
		return (
				
				<div className="CandidateInsertFormPanel">
				    <form onSubmit={this.handleSubmit}>
				        <input type="text" name="firstname" placeholder="Nome" onChange={this.handleInputChange} />
				        <input type="text" name="lastname" placeholder="Cognome" onChange={this.handleInputChange} />
				        <input type="email" name="email" placeholder="Email" onChange={this.handleInputChange} />
				        <select name="positionCode" defaultValue={this.state.selectedPositionCode} onChange={this.handleInputChange}>
				        {this.state.courseCodes.map((e, key) => {
				        	return <option key={key} value={e.code}>{e.title}</option>;
				        })}
				        </select>
				        <input type="submit" value="Submit" />
				        
				    </form>
		        </div>
		);
	}
}

export default CandidateInsertForm ;
