import React, {Component} from 'react';
import * as Messages from "../../messages.js";
import './LoginAuthenticationKOMessage.css';

class LoginAuthenticationKOMessage extends Component {
	
	render () {        
		if (this.props.visibility===true) {
			return (
				<div className="login-authentication-message" >
			        <label>{Messages.LOGIN_AUTHENTICATION_KO}</label>
			    </div>
			)
			
        } else {
    	    return ('')
        }
	}
}

export default LoginAuthenticationKOMessage ;
