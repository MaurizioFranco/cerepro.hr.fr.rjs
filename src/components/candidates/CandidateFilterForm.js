import React, {Component} from 'react';
import './candidates.css';

class CandidateFilterForm extends Component {
	constructor (props) {
		super(props);
//		console.log("this.props: ");
//		console.log(this.props);
//		this.setState({selectedCourseCode: this.props.selectedCourseCode});
//		this.state= {selectedCourseCode: this.props.selectedCourseCode};
//		console.log("email ricevuta: " + this.props.email);
//		console.log("this.props.selectedCourseCode: ");
//		console.log(this.props.selectedCourseCode);
//		this.courses = ['MICEACFS01', 'MICEACFS02', 'MICEACFS03', 'MICEACFS04', 'MICEACFS05'] ;
		
		this.state = {
		    filterInputText:''
		}
	}
	
	onChangeFilter = (event) => {
//		console.log(event.target.value);
		this.setState({filterInputText:event.target.value});
		
	} 
//	
	searchFormSubmit = (event) => {
		this.props.onSearchFormSubmit(this.state.filterInputText);
		event.preventDefault();
	}
	
	render () {
		return (
				
				<div>
				<form onSubmit={this.searchFormSubmit}>
				<input type="text" name="filter" value={this.state.filterInputText} onChange={this.onChangeFilter} />
				<input type="submit" value="CERCA PER EMAIL" />
				</form>
		        </div>
		);
	}
}

export default CandidateFilterForm ;
