import React, { Component } from 'react';
import './CandidatesStatisticsView.css';
import * as Constants from '../../../constants';
import * as Commons from '../../../commons.js';
import BarChart from './BarChart';

const CANDIDATE_API = '/api/v1/candidate/';
const FULL_API_URI = Constants.BACKEND_API_PREFIX + CANDIDATE_API;

class CandidatesStatisticsView extends Component {
	constructor(props) {
		super(props);
		this.state = {
			candidates: [],
			coursecode: [],
			labels: [],
			data: [],
		}
	}

	fetchCandidates = () => {
		console.log("CandidateList.fetchCandidates - DEBUG - API_TO_CALL: " + FULL_API_URI);
		Commons.executeFetch(FULL_API_URI, 'GET', this.setCandidates);
	}

	setCandidates = (candidatesToSet) => {
		Commons.debugMessage("setCandidates - START - candidatesToSet: " + candidatesToSet);
		this.setState({ candidates: candidatesToSet });
		this.setCourseCode()
	}

	setCourseCode = () => {
		const courseCodeCount = {};
		for (const key in this.state.candidates) {
			const courseCode = this.state.candidates[key].courseCode;
			if (courseCode in courseCodeCount) {
				courseCodeCount[courseCode]++;
			} else {
				courseCodeCount[courseCode] = 1;
			}
		}
		const labels = [];
		const data = [];
		for (const courseCode in courseCodeCount) {
			labels.push(courseCode);
			data.push(courseCodeCount[courseCode]);
		}
		this.setState({ labels, data });
	}

	componentDidMount() {
		this.fetchCandidates();
	}

	render() {
		return (
			<div>
				{ <BarChart labels={this.state.labels} data={this.state.data} /> }
			</div>
		);
	}
}
export default CandidatesStatisticsView;