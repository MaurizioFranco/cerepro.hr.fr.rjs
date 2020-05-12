import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ListedCourseCandidate extends Component {
//	constructor (props) {
//		super(props);
//		console.log(this.props);
//		console.log("email ricevuta: " + this.props.email);
//	}
	updateCandidate = (candidateId) => {
		console.log("called update form for candidate with id: " + candidateId);
	};
    deleteCandidate = (candidateId) => {
    	console.log("called delete for candidate with id: " + candidateId);
	};
//	<td><button onClick={this.updateCandidate(this.props.id)} >MODIFICA</button></td>
//	<td><button onClick={this.deleteCandidate(this.props.id)} >ELIMINA</button></td>
	render () {
		return (
				<React.Fragment>
				<tr>
				<td>{this.props.id}</td>
				<td>{this.props.imgpath!=="null" && this.props.imgpath}</td>
				<td>{this.props.email}</td>
				<td>{this.props.firstname}</td>
				<td>{this.props.lastname}</td>
				<td>{this.props.cvExternalPath!=="null" ? this.props.cvExternalPath : ''}</td>
				<td>{this.props.insertedByFirstname}</td>
				<td><button onClick={() => this.updateCandidate(this.props.id)} >MODIFICA</button></td>
				<td><button onClick={() => this.deleteCandidate(this.props.id)} > CANCELLA </button></td> 
				</tr>
				</React.Fragment>
		);
	}
}

export default ListedCourseCandidate ;

ListedCourseCandidate.defaultProps = {
		firstname:"",
		lastname:"",
		id:"",
		cvExternalPath:"",
		email:"",
		imgpath:""
}

ListedCourseCandidate.propTypes = {
		name: PropTypes.string,
//		PropTypes.func.isRequired(name),
		surname: PropTypes.string,
}
