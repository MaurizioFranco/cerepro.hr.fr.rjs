import React, {Component} from 'react';
import * as Constants from '../../constants' ;
import './candidates.css';
import 'bootstrap/dist/css/bootstrap.css';
import download_icon from '../../images/download_icon.png';

class CandidateProfileCVDownloadImage extends Component {
	
	render () {
		if (this.props.cvExternalPath!==null) {			
			return (
				    <a style={{width: 70, height: 70}} href={process.env.PUBLIC_URL+Constants.CANDIDATE_PROFILE_CV_RELATIVE_FOLDER+this.props.cvExternalPath} >
				        <img alt="" src={download_icon} className="profileCvImages" />
				    </a>
				    

		)} else {
	    	return ('')
	    }
	}
}

export default CandidateProfileCVDownloadImage ;
