import { Component } from "react";
import { Button, TextField, DialogTitle, DialogContent, DialogActions, } from '@material-ui/core';
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
            email: 'Email',
            firstname: 'FirstName',
            lastname: 'LastName',
            password: 'Password',
            repeatPassword: 'Repeat-Password',
            emailIsValid: false,
            passwordsAreTheSame: false,
            messageRegistration: ""
        }
    }

    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }

    executeUserRegistration = () => {
        console.log("executeUserRegistration - START");
        var item = {
            email: this.state.email, firstname: this.state.firstname,
            lastname: this.state.lastname, password: this.state.password,
        };
        console.log(item);
        this.addUser(item);
    }

    addUser(item) {
        Commons.executeFetchWithHeader(Constants.USER_API_URI, "POST", { 'Content-Type': 'application/json' }, this.insertSuccess, Commons.operationError, JSON.stringify(item));
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
        this.setState({ email: email }, () => { this.checkEmail() });
    };

    checkEmail = () => {
        if (Validator.isEmail(this.state.email)) {
            this.setState({ emailIsValid: true, messageRegistration: "" });
        } else {
            this.setState({ emailIsValid: false });
            this.controllRegistration();
        }
    }

    handleFirstname = (e) => {
        const firstname = e.target.value;
        this.setState({ firstname: firstname });
        this.controllRegistration();
    };

    handleLastname = (e) => {
        const lastname = e.target.value;
        this.setState({ lastname: lastname });
        this.controllRegistration();
    };

    handlePassword = (e) => {
        const password = e.target.value;
        this.setState({ password: password }, () => { this.checkPasswords() });
    };

    handleRepeatPassword = (e) => {
        const repeatPassword = e.target.value;
        this.setState({ repeatPassword: repeatPassword }, () => { this.checkPasswords() });
    };

    checkPasswords = () => {
        this.setState(prevState => ({ passwordsAreTheSame: prevState.password === prevState.repeatPassword }), () => { this.controllRegistration() });
    }

    default = () => {
        this.setState({
            email: '',
            firstname: '',
            lastname: '',
            password: '',
            repeatPassword: '',
            passwordsAreTheSame: false,
            emailIsValid: false,
            messageRegistration: '',
        });

    }

    cancelSubmit = (event) => {
        event.preventDefault();
        this.gridRef.current.hide();
    }

    controllRegistration = () => {
        if (!this.state.emailIsValid && this.state.email) {
            this.setState({ messageRegistration: "la email inserita non è valida" })
        } else if (!this.state.passwordsAreTheSame && this.state.password) {
            this.setState({ messageRegistration: "le due password devono coincidere" })
        } else {
            this.setState({ messageRegistration: "" })
        }
    }

    render() {
        const { messageRegistration } = this.state;
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref={this.gridRef}>
                    <DialogTitle>Registration</DialogTitle>
                    <DialogContent>
                        <TextField
                            fullWidth
                            label="Email"
                            name="email"
                            type="text"
                            value = {this.state.email}
                            onChange={this.handleEmail}
                            style={{ marginBottom: "10px" }}
                        />
                        <TextField
                            fullWidth
                            label="FirstName"
                            name="firstname"
                            type="text"
                            value = {this.state.firstname}
                            onChange={this.handleFirstname}
                            style={{ marginBottom: "10px" }}
                        />
                        <TextField
                            fullWidth
                            label="LastName"
                            name="lastname"
                            value = {this.state.lastname}
                            onChange={this.handleLastname}
                            style={{ marginBottom: "20px" }}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            name="password"
                            type="password"
                            value = {this.state.password}
                            onChange={this.handlePassword}
                            style={{ marginBottom: "20px" }}
                        />
                        <TextField
                            fullWidth
                            label="Repeat-Password"
                            name="repeatPassword"
                            type="password"
                            value = {this.state.repeatPassword}
                            onChange={this.handleRepeatPassword}
                            style={{ marginBottom: "20px" }}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={this.executeUserRegistration}
                            style={{ marginRight: "14px" }}
                            color="primary"
                            disabled={!this.state.passwordsAreTheSame || !this.state.emailIsValid || !this.state.firstname || !this.state.password || !this.state.lastname}
                        >
                            Save
                        </Button>
                        <Button
                            onClick={this.cancelSubmit}
                            style={{ margin: "7px" }}
                            color="secondary"
                        >
                            Cancel
                        </Button>
                    </DialogActions>

                    <p>{messageRegistration}</p>
                </SkyLight>
                <div>
                    <Button variant="contained" color="secondary" onClick={() => { this.gridRef.current.show(); this.default() }}>Registration</Button>
                </div>
                <ToastContainer autoClose={5000} />
            </div>
        );
    }
}
export default RegistrationView;