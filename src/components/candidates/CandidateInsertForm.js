import React, {Component} from 'react';
import * as Constants from '../../constants' ;
import './candidates.css';
const COURSE_CODE_API = '/api/v1/coursepage/' ;
const CANDIDATE_API = '/api/v1/candidatecustom/' ;
const FULL_COURSECODE_API_URI = Constants.BACKEND_API_PREFIX + COURSE_CODE_API ;
const FULL_CANDIDATE_API_URI = Constants.BACKEND_API_PREFIX + CANDIDATE_API ;

class CandidateInsertForm extends Component {
	
	componentDidMount() {			
//		const { match: { params } } = this.props;
		this.fetchCourseCodes.bind(this);
		this.fetchCourseCodes();
		
      }
	
	constructor (props) {
		super(props);
		
		this.handleInputChange = this.handleInputChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		
		this.state = {
				courseCodes : [],
				selectedPositionCode: '',
				
				firstname : '',
				lastname : '',
				positionCode : '',
				email: '',
//				imgpath: ''
//				candidateGraduate: false,
//			    candidateHighGraduate:false,
//			    candidateHighStillGraduating:false
		}
	}
	
	fetchCourseCodes = () =>{
		console.log("CandidateInsertForm.fetchCourseCodes - DEBUG - FULL_COURSECODE_API_URI: " + FULL_COURSECODE_API_URI);
		fetch(FULL_COURSECODE_API_URI)
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
	    this.sendInsertRequest();
	  }
	
	sendInsertRequest = () => {
		const { match: history } = this.props;
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
		
//	    formData.append("file", fileInput.files[0]);
	    formData.append("firstname", this.state.firstname);
	    formData.append("lastname", this.state.lastname);
	    formData.append("email", this.state.email);
	    formData.append("userId", 13);
	    formData.append("insertedBy", 13);
	    formData.append("courseCode", this.state.positionCode);

	    const options = {
	      method: "POST",
	      body: formData
	      // If you add this, upload won't work
	      // headers: {
	      //   'Content-Type': 'multipart/form-data',
	      // }
	    };
	    fetch(FULL_CANDIDATE_API_URI, options).then(() => {
	        history.push('/candidates');
	    });
	    
		
	}
	
    handleInputChange(event) {
	    const target = event.target;
	    const value = target.value;
	    const name = target.name;

	    this.setState({
	      [name]: value,    });
	}
	
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
				<div className="row">
				  <div className="col-md-12 underHeader">
				    <form onSubmit={this.handleSubmit}>
				        <input type="text" name="firstname" placeholder="Nome" onChange={this.handleInputChange} />
				        <input type="text" name="lastname" placeholder="Cognome" onChange={this.handleInputChange} />
				        <input type="email" name="email" placeholder="Email" onChange={this.handleInputChange} />
				        <select name="positionCode" defaultValue={this.state.selectedPositionCode} onChange={this.handleInputChange}>
				        {this.state.courseCodes.map((e, key) => {
				        	return <option key={key} value={e.code}>{e.title}</option>;
				        })}
				        </select>
				        <input type="file" id="imgpath" accept=".png,.jpeg,.gif,.jpg" />
				        <input type="file" id="cvpath" accept=".doc,.pdf,.docx,.odt" />
				        <input type="submit" value="Submit" />				        
				    </form>
		        </div>
		        </div>
		);
	}
}

export default CandidateInsertForm ;
