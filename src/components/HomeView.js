import React, { Component } from 'react';
import QuestionMonth from './graph/QuestionMonth';
import QuestionWeek from './graph/QuestionWeek';
import QuestionYear from './graph/QuestionYear';
import './HomeView.css';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import CandidatesStatisticsView from './candidates/statistics/CandidatesStatisticsView';

class HomeView extends Component {
	render() {
		return (
			<React.Fragment>

				<div id="container" style={{ display: 'flex' }}>
					<div>
						<div className="component">
							<TableContainer component={Paper}>
								<QuestionWeek></QuestionWeek>
							</TableContainer>
						</div>
					</div>

					<div>
						<div className="component">
							<TableContainer component={Paper}>
								<QuestionMonth></QuestionMonth>
							</TableContainer>
						</div>
					</div>

					<div>
						<div className="component">
							<TableContainer component={Paper}>
								<QuestionYear></QuestionYear>
							</TableContainer>
						</div>
					</div>
				</div>
				<br></br>
				<div id="container">
					<div className="component">
						<TableContainer component={Paper}>
							<CandidatesStatisticsView />
						</TableContainer>
					</div>
				</div>

			</React.Fragment>
		);
	}
}
export default HomeView;