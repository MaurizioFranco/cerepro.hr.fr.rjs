import React, { Component } from 'react';
import * as Constants from '../../constants';
import * as Commons from '../../commons.js';
import './Question.css';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Button } from "@material-ui/core";

import DeleteButton from "../../commons/DeleteButton.js";

import reload from "../../images/reload.png";

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddQuestion from './AddQuestion';
import SurveyPdfLink from './SurveyPdfLink';


class Question extends Component {

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

    sendError(err) {
        toast.error(err.errorMessage, {
            position: toast.POSITION.BOTTOM_LEFT,
        });
    }

    sendSuccess(response) {
        // console.log("Send email successsss");
        toast.success("Email successfully send", {
            position: toast.POSITION.BOTTOM_LEFT,
        });
    }

    deleteSuccess = (response) => {
        Commons.operationSuccess();
        this.reloadData();
    }

    setUserExpired = (userExpiredToSet) => {
        Commons.debugMessage("userExpiredToSet - START - userExpiredToSet: " + userExpiredToSet);
        this.setState({ expiredSurveys: userExpiredToSet });
        // console.log("EXPIRED == " + this.state.expiredSurveys);
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
        const separator = ' '; // Puoi usare lo spazio o un altro carattere come separatore
        return `${date}${separator}${time}`;
    }

    StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.white,
            color: theme.palette.common.black,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 12,
        },
    }));

    StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

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
        // toast.success("PDF regenerated", {
        //     position: toast.POSITION.BOTTOM_LEFT,
        // });
    }

    generateFailed = () => {
        toast.error("PDF failed to regenerate, contact the administration", {
            position: toast.POSITION.BOTTOM_LEFT,
        });
    }

    regeneratePdf = (surveyReplyId) => {
        Commons.executeFetch(Constants.FULL_PDF_END + surveyReplyId, 'POST', this.generateSuccess, Commons.operationError)
    }

    render() {
        // const { classes } = this.props;
        const user = JSON.parse(sessionStorage.getItem("user"));
        const userLoggedRole = user.role;

        return (
            <div>
                <div >
                    <div class="panel panel-default">
                        <h3  style={{ textAlign: "center"}}>QUESTIONARI ANCORA DA COMPILARE</h3>
                        <AddQuestion refreshSurveysList={this.reloadData} />
                    </div>
                    <TableContainer component={Paper}>
                      <Table className={"table-style"}>
						<TableHead>
							<TableRow className={"table-head-row"}>
                                    <this.StyledTableCell align="left">Email</this.StyledTableCell>
                                    <this.StyledTableCell align="left">Name</this.StyledTableCell>
                                    <this.StyledTableCell align="left">Lastname</this.StyledTableCell>
                                    <this.StyledTableCell align="left">Question</this.StyledTableCell>
                                    <this.StyledTableCell align="left">Expiration Date Time</this.StyledTableCell>
                                    <this.StyledTableCell align="right"></this.StyledTableCell>
                                    <this.StyledTableCell align="right"></this.StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.activeAndValidSurveys.map((item) => (
                                    <this.StyledTableRow key={item.id}>
                                        <this.StyledTableCell align="left">{item.email}</this.StyledTableCell>
                                        <this.StyledTableCell align="left">{item.firstname}</this.StyledTableCell>
                                        <this.StyledTableCell align="left">{item.lastname}</this.StyledTableCell>
                                        <this.StyledTableCell align="left">{item.surveyLabel}</this.StyledTableCell>
                                        <this.StyledTableCell align="left">{this.setTime(item.expirationDateTime)}</this.StyledTableCell>
                                        <this.StyledTableCell id="cellRight">
                                            <DeleteButton onClickFunction={() => Commons.confirmDelete("Sei sicuro di voler cancellare il questionario selezionato?", "Si", "No", Constants.DELETE_SURVEYTOKEN_API_URI + item.id, this.deleteSuccess, Commons.operationError)}/>
                                        </this.StyledTableCell>
                                        <this.StyledTableCell id="cellRight">
                                            <button type="button" className="btn btn-success custom-width" data-id={item.id} onClick={this.sendQuestion}>Invia Questionario</button>
                                        </this.StyledTableCell>
                                    </this.StyledTableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <br>
                </br>
                <div style={{ padding: "10px" }}>
                    <div class="panel-heading">
                        <h1 class="panel-title">
                            <span>Questionari eseguiti(completati e non)</span>
                        </h1>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <this.StyledTableCell align="left">Email</this.StyledTableCell>
                                    <this.StyledTableCell align="left">Name</this.StyledTableCell>
                                    <this.StyledTableCell align="left">Lastname</this.StyledTableCell>
                                    <this.StyledTableCell align="left">Question</this.StyledTableCell>
                                    <this.StyledTableCell align="left">expiration Date Time</this.StyledTableCell>
                                    <this.StyledTableCell align="left"></this.StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.executedSurveys.map((item) => (
                                    <this.StyledTableRow key={item.id}>
                                        <this.StyledTableCell align="left">{item.email}</this.StyledTableCell>
                                        <this.StyledTableCell align="left">{item.firstname}</this.StyledTableCell>
                                        <this.StyledTableCell align="left">{item.lastname}</this.StyledTableCell>
                                        <this.StyledTableCell align="left">{item.surveyLabel}</this.StyledTableCell>
                                        <this.StyledTableCell align="left">{this.setTime(item.expirationDateTime)}</this.StyledTableCell>
                                        {console.log("### GENERATED TOKEN: ### " + item.generatedToken)}

                                        <this.StyledTableCell align='left' style={{ display: (userLoggedRole === 0 || userLoggedRole === 10) ? 'table-cell' : 'none' }}>
                                            <SurveyPdfLink pdffilename={item.urlPdf} />
                                        </this.StyledTableCell>

                                        <this.StyledTableCell align="left" style={{ display: (userLoggedRole === 0 || userLoggedRole === 10) ? 'table-cell' : 'none' }}>
                                            <Button onClick={() => this.regeneratePdf(item.surveyReplyId)}>Rigenera PDF</Button>
                                        </this.StyledTableCell>

                                        <this.StyledTableCell id="cellLeft">
                                            <DeleteButton onClickFunction={() => Commons.confirmDelete("Sei sicuro di voler cancellare il questionario selezionato?", "Si", "No", Constants.DELETE_SURVEYTOKEN_API_URI + item.id, this.deleteSuccess, Commons.operationError)}/>
                                        </this.StyledTableCell>
                                    </this.StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

                <br>
                </br>
                <div style={{ padding: "10px" }}>
                    <div class="panel-heading">
                        <h1 class="panel-title">
                            <span id="expired">Lista questionari scaduti</span>
                        </h1>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <this.StyledTableCell align="left">Email</this.StyledTableCell>
                                    <this.StyledTableCell align="left">Name</this.StyledTableCell>
                                    <this.StyledTableCell align="left">Lastname</this.StyledTableCell>
                                    <this.StyledTableCell align="left">Question</this.StyledTableCell>
                                    <this.StyledTableCell align="left">expiration Date Time</this.StyledTableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.expiredSurveys.map((item) => (
                                    <this.StyledTableRow key={item.id}>
                                        <this.StyledTableCell align="left">{item.email}</this.StyledTableCell>
                                        <this.StyledTableCell align="left">{item.firstname}</this.StyledTableCell>
                                        <this.StyledTableCell align="left">{item.lastname}</this.StyledTableCell>
                                        <this.StyledTableCell align="left">{item.surveyLabel}</this.StyledTableCell>
                                        <this.StyledTableCell align="left">{this.setTime(item.expirationDateTime)}</this.StyledTableCell>


                                        <this.StyledTableCell id="cellLeft">
                                            <DeleteButton onClickFunction={() => Commons.confirmDelete("Sei sicuro di voler cancellare il questionario selezionato?", "Si", "No", Constants.DELETE_SURVEYTOKEN_API_URI + item.id, this.deleteSuccess, Commons.operationError)}/>
                                        </this.StyledTableCell>
                                    </this.StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div >
        );
    }
}


export default Question;