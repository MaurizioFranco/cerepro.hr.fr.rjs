import React, {Component} from 'react';
import SideBarMenuItem from './SideBarMenuItem';
import './candidates.css';
import { Link } from "react-router-dom";

class SideBarMenu extends Component {
	componentDidMount() {
	    console.log("SideBarMenu.componentDidMount() - START");
		console.log("SideBarMenu.componentDidMount() - END");
	}
	constructor (props) {
		super(props);
		console.log("SideBarMenu.constructor() - START");
//		console.log(this.props);
//		console.log("email ricevuta: " + this.props.email);
//		this.courses =  ;
		this.state = {
				courses : ['MICEACFS01', 'MICEACFS02', 'MICEACFS03', 'MICEACFS04', 'MICEACFS05']
		}
		console.log("SideBarMenu.constructor() - END");
	}
	selectCourseCode = (courseCode) => {
		console.log("SideBarMenu.selectCourseCode - courseCode: " + courseCode);
		this.props.selectMenu(courseCode);
	}
	render () {
		return (
				
    				<div className="leftMenu">
    				    <Link to="newCandidate">Inserisci nuovo candidato</Link>
    				    <span>Lista candidati per posizione:</span>
    						<ul className="sidebarMenu">    						
    						{ this.state.courses.map(item => <SideBarMenuItem selectMenu={this.selectCourseCode} key={item} courseCode={item} />) }    						
    						</ul>
				    </div>
    						
		);
	}
}

export default SideBarMenu ;
