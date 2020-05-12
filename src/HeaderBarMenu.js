import React, {Component} from 'react';
import centauri_academy_header_logo from './images/header_logo.png';
import './HeaderBarMenu.css';
import { Link } from "react-router-dom";

class HeaderBarMenu extends Component {
	
	 
//	constructor (props) {
//		super(props);
//		const {userLoggedEmail} = this.props;
////		console.log(this.props);
////		console.log("email ricevuta: " + this.props.email);
////		this.courses = ['MICEACFS01', 'MICEACFS02', 'MICEACFS03', 'MICEACFS04', 'MICEACFS05'] ;
//	}
	render () {
//		
		return (
				<React.Fragment>
				<header className="main">
					<img alt="centauri-academy-logo" src={centauri_academy_header_logo} className="logo" /><span className="title">CeRePro.HR</span>
					<EmptySeparator/><EmptySeparator/>
					<Link to="/candidates">Candidati</Link>
					<Separator/>
					<Link to="/candidateStates">Stati candidatura</Link>
					<Separator/>
					<Link to="/positions">Posizioni</Link>
					
					<ul className="rightMenu">
					    <li className="rightMenuItem">{this.props.userLoggedEmail}</li>
					    <li className="rightMenuItem">logout</li>
					</ul>
				</header>
				
				
				</React.Fragment>
		);
	}
}

const Separator = () => <span> &middot; </span>;
const EmptySeparator = () => <span> &nbsp; </span>;

export default HeaderBarMenu ;
