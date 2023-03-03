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
            candidates: [],
            uniqueEmails: [],
            uniqueSurveyLabels: [],
            surveyToken: [],
            selectedEmail: '',
            selectedSurveyLabel: '',
            selectedDate: '',
            navigate: false
        }

    }

    fetchUser = () => {
        Commons.executeFetch(Constants.FULL_ALL_CANDIDATES_API_URI, 'GET', this.setCandidates);
    }

    fetchQuestion = () =>{
        Commons.executeFetch(Constants.FULL_SURVEY_API_URI, 'GET', this.setQuestion);
    }

    handleSubmit = () => {
        const currentDate = new Date();
        const selectedDate = new Date(this.state.selectedDate);
        if (selectedDate >= currentDate) {
            this.fetchInsert()
        } else {
            alert("La data inserita non è valida. Inserire una data successiva o uguale a oggi.");
        }
    }

    fetchInsert = () => {
        const candidate = this.state.candidates.find(u => u.email === this.state.selectedEmail);

        const question = this.state.surveyToken.find(u => u.label === this.state.selectedSurveyLabel);
        if (candidate) {
            const candidateId = candidate.id;
            const surveyId = question.id;
            const expirationDateTime = new Date(this.state.selectedDate);
            var item = {
                candidateId: candidateId,
                surveyId: surveyId,
                expirationDateTime: expirationDateTime
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

    setCandidates = (candidates) => {
        Commons.debugMessage("setCandidates - START - candidates: " + candidates);
        const uniqueEmails = [...new Set(candidates.map(candidate => candidate.email))];
        this.setState({
            candidates: candidates,
            uniqueEmails: uniqueEmails,
        });
    }

    setQuestion = (questionToSet) =>{
        Commons.debugMessage("questionToSet - START - " + questionToSet);
        const uniqueSurveyLabels = [...new Set(questionToSet.map(question => question.label))];
        this.setState({
            surveyToken : questionToSet,
            uniqueSurveyLabels: uniqueSurveyLabels
        });
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
        this.fetchQuestion()
    }


    render() {
        const { navigate } = this.state;

        if (navigate) {
            return <Redirect to="/question" />
        }
        return (
            <div>
                <div className="container-lg">
                    <div className="panel-heading">
                        <h1 className="panel-title">
                            Registra un nuovo questionario
                        </h1>
                    </div>
                    <div className="panel-body">
                        <div className="container">
                            <form className="form-horizontal">
                                <div className="form-group col-md-12">
                                    <div className="form-group col-md-12">
                                        <label>Utente</label>
                                        <div className="col-md-7">
                                            <select value={this.state.selectedEmail} onChange={(e) => this.setState({ selectedEmail: e.target.value })}>
                                                <option value="">Select candidate</option>
                                                {this.state.uniqueEmails.map(email => (
                                                    <option key={email} value={email}>{email}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label>Questionario</label>
                                        <div className="col-md-7">
                                            <select value={this.state.selectedSurveyLabel} onChange={(e) => this.setState({ selectedSurveyLabel: e.target.value })}>
                                                <option value="">Seleziona questionario</option>
                                                {this.state.uniqueSurveyLabels.map(label => (
                                                    <option key={label} value={label}>{label}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group col-md-12">
                                        <label>Giorno Scadenza Questionario</label>
                                        <div className="col-md-7" value={this.state.selectedDate} onChange={this.handleDateSelect}>
                                            <input id="date-input" type="date"></input>
                                        </div>
                                    </div>
                                    <div align="center">
                                        <input type="submit" className="btn btn-primary btn-sm" style={{ marginRight: "10px" }} value="Inserisci" disabled={!this.state.selectedEmail || !this.state.selectedSurveyLabel || !this.state.selectedDate} onClick={this.handleSubmit} />
                                        <button className="btn btn-warning btn-sm" style={{ marginRight: "10px" }} onClick={this.resetData}>Reset</button>
                                        <Link to="/question" className="btn btn-danger btn-sm" style={{ marginRight: "10px" }}>Indietro e Annulla</Link>
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


