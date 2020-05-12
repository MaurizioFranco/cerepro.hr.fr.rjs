import React, {Component} from 'react';


class SideBarMenuItem extends Component {
//	constructor (props) {
//		super(props);
//		console.log(this.props);
//		console.log("email ricevuta: " + this.props.email);
//	}
	showCandidateList = (courseCode) => {
        console.log("showCandidateList for this courseCode: " + courseCode);
        this.props.selectMenu(courseCode);
    }
	render () {
		return (
				<React.Fragment>
				 <li onClick={() => this.showCandidateList(this.props.courseCode)}> {this.props.courseCode} </li> 
					</React.Fragment>
		);
	}
}

export default SideBarMenuItem ;
