import React, {Component} from 'react';
import * as Constants from "../../constants.js";
import './candidates.css';

class MessageDialog extends Component {
	
	render () {
//		<img className="profileImages img-thumbnail" src={Constants.CANDIDATE_PROFILE_IMAGES_RELATIVE_FOLDER+this.props.img} alt=''/>
		if (this.props.visibility===true) {
			if (this.props.type===Constants.DANGER_ALERT_DIALOG) {
				return (
					    <div className="alert alert-danger dialogMessages" role="alert">
					        {this.props.message}
					    </div>
					)	
			} else {
				return (
					    <div className="alert alert-success dialogMessages" role="alert">
					        {this.props.message}
					    </div>
					)
			}
			
        } else {
    	    return ('')
        }
	}
}

export default MessageDialog ;
