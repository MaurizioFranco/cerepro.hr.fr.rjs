import React, { Component } from 'react';
import CandidateInsertForm from './candidates/CandidateInsertForm';
import './candidates/candidates.css';

	class CandidateInsertView extends Component {
		render() {
			return (
				<React.Fragment>
				    <CandidateInsertForm />
				</React.Fragment >
			);
		}
	}
	export default CandidateInsertView;