import React, {Component} from 'react';
import { Link } from "react-router-dom";

class SideBarMenuItem extends Component {
	constructor (props) {
		super(props);
//		console.log(this.props);
		this.state = {
				label : this.props.courseCode,
				link : "/candidates/" + this.props.courseCode
		}
	}
	render () {
		return (
				<React.Fragment>
				<li><Link to={this.state.link}>{this.state.label}</Link></li>
				</React.Fragment>
		);
	}
}

export default SideBarMenuItem ;
