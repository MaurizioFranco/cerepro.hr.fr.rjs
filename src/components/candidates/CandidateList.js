import React, {Component} from 'react';

import ListedCourseCandidate from './ListedCourseCandidate';
import CandidateFilterForm from './CandidateFilterForm';
import './candidates.css';
import './CandidateList.css';
import * as Constants from '../../constants' ;
import * as Commons from '../../commons.js' ;
import * as ReactBootstrap from 'react-bootstrap';

import { Link } from "react-router-dom";

import { withRouter } from "react-router";
import MessageDialog from './MessageDialog.js';

// import { confirmAlert } from "react-confirm-alert";
// import "react-confirm-alert/src/react-confirm-alert.css";

import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper
  } from "@material-ui/core";

import downloadIcon from "../../images/download_icon.png";
import DeleteButton from "../../commons/DeleteButton.js";

const CANDIDATE_API = '/api/v1/candidatecustom/' ;
const CANDIDATE_GET_LIST_API = CANDIDATE_API + 'paginated/1000/0/' ;
const FULL_API_URI = Constants.BACKEND_API_PREFIX + CANDIDATE_GET_LIST_API ;

class CandidateList extends Component {
	
	UNSAFE_componentWillReceiveProps(nextProps){
		const { match: { params } } = nextProps;
		Commons.debugMessage("UNSAFE_componentWillReceiveProps - params.id: " + params.id);
		this.setState({
			selectedPositionCode:params.id,
			listLabel:params.id!==undefined?params.id:'(tutti)'
		});
		this.fetchCandidates(params.id);
	}
	
	constructor (props) {
		super(props);
		const { match: { params } } = props;
		Commons.debugMessage("UNSAFE_componentWillReceiveProps - params.id: " + params.id);
		Commons.debugMessage("CandidateList.constructor() - START");
		this.fetchCandidates.bind(this);
		this.setCandidates.bind(this);
		
		this.state = {
			listLabel:params.id!==undefined?params.id:'(tutti)',
			candidates : [],
			selectedPositionCode: '',
			messageDialogVisibility: false,
			messageDialogText: '',
	        filteredCandidateEmail : "" 
		}
	}
	
	listFiltering = (text) => {
		this.setState({filteredCandidateEmail: text});
	}
	
	fetchCandidates = (positionCode) =>{
		const API_TO_CALL = FULL_API_URI + (positionCode!==undefined?positionCode:'');
		console.log("CandidateList.fetchCandidates - DEBUG - API_TO_CALL: " + API_TO_CALL);
//		console.log(this.state.selectedPositionCode);
		Commons.executeFetch (API_TO_CALL, 'GET', this.setCandidates);
	}
	
	setCandidates = (candidatesToSet) => {
		Commons.debugMessage("setCandidates - START - candidatesToSet: " + candidatesToSet);
		this.setState({ candidates: candidatesToSet.content });
	}
	
	notifyWithAlertDialog = (messageText, messageDialogType) =>{
		this.fetchCandidates(this.state.selectedPositionCode);
		this.setState({ 
			messageDialogVisibility: true, 
			messageDialogText: messageText,
			messageDialogType: messageDialogType
		});
		
		setTimeout(
			    function() {
			        this.setState({ messageDialogVisibility: false });
			    }
			    .bind(this),
			    3000
			);
	}
	
	componentDidMount() {			
		const { match: { params } } = this.props;
		this.fetchCandidates(params.id);
	}
	
	// confirmDelete = (askConfirmMessage, confirmOk, confirmKo, apiToCall, deleteSuccessCallbackFn, deleteFailedCallbackFn) => {
	// 	confirmAlert({
	// 	  message: askConfirmMessage,
	// 	  buttons: [
	// 		{
	// 		  label: confirmOk,
	// 		  onClick: () => this.deleteItem(apiToCall),
	// 		},
	// 		{
	// 		  label: confirmKo,
	// 		},
	// 	  ],
	// 	});
	//   };
	
	//   deleteItem(apiToCall, deleteSuccessCallbackFn, deleteFailedCallbackFn) {
	// 	Commons.executeDelete(
	// 	  apiToCall,
	// 	  deleteSuccessCallbackFn,
	// 	  deleteFailedCallbackFn
	// 	);
	//   };
	
