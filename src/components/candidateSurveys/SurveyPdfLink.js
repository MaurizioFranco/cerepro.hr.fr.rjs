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
		
		console.log("####### PDF FILE NAME #### " + this.props.pdffilename);
		return(
				// <a  href={'http://centauri.proximainformatica.com/cerepro_frontend_hr_rjs/dev/'+ Constants.SURVEYREPLY_PDF_FILE_PATH + this.props.pdffilename} target = "blank"><PdfIcon /></a>
				<a  href={process.env.PUBLIC_URL + Constants.SURVEYREPLY_PDF_FILE_PATH + this.props.pdffilename } target = "_blank"><PdfIcon alt='Download PDF'/></a>

		)
	}
}

export default SurveyPdfLink ;
