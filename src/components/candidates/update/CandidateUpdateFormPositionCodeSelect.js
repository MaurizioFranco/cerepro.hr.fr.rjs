import React, {Component} from 'react';
//import './CandidateUpdateForm.css';
import * as Constants from '../../../constants' ;
import * as Commons from '../../../commons.js' ;
import Select from 'react-select';
//import { Redirect } from 'react-router-dom'
//import { Button } from 'react-bootstrap';
//import {withRouter} from 'react-router-dom'
const COURSE_CODE_API = '/api/v1/coursepage/' ;
//const CANDIDATE_API = '/api/v1/candidatecustom/' ;
const FULL_COURSECODE_API_URI = Constants.BACKEND_API_PREFIX + COURSE_CODE_API ;
//const FULL_CANDIDATE_API_URI = Constants.BACKEND_API_PREFIX + CANDIDATE_API ;

export default class CandidateUpdateFormPositionCodeSelect extends Component {

	    constructor(props) {
	        super(props);
	        this.state = {
	        		selectedValue: this.props.defaultValue,
	        		options : [],
	        };
	        this.handleChange = this.handleChange.bind(this);
	        this.fetchCourseCodes();
	    }

//	    componentDidMount() {
////	    	Commons.debugMessage("CandidateUpdateFormPositionCodeSelect.componentDidMount - START");
////	    	this.fetchCourseCodes();
//	    	Commons.debugMessage(this.props);
//	        this.setState({
//	            selectedValue: this.props.defaultValue,
//	        })
//	    }

	    fetchCourseCodes = () =>{
			Commons.executeFetch (FULL_COURSECODE_API_URI, 'GET', this.setPositionCodes);
		}
	    
	    setPositionCodes = (responseData) => {
	    	let newOptions = [] ;
	    	for (let currOpt of responseData) {
	    		newOptions.push({label: currOpt.title, value: currOpt.code});
	    	}
			this.setState({ options: newOptions });
		}
	    
	    handleChange(selectedOption) {
//	    	console.log(`selectedOption`, selectedOption);
	        this.setState({selectedValue: selectedOption.value});
	        this.props.setCandidateNewPositionCode(selectedOption.value);
	    }
//	    handleChange = selectedOption => {
//	        this.setState({ selectedOption });
//	        console.log(`Option selected:`, selectedOption);
//	      };

	    render() {
	        return (
	            <Select
	                value={this.state.options.filter(({value}) => value === ((this.state.selectedValue!=='')?this.state.selectedValue:this.props.defaultValue))}
	                onChange={this.handleChange}
	                options={this.state.options}
	            />
	        )
	    }
	}

//	MySelect.propTypes = {
//	    defaultValue: PropTypes.string.isRequired
//	};