	  deleteSuccess = (response) => {
		Commons.operationSuccess(response, "Cancellazione dell'utente avvenuta correttamente.");
		this.fetchCandidates(this.state.selectedPositionCode);
	  };
	
	  deleteFailed = (response) => {
		Commons.operationError(response, "La cancellazione del candidato è fallita. Si prega di contattare l'amministratore.");
	  };
	
	render () {
		
		const { classes } = this.props;
		const styles = {
			table: {
			  minWidth: 650,
			},
			evenRow: {
			  backgroundColor: "#fff",
			},
			oddRow: {
			  backgroundColor: "#f2f2f2",
			},
		  };
		return (
			<React.Fragment>

				<div className="panel-container">
				    <div className="panel">
				        <div className="panel-heading">
				           Lista candidati {this.state.listLabel}
				           <CandidateFilterForm onSearchFormSubmit={this.listFiltering} />
				        </div>
				        
		            </div>
		        </div>
				<br/>
				<label>Lista candidati {this.state.listLabel}</label>
				<div className="App">
					{/* <AddUser refreshCandidatesList={this.getCandidates}/> */}
					<TableContainer
					style={{
						paddingLeft: "40px",
						paddingRight: "40px",
						paddingBottom: "140px",
					}}
					>
					<TableContainer component={Paper}>
						<Table
						className={styles.table}
						aria-label="candidate table"
						>
						<TableHead>
							<TableRow style={{ backgroundColor: "#333", color: "#fff" }}>
							<TableCell style={{ color: "#fff" }}>&nbsp;</TableCell>
							<TableCell style={{ color: "#fff" }}></TableCell>
							<TableCell style={{ color: "#fff" }}>e-mail</TableCell>
							<TableCell style={{ color: "#fff" }}>nome</TableCell>
							<TableCell style={{ color: "#fff" }}>cognome</TableCell>
							<TableCell style={{ color: "#fff" }}>cv</TableCell>
							<TableCell style={{ color: "#fff" }}>inserito da</TableCell>
							<TableCell style={{ color: "#333" }}></TableCell>
							<TableCell style={{ color: "#333" }}></TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{
								this.state.candidates.filter(item => (item.email.includes(this.state.filteredCandidateEmail))||(item.firstname.includes(this.state.filteredCandidateEmail))||(item.lastname.includes(this.state.filteredCandidateEmail)))
							.map((candidate, index) => (
							<TableRow
								key={index}
								className={
								index % 2 === 0 ? styles.evenRow : styles.oddRow
								}
							>
								<TableCell style={{'backgroundColor' : candidate.candidateStatusColor}} >{candidate.id}</TableCell>
								<TableCell><img class="candidateImg" src={Constants.FRONTEND_API_PREFIX + "/canimg/" + candidate.imgpath} alt={candidate.imgpath} /></TableCell>
								<TableCell>{candidate.email}</TableCell>
								<TableCell>{candidate.firstname}</TableCell>
								<TableCell>{candidate.lastname}</TableCell>
								<TableCell>
								<a href={`${Constants.FRONTEND_API_PREFIX}/${candidate.cvExternalPath}`} target="_blank" rel="noopener noreferrer">
								<img class="downloadIcon" src={downloadIcon} alt={candidate.cvExternalPath} />
								</a>
								</TableCell>
								<TableCell>{candidate.insertedByFirstname} {candidate.insertedByLastname}</TableCell>
								<TableCell>
								{/* <UpdateUser refreshCandidatesList={this.getCandidates} idItemToUpdate={candidate.id} /> */}
								<Link to={"/editCandidate/" + candidate.id}>
									<ReactBootstrap.Button variant="primary">
										Modifica
									</ReactBootstrap.Button>
								</Link>
								</TableCell>
								<TableCell>
		<DeleteButton onClickFunction={() => Commons.confirmDelete("Sei sicuro di voler cancellare il candidato " + candidate.firstname + " " + candidate.lastname + "?", "Si", "No", Constants.FULL_CANDIDATE_CUSTOM_API_URI + candidate.id, this.deleteSuccess, this.deleteFailed)}/>
								</TableCell>
							</TableRow>
							))}
						</TableBody>
						</Table>
					</TableContainer>
					</TableContainer>
				</div>
			</React.Fragment>
		);
	}
}

//export default CandidateList ;
export default withRouter(CandidateList)
