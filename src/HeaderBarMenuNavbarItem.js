import React, {Component} from 'react';
import { Link } from "react-router-dom";

class HeaderBarMenuNavbarItem extends Component {
	constructor (props) {
		super(props);
//		console.log(props);
		this.state = {
				label : this.props.code,
				link : "/candidates/" + this.props.code
		}
	}
	render () {
		return (
				<React.Fragment>
				<Link key={this.state.label} className="dropdown-item navigationBarItem" to={this.state.link}>{this.state.label}</Link>
				</React.Fragment>
		);
	}
}

export default HeaderBarMenuNavbarItem ;
