import React, { Component } from 'react';
import CandidateList from './candidates/CandidateList';
import './candidates/candidates.css';
import SideBarMenu from './candidates/SideBarMenu';

class CandidatesView extends Component {
	render() {
		return (
				<div>
					<SideBarMenu/>
					<CandidateList/>
    			</div>
		);
	}
}
export default CandidatesView;