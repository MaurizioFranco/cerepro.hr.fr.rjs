import React, {Component} from 'react';
import CandidateList from './CandidateList';
import './candidates.css';
import SideBarMenu from './SideBarMenu';
//import { useParams } from "react-router-dom";
//import "react-router-dom";
//import { Router, Route, browserHistory, IndexRoute} from 'react-router';

class CentralPanel extends Component {
	
//	getId = () => {
//		let { id } = useParams();
//		return id ;
//	}

//	componentDidMount() {
//        console.log(this.getId ());
//        const { id } = this.props.params;
//        console.log(id);
//        const { match: { params } } = this.props;
//        const Courses = ({match}) => 
//        console.log(this.props.params.id);
//        this.fetchData(id);
//    }
	
	
	constructor (props) {
		super(props);
		console.log("CentralPanel.constructor() - START");
////		let  id  = useParams();
////		console.log(id);
//		console.log("CentralPanel");
		console.log(this.props);
////		console.log("email ricevuta: " + this.props.email);
////		this.courses = ['MICEACFS01', 'MICEACFS02', 'MICEACFS03', 'MICEACFS04', 'MICEACFS05'] ;
//		this.state = {
//		selectedCourseCode: ''}
		console.log("CentralPanel.constructor() - END");
	}
	componentDidMount() {
	    console.log("CentralPanel.componentDidMount() - START");
//		const { match: { params } } = this.props;
		console.log(this.props);
//		console.log(params.id);
		console.log("CentralPanel.componentDidMount() - END");
	}
	
//	selectCourseCode = (courseCode) => {
////		this.setState({selectedCourseCode : courseCode});
//		this.setState({selectedCourseCode : courseCode});
////		this.setState({
////			selectedCourseCode: 'AAA'});
//		console.log("CentralPanel.selectCourseCode - courseCode: " + courseCode + " - this.state.selectedCourseCode: " + this.state.selectedCourseCode);
//		
//	}
	
	
	
	render () {
		return (
				<div className="CentralPanel">
				<SideBarMenu/>
				<CandidateList position_code={this.props.position_code}/>
    			</div>
		);
	}
}

export default CentralPanel ;
