import React, {Component} from 'react';

import ListedCourseCandidate from './ListedCourseCandidate';
import CandidateFilterForm from './CandidateFilterForm';
import './candidates.css';
import './CandidateList.css';
import * as Constants from '../../constants' ;
import * as Commons from '../../commons.js' ;
import { Table } from 'react-bootstrap';
import { withRouter } from "react-router";
import MessageDialog from './MessageDialog.js';

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
		console.log(this.state.selectedPositionCode);
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
	
	render () {
		
		
		return (
				<div className="panel-container">
				    <div className="panel">
				        <div className="panel-heading">
				           Lista candidati {this.state.listLabel}
				           <CandidateFilterForm onSearchFormSubmit={this.listFiltering} />
				        </div>
				        <div className="panel-body">
							
							    {/*
								<div className="row">
									<div className="col-sm-6">
										<div className="dataTables_length" id="data-table-default_length">
											<label>Visualizza <select id="mySelect">
												</select> candidati 
											</label>
										</div>
									</div>
									<div className="col-sm-6">
										<div id="data-table-default_filter" className="dataTables_filter">
										<CandidateFilterForm onSearchFormSubmit={this.listFiltering} />
										</div>
									</div>
								</div>
								*/}
										<Table striped bordered hover variant="dark">
												<thead>
													<tr>
														<th>&nbsp;</th>
														<th></th>
														<th>Email</th>
														<th>Nome</th>
														<th>Cognome</th>
														<th>CV</th>
														<th>inserito da</th>
														<th width="100"></th>
														<th width="100"></th>
													</tr>
												</thead>
												<tbody>
												{ this.state.candidates.filter(item => (item.email.includes(this.state.filteredCandidateEmail))||(item.firstname.includes(this.state.filteredCandidateEmail))||(item.lastname.includes(this.state.filteredCandidateEmail))).map(item => <ListedCourseCandidate notifyWithAlertDialog={this.notifyWithAlertDialog} key={item.id} candidate={item}/>) }
												</tbody>
				
										</Table>
						</div>
		            </div>
		            <MessageDialog visibility={this.state.messageDialogVisibility} message={this.state.messageDialogText} type={this.state.messageDialogType}/>
		        </div>
		);
	}
}

//export default CandidateList ;
export default withRouter(CandidateList)
