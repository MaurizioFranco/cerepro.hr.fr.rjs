import React, { Component } from 'react';
import centauri_logo from '../images/header_logo.png' ;
import './LoginView.css' ;

class LoginView extends Component {
	    constructor (props) {
	    	super(props);
	    	this.state = {
	    		    email:'', 
	    		    psw:''
	    		  };
	    }
	
		formSubmit(values) {
//			console.log("login - START");
//			console.log(this.state);
			localStorage.setItem('userLoggedEmail', this.state.email);
			this.props.history.push('/');
		};
		
		handleChange = (event) => {
		    const input = event.target;
		    const value = input.type === 'checkbox' ? input.checked : input.value;
		 
		    this.setState({ [input.name]: value });
//		    console.log(this.state);
		;}
		  
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