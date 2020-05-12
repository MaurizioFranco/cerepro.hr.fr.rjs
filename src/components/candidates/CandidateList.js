import React, {Component} from 'react';
import ListedCourseCandidate from './ListedCourseCandidate';
import CandidateFilterForm from './CandidateFilterForm';
import './CentralPanel.css';

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
		
		this.state = {candidates : [
			{
				email:"pippolallo@ymail.com",
				id:15,
				photoPath:"/aaa/1.png",
				name:"Pilato",
				surname:"Ponzio",
				cvPath:"/aaa/1.pdf"
			},
			{
				email:"pippolallo2@ymail.com",
				id:13,
				name:"Pilato",
				surname:"Ponzio",
			}
		],
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
	
	render () {
		return (
				
				<div>
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
		        <th>&nbsp;</th>
		        <th>&nbsp;</th>
		        </tr>
		        </thead>
		        <tbody>	        
		          { this.state.candidates.filter(item => (item.email.includes(this.state.filteredCandidateEmail))||(item.name.includes(this.state.filteredCandidateEmail))||(item.surname.includes(this.state.filteredCandidateEmail))).map(item => <ListedCourseCandidate key={item.id} email={item.email} id={item.id} photoPath={item.photoPath} name={item.name} surname={item.surname} cvPath={item.cvPath} />) }
		        </tbody>  
		        </table>
		        </div>
		);
	}
}

export default CandidateList ;
