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
import { Button, IconButton } from "@material-ui/core";

import reload from "../../images/reload.png";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddQuestion from './AddQuestion';
import { event } from 'jquery';
import SurveyPdfLink from './SurveyPdfLink';


class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {
            expiredSurveys: [],
            executedSurveys: [],
            activeAndValidSurveys: [],
            selectedValueExpired: '5',
            regeneratedPdf: ''
        }
        this.reloadData = this.reloadData.bind(this);
    }

    fetchUserExpired = (value) => {
        Commons.executeFetch(Constants.FULL_SURVEYTOKEN_API_URI + 'expired/' + value + '/0/', 'GET', this.setUserExpired);
    }

    fetchActiveAndValidSurveys = () => {
        Commons.executeFetch(Constants.FULL_SURVEYTOKEN_API_URI + 'active/', 'GET', this.setActiveAndValidSurveys);
    }

    fetchExecutedSurveys = () => {
        Commons.executeFetch(Constants.FULL_SURVEYTOKEN_API_URI + 'executed/', 'GET', this.setExecutedSurveys);
    }

    fetchDelete = (value) => {
        Commons.executeDelete(Constants.DELETE_SURVEYTOKEN_API_URI + value, this.deleteSuccess, Commons.operationError);
    }

    fetchSendQuestion = (id) => {
        Commons.executeFetch(Constants.FULL_ST_SENDEMAIL_API_URI + id, 'GET', Commons.operationSuccess, Commons.operationError);
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
        this.setState({ expiredSurveys: userExpiredToSet.content });
        console.log("USER EXPIRED == " + this.state.expiredSurveys);
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

    handleChangeExpired = (event) => {
        const { value } = event.target;
        this.setState({ selectedValueExpired: value }, () => {
            console.log(this.state.selectedValueExpired);
            this.fetchUserExpired(this.state.selectedValueExpired);
        });
    }

    sendQuestion = (event) => {
        const id = event.target.dataset.id;
        this.fetchSendQuestion(id);
    }

    handleDelete = (event) => {
        const id = event.currentTarget.dataset.id;
        this.fetchDelete(id)
    }

    reloadData() {
        console.log("sto chiamando il reload dal register")
        this.fetchUserExpired(this.state.selectedValueExpired);
        this.fetchActiveAndValidSurveys();
        this.fetchExecutedSurveys();
    }

    componentDidMount() {
        this.reloadData()
    }

    generateSuccess = () => {
        toast.success("PDF regenerated", {
            position: toast.POSITION.BOTTOM_LEFT,
        });
    }

    generateFailed = () => {
        toast.error("PDF failed to regenerate, contact the administration", {
            position: toast.POSITION.BOTTOM_LEFT,
        });
    }

    regeneratePdf = (surveyReplyId) => {
        // Commons.executeFetch(Constants.FULL_PDF_END + surveyReplyId, 'POST', this.sendError);
        // console.log("regeneratePDf started")
        // console.log("surveyReplyId: ")
        // console.log(surveyReplyId)
        // let token = sessionStorage.getItem('headerToken');
        // console.log("token: " + token)
        Commons.executeFetch(Constants.FULL_PDF_END + surveyReplyId, 'POST', this.generateSuccess, this.generateFailed)
        // fetch(Constants.FULL_PDF_END + surveyReplyId,
        //     {
        //         method: 'POST',
        //         headers: {'Authorization':token}
        //     }
        // )
        //     .then(response => response.json())
        //     .then( responseData => {
        //         console.log(responseData)
        //         toast.error( ("Fatto!"), {
        //             position: toast.POSITION.BOTTOM_LEFT
        //         })})
        //     .catch(err => {
        //         console.log(err)
        //         toast.error(err, {
        //             position: toast.POSITION.BOTTOM_LEFT
        //         })}
        //         );
    }

    render() {
        return (
            <div>
                <div style={{ padding: "10px" }}>
                    <div className="panel-heading">
                        <h1 className="panel-title">
                            <span id="active">Questionari ancora da compilare</span>
                            <div className="control-table">
                                
                                <button id="reload" onClick={this.reloadData}>
                                    <img src={reload} alt="Reload" style={{ marginRight: "50px" }} />
                                </button>
                                <AddQuestion refreshSurveysList={this.reloadData} />
                            </div>
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
                                            <Button id="buttonDelete" data-id={item.id} onClick={this.handleDelete}>Delete</Button>
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
                                        
                                        {/* {item.urlPdf !== null && item.urlPdf !== 0 && item.urlPdf !== undefined  ?
                                            
                                            <this.StyledTableCell align='left'>
                                                <SurveyPdfLink pdffilename={item.urlPdf}/>
                                            </this.StyledTableCell>
                                            : null
                                        } */}
                                      
                                        <this.StyledTableCell align='left'>
                                            <SurveyPdfLink pdffilename={item.urlPdf}/>
                                        </this.StyledTableCell>
                                        
                                        <this.StyledTableCell align="left">
                                            <Button  onClick={() => this.regeneratePdf(item.surveyReplyId)}>Rigenera PDF</Button>
                                        </this.StyledTableCell>
                                        
                                        <this.StyledTableCell id="cellLeft">
                                            <Button id="buttonDelete" data-id={item.id} onClick={this.handleDelete}>Delete</Button>
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
                            <div className="control-table">
                                <label id="labelQuestion">Visualizza</label>
                                <select value={this.selectedValueExpired} onChange={this.handleChangeExpired}>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                                <label id="labelQuestion">Questionari</label>
                            </div>
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
                                {this.state.expiredSurveys.map((item) => (
                                    <this.StyledTableRow key={item.id}>
                                        <this.StyledTableCell align="left">{item.email}</this.StyledTableCell>
                                        <this.StyledTableCell align="left">{item.firstname}</this.StyledTableCell>
                                        <this.StyledTableCell align="left">{item.lastname}</this.StyledTableCell>
                                        <this.StyledTableCell align="left">{item.surveyLabel}</this.StyledTableCell>
                                        <this.StyledTableCell align="left">{this.setTime(item.expirationDateTime)}</this.StyledTableCell>
                                        {console.log("### GENERATED TOKEN: ### " + item.generatedToken)}
                                        
                                        {/* {item.urlPdf !== null && item.urlPdf !== 0 && item.urlPdf !== undefined  ?
                                            
                                            <this.StyledTableCell align='left'>
                                                <SurveyPdfLink pdffilename={item.urlPdf}/>
                                            </this.StyledTableCell>
                                            : null
                                        } */}
                                      
                                        <this.StyledTableCell align='left'>
                                            <SurveyPdfLink pdffilename={item.urlPdf}/>
                                        </this.StyledTableCell>
                                        
                                        <this.StyledTableCell align="left">
                                            <Button  onClick={() => this.regeneratePdf(item.surveyReplyId)}>Rigenera PDF</Button>
                                        </this.StyledTableCell>
                                        
                                        <this.StyledTableCell id="cellLeft">
                                            <Button id="buttonDelete" data-id={item.id} onClick={this.handleDelete}>Delete</Button>
                                        </this.StyledTableCell>
                                    </this.StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <ToastContainer autoClose={2500} />
            </div >
        );
    }
}


export default Question;