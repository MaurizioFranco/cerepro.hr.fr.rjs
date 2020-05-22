import React, { Component } from 'react';
import centauri_logo from '../images/header_logo.png' ;
import './LoginView.css' ;
import * as Commons from '../commons.js' ;
import * as Constants from '../constants.js' ;
//import * as Messages from '../messages.js' ;
import { ModalLoadingSpinnerComponent} from './loader/ModalLoadingSpinnerComponent';
import LoginAuthenticationKOMessage from './login/LoginAuthenticationKOMessage.js'

const AUTH_API = '/user' ;
const FULL_API_URI = Constants.BACKEND_API_PREFIX + AUTH_API ;

class LoginView extends Component {
    constructor (props) {
    	super(props);
    	this.state = {
    		    email:'', 
    		    psw:'',
    		    authenticationKO: false
    		  };
    }

	formSubmit(event) {
		event.preventDefault();
		this.checkCredentials2();
		
	};
		
	
	checkCredentials2 = () => {
		Commons.debugMessage("LoginView.checkCredentials2 - START - FULL_API_URI: " + FULL_API_URI);
		let headerToken = Commons.getAuthorizationHeader(this.state.email, this.state.psw);
		Commons.executeFetchWithHeader (FULL_API_URI, 'GET', headerToken, this.goAhead, this.showAuthenticationError);
	
	}
	
	goAhead = (responseData) => {
		console.log("LoginView.goAhead - START - responseData: " + responseData);
		sessionStorage.setItem('userLoggedEmail', this.state.email);
		sessionStorage.setItem('headerToken', Commons.getAuthorizationToken(this.state.email, this.state.psw));
        this.props.history.push('/');
	}
	
	showAuthenticationError = () => {
		this.setState ({authenticationKO:true}) ;
	}
	
	handleChange = (event) => {
	    const input = event.target;
	    const value = input.type === 'checkbox' ? input.checked : input.value;
	    this.setState({ [input.name]: value });
	};
		  
		render() {
			return (
					<div className="container-fluid ">					
					<ModalLoadingSpinnerComponent />
	                    <div id="login-view-main-container">
						    <div className="product-info">
							   <div className="login-main-text">
							   <img src={centauri_logo} alt="logo" className="login_logo" />
							   <span className="title">CeRePro.HR</span>				      	       
							   </div>
							</div>
					        <div className="login-form">
					           <div className="col-md-6 col-sm-12">
					              <LoginAuthenticationKOMessage visibility={this.state.authenticationKO} />
					              <label>Inserisci email aziendale e password</label>
				                 <form onSubmit={this.formSubmit.bind(this)}>
				                    <div className="form-group">
				                       <input type="text" className="form-control"  name="email" value={this.state.user} onChange={this.handleChange} placeholder="email" required />
				                    </div>
				                    <div className="form-group">					                       
				                       <input type="password" className="form-control" name="psw" value={this.state.user} onChange={this.handleChange} placeholder="password" required/>
				                    </div>				                   
				                    <input type="submit" className="btn btn-black" value="ENTRA"/>
				                 </form>
					           </div>
					        </div>
					    </div>
					</div>

				    );
		}
	}
	export default LoginView;