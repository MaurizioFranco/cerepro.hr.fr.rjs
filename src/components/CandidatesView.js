import React, { Component } from 'react';
import CandidateList from './candidates/CandidateList';
import './candidates/candidates.css';

class CandidatesView extends Component {
	render() {
		return (
				<div className="row ">
				  <div className="col-md-12"><CandidateList/></div>
				  
				</div>
					
		);
	}
}
export default CandidatesView;