import React, { Component } from "react";
import centauri_logo from "../images/header_logo.png";
import "./LoginView.css";
import * as Commons from "../commons.js";
import * as Constants from "../constants.js";
//import * as Messages from '../messages.js' ;
import { ModalLoadingSpinnerComponent } from "./loader/ModalLoadingSpinnerComponent";
import LoginAuthenticationKOMessage from "./login/LoginAuthenticationKOMessage.js";
import RegistrationView from './RegistrationView.js';

class LoginView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      formEmail: "",
      psw: "",
      authenticationKO: false,
      user: [],
    };
  }

  formSubmit(event) {
    event.preventDefault();
    this.getUserByEmail();
  }

  getUserByEmail = () => {
    let headerToken = Commons.getAuthorizationHeader(
      this.state.formEmail,
      this.state.psw
    );

    Commons.debugMessage(
		  "getUserByEmail - START - FULL_GET_USER_BY_EMAIL_API: " +
		  Constants.FULL_GET_USER_BY_EMAIL_API
	  );

    Commons.executeFetchWithHeader(
      Constants.FULL_GET_USER_BY_EMAIL_API + this.state.formEmail,
      "GET",
	    headerToken,
      this.setUserData,
	    this.showAuthenticationError
    );
  }

  checkCredentials = () => {

    let headerToken = Commons.getAuthorizationHeader(
      this.state.formEmail,
      this.state.psw
    );

    Commons.debugMessage(
      "LoginView.checkCredentials - START - FULL_API_URI: " +
        Constants.FULL_API_URI
    );

    Commons.executeFetchWithHeader(
      Constants.FULL_API_URI,
      "GET",
      headerToken,
      this.goAhead,
      this.showAuthenticationError
    );
  };

  goAhead = (responseData) => {
    //		console.log("LoginView.goAhead - START");
    //		console.log(responseData);
    //		console.log(responseData.principal.id);
    sessionStorage.setItem("userLoggedEmail", this.state.formEmail);
    sessionStorage.setItem("userId", responseData.principal.id);
    sessionStorage.setItem(
      "headerToken",
      Commons.getAuthorizationToken(this.state.formEmail, this.state.psw)
    );

    this.props.history.push("/");
  };

  setUserData = (responseData) => {
	  //salvataggio variabili user su sessionStorage
    this.setState({ user: responseData }); 
	  sessionStorage.setItem("user", JSON.stringify(responseData));

    this.checkCredentials();
  }

  showAuthenticationError = () => {
    this.setState({ authenticationKO: true });
  };

  handleChange = (event) => {
    const input = event.target;
    const value = input.type === "checkbox" ? input.checked : input.value;
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
              <LoginAuthenticationKOMessage
                visibility={this.state.authenticationKO}
              />
              <label>Inserisci email aziendale e password</label>
              <form onSubmit={this.formSubmit.bind(this)}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    name="formEmail"
                    value={this.state.formEmail}
                    onChange={this.handleChange}
                    placeholder="email"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    name="psw"
                    value={this.state.psw}
                    onChange={this.handleChange}
                    placeholder="password"
                    required
                  />
                </div>
                <div style={{display: 'flex', justifyContent : 'space-between'}}>			                   
				    <input type="submit" className="btn btn-black" value="ENTRA"/>
					<RegistrationView /> 
				</div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default LoginView;
