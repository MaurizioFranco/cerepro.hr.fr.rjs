import React, {Component} from 'react';
import * as Constants from '../../constants' ;
// import './candidates.css';
import PdfIcon from '@mui/icons-material/PictureAsPdf';

class SurveyPdfLink extends Component {
	
	// eslint-disable-next-line no-useless-constructor
	constructor(props){
		super(props)
	}
	render () {
		// if (this.props.img!==null) {
		// 	return (
		// 	    <img className="profileImages" src={process.env.PUBLIC_URL+Constants.CANDIDATE_PROFILE_IMAGES_RELATIVE_FOLDER+this.props.img} alt=''/>
		// )} else {
	    // 	return ('')
	    // }
		console.log("####### PDF FILE NAME #### " + this.props.pdffilename);
		return(
				// <a  href={'http://centauri.proximainformatica.com//cerepro_frontend_hr_rjs/dev/'+ Constants.SURVEYREPLY_PDF_FILE_PATH + this.props.pdffilename}><PdfIcon alt='Download PDF'/></a>
				<a  href={process.env.PUBLIC_URL + Constants.SURVEYREPLY_PDF_FILE_PATH + this.props.pdffilename}><PdfIcon alt='Download PDF'/></a>

		)
	}
}

export default SurveyPdfLink ;
