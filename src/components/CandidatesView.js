import React, { Component } from 'react';
import CandidateList from './candidates/CandidateList';
import './candidates/candidates.css';
import SideBarMenu2 from './candidates/SideBarMenu2';

class CandidatesView extends Component {
	render() {
		return (
				<div className="row ">
				  <div className="col-md-1 sidebarMenu underHeader"><SideBarMenu2/></div>
				  <div className="col-md-11 underHeader"><CandidateList/></div>
				  
				</div>
					
		);
	}
}
export default CandidatesView;