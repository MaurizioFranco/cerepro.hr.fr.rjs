import React, {Component} from 'react';
import ListedCourseCandidate from './ListedCourseCandidate';
import CandidateFilterForm from './CandidateFilterForm';
import './candidates.css';
import * as Constants from '../../constants' ;

import { withRouter } from "react-router";
import MessageDialog from './MessageDialog.js';
const CANDIDATE_API = '/api/v1/candidatecustom/' ;
const CANDIDATE_GET_LIST_API = CANDIDATE_API + 'paginated/1000/0/' ;
const FULL_API_URI = Constants.BACKEND_API_PREFIX + CANDIDATE_GET_LIST_API ;

class CandidateList extends Component {
	
	UNSAFE_componentWillReceiveProps(nextProps){
//		console.log("CandidateList.componentWillReceiveProps - START - FULL_API_URI: " + FULL_API_URI);
////		console.log(nextProps);
		const { match: { params } } = nextProps;
		this.setState({selectedPositionCode:params.id});
		this.fetchCandidates(params.id);
//		console.log("CandidateList.componentWillReceiveProps() - DEBUG - Selected params.id:" + params.id);
//		let APT_TO_CALL = FULL_API_URI + (params.id!==undefined?params.id:'');
//		console.log("CandidateList.componentWillReceiveProps - DEBUG - APT_TO_CALL: " + APT_TO_CALL);
//		fetch(APT_TO_CALL, {"method": "GET"})
//        .then(res => res.json())
//        .then((data) => {
//          this.setState({ candidates: data.content });	 
////          console.log("CandidateList.componentDidMount - DEBUG - data.content.length: " + data.content.length);
//        })
	}
	constructor (props) {
		super(props);
		console.log("CandidateList.constructor() - START");
		this.fetchCandidates.bind(this);
		this.state = {
				candidates : [],
				selectedPositionCode: '',
				messageDialogVisibility: false,
				messageDialogText: '',
//				candidates : [
//			{
//				email:"pippolallo@ymail.com",
//				id:15,
//				photoPath:"/aaa/1.png",
//				name:"Pilato",
//				surname:"Ponzio",
//				cvPath:"/aaa/1.pdf"
//			},
//			{
//				email:"pippolallo2@ymail.com",
//				id:13,
//				name:"Pilato",
//				surname:"Ponzio",
//			}
//		],
//		selectedCourseCode: this.props.selectedCourseCode,
		filteredCandidateEmail : "" 
		
		}
	}
	
//	printDebug = () => {
//		console.log(this.props.selectedCourseCode);
//	}
	
	listFiltering = (text) => {
//		console.log(text);
		this.setState({filteredCandidateEmail: text});
	}
	
	fetchCandidates = (positionCode) =>{
		const API_TO_CALL = FULL_API_URI + (positionCode!==undefined?positionCode:'');
		console.log("CandidateList.fetchCandidates - DEBUG - API_TO_CALL: " + API_TO_CALL);
		console.log(this.state.selectedPositionCode);
//		let data = [] ;
//		fetch(APT_TO_CALL, {"method": "GET"
////		    withCredentials: true,
////		    headers: myHeaders
//		})
//		.then(function(response) {
//		    console.log(response.status); // Will show you the status
//		    if (!response.ok) {
//		        throw new Error("HTTP status " + response.status);
//		        data = [] ;
//		    } else {
//		    	console.log();
//		    	data = response.json();
//		    }
//		}).then (
//				//this.setState({ candidates: data.content })
//				this.state = { candidates: data.content }
//				)
		
				fetch(API_TO_CALL)
				  .then((response) => {
					  console.log(response.status); // Will show you the status
				    if(!response.ok)
				    	console.log("No candidates found!!");
				    	//throw new Error(response.status);
				    else return response.json();
				  })
				  .then((data) => {
					this.setState({ candidates: data.content });
//				    console.log("DATA STORED");
				  })
				  .catch((error) => {
				    console.log('error: ' + error);
//				    this.setState({ requestFailed: true });
				    this.setState({ candidates: [] });
				  });
		
//		.then(// ...
//				
//		fetch(APT_TO_CALL, {"method": "GET"})
//		.then(res => res.json())
//		.then((data) => {
//			
//			this.setState({ candidates: data.content });	 
////          console.log("CandidateList.componentDidMount - DEBUG - data.content.length: " + data.content.length);
//		})
//		.catch(console.log)
//		
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
				           Lista candidati
				        </div>
				
				        
				        					
						
				        
				        
				        <div className="panel-body">
							<div id="data-table-default_wrapper" className="dataTables_wrapper form-inline dt-bootstrap no-footer">
								
							
							
							
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
						
						
						
						
						
						
						
						
						
								<div className="row">
									<div className="table-responsive">
										<table id="data-table-default" className="table table-striped table-bordered dataTable no-footer dtr-inline" role="grid" aria-describedby="data-table-default_info">
												<thead>
													<tr role="row">
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
												{ this.state.candidates.filter(item => (item.email.includes(this.state.filteredCandidateEmail))||(item.firstname.includes(this.state.filteredCandidateEmail))||(item.lastname.includes(this.state.filteredCandidateEmail))).map(item => <ListedCourseCandidate notifyWithAlertDialog={this.notifyWithAlertDialog} key={item.id} email={item.email} id={item.id} imgpath={item.imgpath} firstname={item.firstname} lastname={item.lastname} cvExternalPath={item.cvExternalPath} insertedByFirstname={item.insertedByFirstname}/>) }
												</tbody>
				
										</table>
									</div>
								</div>
							
						
							
							
							
							
							
							
						    </div>
						</div>
				        
		            </div>
		            <MessageDialog visibility={this.state.messageDialogVisibility} message={this.state.messageDialogText} type={this.state.messageDialogType}/>
		        </div>
		);
	}
}

//export default CandidateList ;
export default withRouter(CandidateList)
