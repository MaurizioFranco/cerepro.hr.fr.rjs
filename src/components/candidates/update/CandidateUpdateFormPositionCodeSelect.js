import React, {Component} from 'react';
//import './CandidateUpdateForm.css';
import * as Constants from '../../../constants' ;
import * as Commons from '../../../commons.js' ;
import Select from 'react-select';

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
			Commons.executeFetch (Constants.FULL_COURSEPAGE_API_URI, 'GET', this.setPositionCodes);
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
