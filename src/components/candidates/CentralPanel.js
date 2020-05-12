import React, {Component} from 'react';
import CandidateList from './CandidateList';
import './candidates.css';
import SideBarMenu from './SideBarMenu';

class CentralPanel extends Component {
	constructor (props) {
		super(props);
//		console.log(this.props);
//		console.log("email ricevuta: " + this.props.email);
//		this.courses = ['MICEACFS01', 'MICEACFS02', 'MICEACFS03', 'MICEACFS04', 'MICEACFS05'] ;
		this.state = {
		selectedCourseCode: ''}
	}
	
	selectCourseCode = (courseCode) => {
//		this.setState({selectedCourseCode : courseCode});
		this.setState({selectedCourseCode : courseCode});
//		this.setState({
//			selectedCourseCode: 'AAA'});
		console.log("CentralPanel.selectCourseCode - courseCode: " + courseCode + " - this.state.selectedCourseCode: " + this.state.selectedCourseCode);
		
	}
	
	
	
	render () {
		return (
				
				<div className="CentralPanel">
				<SideBarMenu selectMenu={this.selectCourseCode}/>
				<CandidateList selectedCourseCode={this.state.selectedCourseCode}/>
    			</div>
		);
	}
}

export default CentralPanel ;
