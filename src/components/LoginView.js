import React, { Component } from 'react';
import centauri_logo from '../images/header_logo.png' ;
import './LoginView.css' ;

class LoginView extends Component {
		formSubmit(values) {
			   this.props.history.push('/'); //navigating to Welcome Screen
			}
		render() {
			return (
				      <div>
				        <div className="product-info">
				           <div className="login-main-text">
				      	       <img src={centauri_logo} alt="logo" className="login_logo" />
				      	       <span className="title">CeRePro.HR</span>				      	       
				           </div>
				        </div>
				        <div className="main">
				           <div className="col-md-6 col-sm-12">
				              <div className="login-form">
				              <label>Inserisci email aziendale e password</label>
				                 <form onSubmit={this.formSubmit.bind(this)}>
				                    <div className="form-group">
				                       <input type="text" className="form-control"  name="email" placeholder="email" required />
				                    </div>
				                    <div className="form-group">
				                       
				                       <input type="password" className="form-control" name="psw" placeholder="password" required/>
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