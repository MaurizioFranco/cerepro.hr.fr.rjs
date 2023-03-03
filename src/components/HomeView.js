import React, { Component } from 'react';
import QuestionMonth from './graph/QuestionMonth';
import QuestionWeek from './graph/QuestionWeek';
import QuestionYear from './graph/QuestionYear';
import './HomeView.css';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';

class HomeView extends Component {
	render() {
		return (
			<React.Fragment>

				<h1>Pagina iniziale</h1>
				<p>Benvenuto nella pagina iniziale.</p>
				<p>
					Fai clic sul menu per selezionare la
					pagina da visualizzare.
				</p>

				<div id="container">
					<div className="component">
						<TableContainer component={Paper}>
							<QuestionWeek></QuestionWeek>
						</TableContainer>
					</div>
				</div>

				<div id="container">
					<div className="component">
						<TableContainer component={Paper}>
							<QuestionMonth></QuestionMonth>
						</TableContainer>
					</div>
				</div>

				<div id="container">
					<div className="component">
						<TableContainer component={Paper}>
							<QuestionYear></QuestionYear>
						</TableContainer>
					</div>
				</div>




			</React.Fragment>
		);
	}
}
export default HomeView;