import React, { Component } from 'react';
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
//import * as Constants from '../../../constants.js';
import 'bootstrap/dist/js/bootstrap.bundle';

export class CoursesHeaderMenu extends Component {
	
	render() {
		return (
			<li className="nav-item dropdown">
				<button className="nav-link dropdown-toggle buttonDropdown navigationBarItem" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
					Courses
		</button>

				<div className="dropdown-menu" aria-labelledby="navbarDropdown">
					<Link className="dropdown-item navigationBarItem" to="/coursepage">Course Page</Link>				
				</div>
			</li>
		);
	}
}

export default CoursesHeaderMenu ;