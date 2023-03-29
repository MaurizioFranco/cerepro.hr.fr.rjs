import React, { Component } from 'react';
import * as Constants from '../../constants';
import * as Commons from '../../commons.js';
import './AllCandidateSurveys.css';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper
} from "@material-ui/core";
import RegeneratePdfButton from '../../commons/RegeneratePdfButton';
import DeleteButton from "../../commons/DeleteButton.js";
import styles from '../../styles';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddQuestion from './AddQuestion';
import SurveyPdfLink from './SurveyPdfLink';
import PageMainTitle from '../../commons/PageMainTitle';


class AllCandidateSurveys extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expiredSurveys: [],
            executedSurveys: [],
            activeAndValidSurveys: [],
            regeneratedPdf: ''
        }
        this.reloadData = this.reloadData.bind(this);
    }

    fetchExpiredSurveys = () => {
        Commons.executeFetch(Constants.FULL_SURVEYTOKEN_API_URI + 'expired/', 'GET', this.setUserExpired);
    }

    fetchActiveAndValidSurveys = () => {
        Commons.executeFetch(Constants.FULL_SURVEYTOKEN_API_URI + 'active/', 'GET', this.setActiveAndValidSurveys);
    }

    fetchExecutedSurveys = () => {
        Commons.executeFetch(Constants.FULL_SURVEYTOKEN_API_URI + 'executed/', 'GET', this.setExecutedSurveys);
    }

    fetchSendQuestion = (id) => {
        Commons.executeFetch(Constants.FULL_ST_SENDEMAIL_API_URI + id, 'GET', this.sendMailSuccess, Commons.operationError);
    }

    sendMailSuccess = (responseBody) => {
        Commons.operationSuccess(responseBody, "Questionario inviato correttamente.");
    }

    deleteSuccess = (response) => {
        Commons.operationSuccess();
        this.reloadData();
    }

    setUserExpired = (userExpiredToSet) => {
        Commons.debugMessage("userExpiredToSet - START - userExpiredToSet: " + userExpiredToSet);
        this.setState({ expiredSurveys: userExpiredToSet });
    }

    setActiveAndValidSurveys = (activeAndValidSurveysToSet) => {
        Commons.debugMessage("setActiveAndValidSurveys - START - activeAndValidSurveysToSet: " + activeAndValidSurveysToSet);
        this.setState({ activeAndValidSurveys: activeAndValidSurveysToSet });
    }

    setExecutedSurveys = (executedSurveysToSet) => {
        Commons.debugMessage("setExecutedSurveys - START - executedSurveysToSet: " + executedSurveysToSet);
        this.setState({ executedSurveys: executedSurveysToSet });
    }

    setTime = (expirationDateTime) => {
        const expirationTime = new Date(expirationDateTime)
        expirationTime.setHours(23);
        expirationTime.setMinutes(59);
        expirationTime.setSeconds(59);
        const date = expirationTime.toLocaleDateString();
        const time = expirationTime.toLocaleTimeString();
        const separator = ' ';
        return `${date}${separator}${time}`;
    }

    sendQuestion = (event) => {
        const id = event.target.dataset.id;
        this.fetchSendQuestion(id);
    }

    reloadData() {
        this.fetchExpiredSurveys();
        this.fetchActiveAndValidSurveys();
        this.fetchExecutedSurveys();
    }

    componentDidMount() {
        this.reloadData()
    }

    generateSuccess = () => {
        Commons.operationSuccess();
        this.reloadData();
    }

    generateFailed = () => {
        toast.error("ERRORE nell rigenerazione del pdf. Si prega di contattare l'amministratore.", {
            position: toast.POSITION.BOTTOM_LEFT,
        });
    }

    regeneratePdf = (surveyReplyId) => {
        Commons.executeFetch(Constants.FULL_PDF_END + surveyReplyId, 'POST', this.generateSuccess, Commons.operationError)
    }

    candidateSutveysToDoSection = () => {
        return (
            <React.Fragment>
                <div style={styles.manyDivContainer} class="panel panel-default">
                    <PageMainTitle text={"QUESTIONARI ANCORA DA COMPILARE"} />
                    <AddQuestion refreshSurveysList={this.reloadData} />
                <TableContainer component={Paper}>
                    <Table className={"table-style"}>
                        <TableHead>
                            <TableRow className={"table-head-row"}>
                                <TableCell style={{ color: "#fff" }}>E-MAIL</TableCell>
                                <TableCell style={{ color: "#fff" }}>NOME COGNOME CANDIDATO</TableCell>
                                <TableCell style={{ color: "#fff" }}>QUESTIONARIO</TableCell>
                                <TableCell style={{ color: "#fff" }}>SCADENZA QUESTIONARIO</TableCell>
                                <TableCell style={{ color: "#fff" }}>&nbsp;</TableCell>
                                <TableCell style={{ color: "#fff" }}>&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.activeAndValidSurveys.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.firstname + " " + item.lastname}</TableCell>
                                    {/* <TableCell>{item.lastname}</TableCell> */}
                                    <TableCell>{item.surveyLabel}</TableCell>
                                    <TableCell>{this.setTime(item.expirationDateTime)}</TableCell>
                                    <TableCell id="cellRight">
                                        <DeleteButton onClickFunction={() => Commons.confirmDelete("Sei sicuro di voler cancellare il questionario selezionato?", "Si", "No", Constants.DELETE_SURVEYTOKEN_API_URI + item.id, this.deleteSuccess, Commons.operationError)} />
                                    </TableCell>
                                    <TableCell id="cellRight">
                                        <button type="button" className="btn btn-success custom-width" data-id={item.id} onClick={this.sendQuestion}>Invia Questionario</button>
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
                </div>
            </React.Fragment>
        )
    }

    candidateSurveysDidSection = () => {
        const user = JSON.parse(sessionStorage.getItem("user"));
        const userLoggedRole = user.role;
        return (
            <React.Fragment>
                <div style={styles.manyDivContainer} class="panel panel-default">
                    <PageMainTitle style={{marginBottom: 30}} text={"QUESTIONARI COMPILATI(TERMINATI E NON)"} />
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow className={"table-head-row"}>
                                <TableCell style={{ color: "#fff" }}>E-MAIL</TableCell>
                                <TableCell style={{ color: "#fff" }}>NOME COGNOME CANDIDATO</TableCell>
                                <TableCell style={{ color: "#fff" }}>QUESTIONARIO</TableCell>
                                <TableCell style={{ color: "#fff" }}>SCADENZA QUESTIONARIO</TableCell>
                                <TableCell style={{ display: (userLoggedRole === 0 || userLoggedRole === 10) ? 'table-cell' : 'none' }}/>
                                <TableCell style={{ display: (userLoggedRole === 0 || userLoggedRole === 10) ? 'table-cell' : 'none' }}/>
                                <TableCell style={{ color: "#fff" }}>&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.executedSurveys.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.firstname + " " + item.lastname}</TableCell>
                                    <TableCell>{item.surveyLabel}</TableCell>
                                    <TableCell>{this.setTime(item.expirationDateTime)}</TableCell>
                                    <TableCell align='left' style={{ display: (userLoggedRole === 0 || userLoggedRole === 10) ? 'table-cell' : 'none' }}>
                                        <SurveyPdfLink pdffilename={item.urlPdf} />
                                    </TableCell>
                                    <TableCell style={{ display: (userLoggedRole === 0 || userLoggedRole === 10) ? 'table-cell' : 'none' }}>
                                        <RegeneratePdfButton onClick={() => this.regeneratePdf(item.surveyReplyId)}></RegeneratePdfButton>
                                    </TableCell>
                                    <TableCell id="cellLeft">
                                        <DeleteButton onClickFunction={() => Commons.confirmDelete("Sei sicuro di voler cancellare il questionario selezionato?", "Si", "No", Constants.DELETE_SURVEYTOKEN_API_URI + item.id, this.deleteSuccess, Commons.operationError)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </div>
            </React.Fragment>
        )
    }

    candidateSurveysExpiredSection = () => {
        return (
            <React.Fragment>
                <div style={styles.manyDivContainer} class="panel panel-default">
                    <PageMainTitle style={{marginBottom: 30}} text={"QUESTIONARI SCADUTI (NON COMPILATI)"} />
                <TableContainer component={Paper}>
                    <Table aria-label="customized table">
                        <TableHead>
                            <TableRow className={"table-head-row"}>
                                <TableCell style={{ color: "#fff" }}>E-MAIL</TableCell>
                                <TableCell style={{ color: "#fff" }}>NOME COGNOME CANDIDATO</TableCell>
                                <TableCell style={{ color: "#fff" }}>QUESTIONARIO</TableCell>
                                <TableCell style={{ color: "#fff" }}>SCADENZA QUESTIONARIO</TableCell>
                                <TableCell style={{ color: "#fff" }}>&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.expiredSurveys.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.firstname + " " + item.lastname}</TableCell>
                                    <TableCell>{item.surveyLabel}</TableCell>
                                    <TableCell>{this.setTime(item.expirationDateTime)}</TableCell>


                                    <TableCell id="cellLeft">
                                        <DeleteButton onClickFunction={() => Commons.confirmDelete("Sei sicuro di voler cancellare il questionario selezionato?", "Si", "No", Constants.DELETE_SURVEYTOKEN_API_URI + item.id, this.deleteSuccess, Commons.operationError)} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                </div>
            </React.Fragment>
        )
    }

    render() {
        return (
            <div className="App">
                {this.candidateSutveysToDoSection()}
                {this.candidateSurveysDidSection()}
                {this.candidateSurveysExpiredSection()}
            </div>
        );
    }
}


export default AllCandidateSurveys;