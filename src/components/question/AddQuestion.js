import React from "react";
import './Question.css';
import * as Commons from "../../commons.js";
import * as Constants from "../../constants.js";
import {Button,Dialog,} from "@material-ui/core";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class AddQuestion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            uniqueEmails: [],
            uniqueSurveyLabels: [],
            surveyToken: [],
            selectedEmail: '',
            selectedSurveyLabel: '',
            selectedDate: '',
            isModalOpen: false,
        };
        this.gridRef = React.createRef();
    }

    fetchUser = () => {
        Commons.executeFetch(Constants.FULL_USER_COURSEPAGE_API_URI, 'GET', this.setUser);
    }

    fetchQuestion = () => {
        Commons.executeFetch(Constants.FULL_SURVEY_API_URI, 'GET', this.setQuestion);
    }

    handleSubmit = () => {
        const currentDate = new Date();
        const selectedDate = new Date(this.state.selectedDate);
        if (selectedDate >= currentDate) {
            this.fetchInsert();
            this.setState({ isModalOpen: false });
        } else {
            toast.error("Data troppo antecedente", {
                position: toast.POSITION.BOTTOM_LEFT,
              });
        }
    }

    fetchInsert = () => {
        const user = this.state.users.find(u => u.email === this.state.selectedEmail);

        const question = this.state.surveyToken.find(u => u.label === this.state.selectedSurveyLabel);
        if (user) {
            const userid = user.id;
            const surveyid = question.id;
            const expirationdate = new Date(this.state.selectedDate);
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
        toast.success("Insert successfully", {
            position: toast.POSITION.BOTTOM_LEFT,
        });
    }

    insertError = () => {
        console.log("noooooooooo")
    }

    setUser = (userToSet) => {
        Commons.debugMessage("userToSet - START - userToSet: " + userToSet);
        const uniqueEmails = [...new Set(userToSet.map(user => user.email))];
        this.setState({
            users: userToSet,
            uniqueEmails: uniqueEmails,
        });
    }

    setQuestion = (questionToSet) => {
        Commons.debugMessage("questionToSet - START - " + questionToSet);
        const uniqueSurveyLabels = [...new Set(questionToSet.map(question => question.label))];
        this.setState({
            surveyToken: questionToSet,
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

    cancelSubmit = (event) => {
        event.preventDefault();
        this.setState({ isModalOpen: false });
    };

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.isModalOpen}
                    onClose={() => this.setState({ isModalOpen: false })}
                >
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
                                                <option value="">Seleziona utente</option>
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
                                        {/* <input type="submit" className="btn btn-primary btn-sm" style={{ marginRight: "7px" }} value="Inserisci" disabled={!this.state.selectedEmail || !this.state.selectedSurveyLabel || !this.state.selectedDate} onClick={this.handleSubmit} /> */}
                                        <Button type="submit" id="buttonForm" color="primary" disabled={!this.state.selectedEmail || !this.state.selectedSurveyLabel || !this.state.selectedDate} onClick={this.handleSubmit} >Inserisci</Button>
                                        <Button id="buttonResetForm" onClick={this.resetData}>Reset</Button>
                                        <Button id="buttonCancelForm" onClick={this.cancelSubmit} >Cancel</Button>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                </Dialog>
                <div>
                    <Button
                        variant="contained"
                        style={{
                            marginTop:"-45px",
                            marginBottom: "0px",
                            backgroundColor: "green",
                            color: "#fff",
                            float: "right",
                        }}
                        onClick={() => this.setState({ isModalOpen: true,selectedEmail: '',
                        selectedSurveyLabel: '',
                        selectedDate: '' })}
                    >
                        +
                    </Button>
                </div>
                <ToastContainer autoClose={2500} />
            </div>
        );
    }
}

export default AddQuestion;