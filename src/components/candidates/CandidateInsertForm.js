import React, {Component} from 'react';

import './CandidateInsertForm.css';

class CandidateInsertForm extends Component {
	constructor (props) {
		super(props);
//		console.log("this.props: ");
//		console.log(this.props);
////		this.setState({selectedCourseCode: this.props.selectedCourseCode});
////		this.state= {selectedCourseCode: this.props.selectedCourseCode};
////		console.log("email ricevuta: " + this.props.email);
//		console.log("this.props.selectedCourseCode: ");
//		console.log(this.props.selectedCourseCode);
////		this.courses = ['MICEACFS01', 'MICEACFS02', 'MICEACFS03', 'MICEACFS04', 'MICEACFS05'] ;
//		
		this.state = {
//				candidates : [
//		}
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
//		selectedCourseCode: this.props.selectedCourseCode}
				candidateName : '',
				
				canidateSelectedCourse : "MICEACFS02",
				candidateGraduate: false,
			    candidateHighGraduate:false,
			    candidateHighStillGraduating:false
		}
		
		this.canidateCourses = [{courseCode: "MICEACFS01", courseDescription: "corso full stack java developer - MILANO - 01"}, {courseCode: "MICEACFS02", courseDescription:  "corso full stack java developer - MILANO - 02"}];
	}
//	
	
	onChangeInputName = (event) => {
//		console.log(event.target.value);
		this.setState({candidateName:event.target.value});
	} 
	onChangeInputSurname = (event) => {
//		console.log(event.target.value);
		this.setState({candidateSurname:event.target.value});
	} 
	onChangeInputEmail = (event) => {
//		console.log(event.target.value);
		this.setState({candidateEmail:event.target.value});
	} 
	onChangeInputMobile = (event) => {
//		console.log(event.target.value);
		this.setState({candidateMobile:event.target.value});
	}
	
	onChangeInputStudyTitle = (event) => {
//		console.log(event.target.value);
		this.setState({candidateStudyTitle:event.target.value});
	} 
	onChangeInputDomicileCity = (event) => {
//		console.log(event.target.value);
		this.setState({candidateDomicileCity:event.target.value});
	}
	onChangeInputCourseCode = (event) => {
//		console.log(event.target.value);
		this.setState({canidateSelectedCourse:event.target.value});
	}
	onChangeInputCandidateGraduate = (event) => {
//		console.log(event.target.value);
		this.setState({[event.target.name]:event.target.checked});
	}
	onChangeInputCandidateHighGraduate = (event) => {
//		console.log(event.target.value);
		this.setState({[event.target.name]:event.target.checked});
	}
	onChangeInputCandidateStillGraduating = (event) => {
//		console.log(event.target.value);
		this.setState({[event.target.name]:event.target.checked});
	}
	
	insertNewCandidate = (event) => {
//		console.log(event.target.value);
//		this.setState({candidateName:event.target.value});
		console.log(this.state);
		event.preventDefault();
	} 
	
//	printDebug = () => {
//		console.log(this.props.selectedCourseCode);
//	}
	
	render () {
		return (
				
				<div className="CandidateInsertFormPanel">
				    <form onSubmit={this.insertNewCandidate}>
				        <label>Nome:</label>
				        <input type="text" name="name" placeholder="Nome" onChange={this.onChangeInputName} />
				        <input type="text" name="surname" placeholder="Cognome" onChange={this.onChangeInputSurname} />
				        <input type="email" name="email" placeholder="Email" onChange={this.onChangeInputEmail} />
				        <input type="tel" name="mobile" placeholder="Numero di telefono" onChange={this.onChangeInputMobile}  />
				        <input type="text" name="studyTitle" placeholder="titolo di studio" onChange={this.onChangeInputStudyTitle} />
				        <input type="text" name="domicileCity" placeholder="domicilio" onChange={this.onChangeInputDomicileCity} />
				        <label>Candidato a </label>
				        <select name="country" defaultValue={this.state.canidateSelectedCourse} onChange={this.onChangeInputCourseCode}>
				            {this.canidateCourses.map((e, key) => {
				                return <option key={key} value={e.courseCode}>{e.courseDescription}</option>;
				            })}
				        </select>
				        <input type="checkbox" name="candidateGraduate" checked={this.state.candidateGraduate} onChange={this.onChangeInputCandidateGraduate} />Laurea
				        <input type="checkbox" name="candidateHighGraduate" checked={this.state.candidateHighGraduate} onChange={this.onChangeInputCandidateHighGraduate} />Laurea magistrale
				        <input type="checkbox" name="candidateHighStillGraduating" checked={this.state.candidateHighStillGraduating} onChange={this.onChangeInputCandidateStillGraduating} />Laurea/Laurea magistrale in corso
				        <input type="submit" value="INSERISCI" />
				        
				    </form>
		        </div>
		);
	}
}

export default CandidateInsertForm ;
