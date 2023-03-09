import { Component } from "react";
import { Button } from '@material-ui/core';
import SkyLight from 'react-skylight';
import React from "react";
import Validator from "validator";
import * as Commons from '../commons.js';
import * as Constants from '../constants.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


class RegistrationView extends Component {

    constructor(props) {
        super(props);
        this.gridRef = React.createRef();
        this.state = {
            email: '',
            firstname: '',
            lastname: '',
            password: '',
            repeatPassword: '',
            emailIsValid: false,
            passwordsAreTheSame: false
        }
    }

    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }

    handleSubmit = (event) => {
        event.preventDefault();
        var item = {
            email: this.state.email, firstname: this.state.firstname,
            lastname: this.state.lastname, password: this.state.password,     
        };
        console.log(item);
        this.addUser(item);
    }

    addUser(item) {
        Commons.executeFetchWithHeader(Constants.USER_API_URI, "POST", {'Content-Type': 'application/json'}, this.insertSuccess, Commons.operationError, JSON.stringify(item));        
    }

    insertSuccess = (response) => {
        console.log("INSERT USER SUCCESS");
        console.log(response);
            toast.success("User successfully registered. We will send you an email once your account is enabled", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            this.gridRef.current.hide();
    }

    handleEmail = (e) => {
        const email = e.target.value;
        this.setState({ email: email }, () => {this.checkEmail()});
    };

    checkEmail = () => {
        if (Validator.isEmail(this.state.email)) {
            this.setState({ emailIsValid: true });
          } else {
            this.setState({ emailIsValid: false });
          }
    }

    handleFirstname = (e) => {
        const firstname = e.target.value;
        this.setState({ firstname: firstname });
    };

    handleLastname = (e) => {
        const lastname = e.target.value;
        this.setState({ lastname: lastname });
    };

    handlePassword = (e) => {
        const password = e.target.value;
        this.setState({ password: password }, () => {this.checkPasswords()});
    };

    handleRepeatPassword = (e) => {
        const repeatPassword = e.target.value;
        this.setState({ repeatPassword: repeatPassword }, () => {this.checkPasswords()});
    };

    checkPasswords = () => {
        this.setState(prevState=>({passwordsAreTheSame: prevState.password===prevState.repeatPassword}), () => {});
    }

    cancelSubmit = (event) => {
        event.preventDefault();
        this.gridRef.current.hide();
    }

    render () {
        if (!this.state.emailIsValid && this.state.email) {
            return (
                <div>
                    <SkyLight hideOnOverlayClicked ref={this.gridRef}>
                        <h3>Registration</h3>
                        <form id = "form">
                            <input type="email" placeholder="email" name="email"
                                onChange={this.handleEmail} /><br />
                            <input type="text" placeholder="firstname" name="firstname"
                                onChange={this.handleFirstname} /><br />
                            <input type="text" placeholder="lastname" name="lastname"
                                onChange={this.handleLastname} /><br />
                            <input type="password" placeholder="password" name="password"
                                onChange={this.handlePassword} /><br />
                            <input type="password" placeholder="repeat-password" name="repeatPassword"
                                onChange={this.handleRepeatPassword} /><br />
                            <button id="save-button" onClick={this.handleSubmit} disabled={!this.state.passwordsAreTheSame || !this.state.emailIsValid || !this.state.firstname || !this.state.password || !this.state.lastname}>Save</button>
                            <button onClick={this.cancelSubmit}>Cancel</button>
                        </form>
                        <p>La mail inserita non è valida</p>
                    </SkyLight>
                    <div>
                        <Button variant="contained" color="secondary" onClick={() => this.gridRef.current.show()}>Registrati</Button>
                    </div>
                    <ToastContainer autoClose={5000} />
                </div>
            );
        }  else if (!this.state.passwordsAreTheSame && this.state.password) {
            return (
                <div>
                    <SkyLight hideOnOverlayClicked ref={this.gridRef}>
                        <h3>Registration</h3>
                        <form id = "form">
                            <input type="email" placeholder="email" name="email"
                                onChange={this.handleEmail} /><br />
                            <input type="text" placeholder="firstname" name="firstname"
                                onChange={this.handleFirstname} /><br />
                            <input type="text" placeholder="lastname" name="lastname"
                                onChange={this.handleLastname} /><br />
                            <input type="password" placeholder="password" name="password"
                                onChange={this.handlePassword} /><br />
                            <input type="password" placeholder="repeat-password" name="repeatPassword"
                                onChange={this.handleRepeatPassword} /><br />
                            <button id="save-button" onClick={this.handleSubmit} disabled={!this.state.passwordsAreTheSame || !this.state.emailIsValid || !this.state.firstname || !this.state.password || !this.state.lastname}>Save</button>
                            <button onClick={this.cancelSubmit}>Cancel</button>
                        </form>
                        <p>Le due password devono coincidere</p>
                    </SkyLight>
                    <div>
                        <Button variant="contained" color="secondary" onClick={() => this.gridRef.current.show()}>Registrati</Button>
                    </div>
                    <ToastContainer autoClose={5000} />
                </div>
            );
        } else {
            return (
                <div>
                    <SkyLight hideOnOverlayClicked ref={this.gridRef}>
                        <h3>Registration</h3>
                        <form id = "form">
                            <input type="email" placeholder="email" name="email"
                                onChange={this.handleEmail} /><br />
                            <input type="text" placeholder="firstname" name="firstname"
                                onChange={this.handleFirstname} /><br />
                            <input type="text" placeholder="lastname" name="lastname"
                                onChange={this.handleLastname} /><br />
                            <input type="password" placeholder="password" name="password"
                                onChange={this.handlePassword} /><br />
                            <input type="password" placeholder="repeat-password" name="repeatPassword"
                                onChange={this.handleRepeatPassword} /><br />
                            <button id="save-button" onClick={this.handleSubmit} disabled={!this.state.passwordsAreTheSame || !this.state.emailIsValid || !this.state.firstname || !this.state.password || !this.state.lastname}>Save</button>
                            <button onClick={this.cancelSubmit}>Cancel</button>
                        </form>
                    </SkyLight>
                    <div>
                        <Button variant="contained" color="secondary" onClick={() => this.gridRef.current.show()}>Registrati</Button>
                    </div>
                    <ToastContainer autoClose={5000} />
                </div>
            );
        }
    }

}   export default RegistrationView;