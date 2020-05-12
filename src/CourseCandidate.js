/**
 * 
 */
import React, {Component} from 'react';
class CourseCandidate extends Component {
//	constructor (props) {
//		super(props);
//	}
	render () {
		return (
				<div id="cadidateDetail">
				<div>Candidato</div>
				<label>nome del candidato</label>
				<input type="text" defaultValue="Maurizio" id="candidateName"/>
				</div>
		);
	}
	
	
}

export default CourseCandidate ;