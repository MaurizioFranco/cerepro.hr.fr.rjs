import React, {Component} from 'react';
import * as Constants from '../../constants' ;
import './candidates.css';

class CandidateProfileImage extends Component {
	
	render () {
		if (this.props.img!==null) {
			return (
			    <img className="profileImages" src={process.env.PUBLIC_URL+Constants.CANDIDATE_PROFILE_IMAGES_RELATIVE_FOLDER+this.props.img} alt=''/>
		)} else {
	    	return ('')
	    }
	}
}

export default CandidateProfileImage ;
