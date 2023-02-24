import React, { Component } from 'react';
import * as Constants from '../../constants';
import * as Commons from '../../commons.js';
import './Question.css';
import { Link } from "react-router-dom";
import { Redirect } from 'react-router-dom';

class RegisterQuestion extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            uniqueEmails: [],
            uniqueSurveyLabels: [],
            selectedEmail: '',
            selectedSurveyLabel: '',
            selectedDate: '',
            navigate: false
        }

    }

    fetchUser = () => {
        Commons.executeFetch(Constants.FULL_SURVEYTOKEN_API_URI, 'GET', this.setUser);
    }

    handleSubmit = () => {
        const currentDate = new Date();
        const selectedDate = new Date(this.state.selectedDate);
        if (selectedDate >= currentDate) {
            this.fetchInsert()
        } else {
            // La data inserita è precedente alla data corrente
            alert("La data inserita non è valida. Inserire una data successiva o uguale a oggi.");
        }
    }

    fetchInsert = () => {
        const user = this.state.users.find(u => u.email === this.state.selectedEmail);
        if (user) {
            console.log(user)
            const userid = user.userId;
            const surveyid = user.surveyId;
            const expirationdate = new Date(this.state.selectedDate);
            // qui puoi usare userid e surveyid per fare la tua chiamata fetch
            var item = {
                userid: userid,
                surveyid: surveyid,
                expirationdate: expirationdate
            };
            Commons.executeFetch(Constants.INSERT_SURVEYTOKEN_API_URI, "POST", this.insertSuccess, this.insertError, JSON.stringify(item), true);
        }

    }

    insertSuccess = () => {
        console.log("successooooooo")
        this.setState({ navigate: true });
    }

    insertError = () => {
        console.log("noooooooooo")
    }

    setUser = (userToSet) => {
        Commons.debugMessage("userToSet - START - userToSet: " + userToSet);

        const uniqueEmails = [...new Set(userToSet.map(user => user.email))];
        const uniqueSurveyLabels = [...new Set(userToSet.map(user => user.surveyLabel))];

        this.setState({
            users: userToSet,
            uniqueEmails: uniqueEmails,
            uniqueSurveyLabels: uniqueSurveyLabels
        });

        console.log(this.state.users);
    }

    handleEmailSelect = (e) => {
        this.setState({ selectedEmail: e.target.value });
    };

    handleSurveyLabelSelect = (e) => {
        this.setState({ selectedSurveyLabel: e.target.value });
    };

    handleDateSelect = (e) => {
        this.setState({ selectedDate: e.target.value });
    };

    resetData = () => {
        this.setState({
            selectedEmail: '',
            selectedSurveyLabel: '',
            selectedDate: ''
        }, () => {
            document.getElementById('date-input').value = '';
        });
    }

    componentDidMount() {
        this.fetchUser()
    }


    render() {
        const { navigate } = this.state;

        if (navigate) {
            return <Redirect to="/question" />
        }
        return (
            <div>
                <div class="container-lg">
                    <div class="panel-heading">
                        <h1 class="panel-title">
                            Registra un nuovo questionario
                        </h1>
                    </div>
                    <div class="panel-body">
                        <div class="container">
                            <form class="form-horizontal">
                                <div class="form-group col-md-12">
                                    <div class="form-group col-md-12">
                                        <label>Utente</label>
                                        <div class="col-md-7">
                                            <select value={this.state.selectedEmail} onChange={(e) => this.setState({ selectedEmail: e.target.value })}>
                                                <option value="">Seleziona utente</option>
                                                {this.state.uniqueEmails.map(email => (
                                                    <option key={email} value={email}>{email}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group col-md-12">
                                        <label>Questionario</label>
                                        <div class="col-md-7">
                                            <select value={this.state.selectedSurveyLabel} onChange={(e) => this.setState({ selectedSurveyLabel: e.target.value })}>
                                                <option value="">Seleziona questionario</option>
                                                {this.state.uniqueSurveyLabels.map(label => (
                                                    <option key={label} value={label}>{label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group col-md-12">
                                        <label>Giorno Scadenza Questionario</label>
                                        <div class="col-md-7" value={this.state.selectedDate} onChange={this.handleDateSelect}>
                                            <input id="date-input" type="date"></input>
                                        </div>
                                    </div>
                                    <div align="center">
                                        <input type="submit" class="btn btn-primary btn-sm" style={{ marginRight: "10px" }} value="Inserisci" disabled={!this.state.selectedEmail || !this.state.selectedSurveyLabel || !this.state.selectedDate} onClick={this.handleSubmit} />
                                        <button class="btn btn-warning btn-sm" style={{ marginRight: "10px" }} onClick={this.resetData}>Reset</button>
                                        <Link to="/question" class="btn btn-danger btn-sm" style={{ marginRight: "10px" }}>Indietro e Annulla</Link>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}



export default RegisterQuestion;


