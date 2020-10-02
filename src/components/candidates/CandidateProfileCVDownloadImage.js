import React, {Component} from 'react';
import * as Constants from '../../constants' ;
import './candidates.css';
import 'bootstrap/dist/css/bootstrap.css';
import download_icon from '../../images/download_icon.png';
import { Link } from "react-router-dom";


class CandidateProfileCVDownloadImage extends Component {
	
	render () {
		if (this.props.cvExternalPath!==null) {			
			return (
				    <Link to=../{Constants.CANDIDATE_PROFILE_CV_RELATIVE_FOLDER+this.props.cvExternalPath} rel="noopener noreferrer" target="_blank" download>
				        <img alt="" src={download_icon} className="profileCvImages" />
				    </Link>
				        

		)} else {
	    	return ('')
	    }
	}
}

export default CandidateProfileCVDownloadImage ;
