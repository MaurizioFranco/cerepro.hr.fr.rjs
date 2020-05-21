import React, { Component } from 'react';
import centauri_logo from '../images/header_logo.png' ;
import './LoginView.css' ;
import * as Commons from '../commons.js' ;
import * as Constants from '../constants.js' ;

const AUTH_API = '/user' ;
const FULL_API_URI = Constants.BACKEND_API_PREFIX + AUTH_API ;

class LoginView extends Component {
	    constructor (props) {
	    	super(props);
	    	this.state = {
	    		    email:'', 
	    		    psw:''
	    		  };
	    }
	
		formSubmit(event) {
			event.preventDefault();
//			console.log("login - START");
//			console.log(this.state);
			this.checkCredentials();
			
		};
		
		checkCredentials = () => {
			let headerToken = Commons.getAuthorizationHeader(this.state.email, this.state.psw);
			fetch(FULL_API_URI, {
		          method: "GET",
		          headers: headerToken
		                    },)
			  .then((response) => {
				  console.log(response.status);
			    if(!response.ok) {
			    	console.log("Authentication KO!!");
			        return false;
			        //throw new Error(response.status);
			    } else {
			    	console.log("Authentication OK!!");
			    	return response.json();
			    }
			  })
			  .then((data) => {
//				this.setState({ candidates: data.content });
			      localStorage.setItem('userLoggedEmail', this.state.email);
//			      localStorage.setItem('headerToken', JSON.stringify(headerToken));
			      localStorage.setItem('headerToken', Commons.getAuthorizationToken(this.state.email, this.state.psw));
                  this.props.history.push('/');
//			    console.log("DATA STORED");
			  })
//			  .catch((error) => {
//			    console.log('error: ' + error);
////			    this.setState({ requestFailed: true });
//			    this.setState({ candidates: [] });
//			  });
		}
		
		handleChange = (event) => {
		    const input = event.target;
		    const value = input.type === 'checkbox' ? input.checked : input.value;
		 
		    this.setState({ [input.name]: value });
//		    console.log(this.state);
		};
		  
		render() {
			return (
					<div className="container-fluid ">
	                    <div id="login-view-main-container">
						    <div className="product-info">
							   <div className="login-main-text">
							   <img src={centauri_logo} alt="logo" className="login_logo" />
							   <span className="title">CeRePro.HR</span>				      	       
							   </div>
							</div>
					        <div className="login-form">
					           <div className="col-md-6 col-sm-12">
					              <div>
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
					</div>

				    );
		}
	}
	export default LoginView;