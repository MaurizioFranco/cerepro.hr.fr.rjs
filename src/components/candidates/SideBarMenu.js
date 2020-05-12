import React, {Component} from 'react';
import SideBarMenuItem from './SideBarMenuItem';
import './candidates.css';
class SideBarMenu extends Component {
	constructor (props) {
		super(props);
//		console.log(this.props);
//		console.log("email ricevuta: " + this.props.email);
//		this.courses =  ;
		this.state = {
				courses : ['MICEACFS01', 'MICEACFS02', 'MICEACFS03', 'MICEACFS04', 'MICEACFS05']
		}
	}
	selectCourseCode = (courseCode) => {
		console.log("SideBarMenu.selectCourseCode - courseCode: " + courseCode);
		this.props.selectMenu(courseCode);
	}
	render () {
		return (
				
    				<div className="leftMenu">
    						<ul className="sidebarNav">
    						{ this.state.courses.map(item => <SideBarMenuItem selectMenu={this.selectCourseCode} key={item} courseCode={item} />) }
    						</ul>
				    </div>
    						
		);
	}
}

export default SideBarMenu ;
