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
import reload from "../../images/reload.png";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddQuestion from './AddQuestion';


class Question extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usersExipred: [],
            usersActive: [],
            selectedValueExpired: '5',
            selectedValueActive: '5',
        }
        this.reloadData = this.reloadData.bind(this);
    }

    fetchUserExpired = (value) => {
        Commons.executeFetch(Constants.FULL_SURVEYTOKEN_API_URI + 'expired/' + value + '/0/', 'GET', this.setUserExpired);
    }

    fetchUserActive = (value) => {
        Commons.executeFetch(Constants.FULL_SURVEYTOKEN_API_URI + 'active/' + value + '/0/', 'GET', this.setUserActive);
    }

    fetchDelete = (value) => {
        Commons.executeDelete(Constants.DELETE_SURVEYTOKEN_API_URI + value, this.deleteSuccess, Commons.operationError);
    }

    fetchSendQuestion = (id) => {
        Commons.executeFetch(Constants.FULL_ST_SENDEMAIL_API_URI + id, 'GET', this.sendSuccess, this.sendError);
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
        // console.log("DELETE Candidates SUCCESS");
        toast.success("Delete successfully", {
            position: toast.POSITION.BOTTOM_LEFT,
        });
        this.reloadData();
    }

    setUserExpired = (userExpiredToSet) => {
        Commons.debugMessage("userExpiredToSet - START - userExpiredToSet: " + userExpiredToSet);
        this.setState({ usersExipred: userExpiredToSet.content });
        console.log("USER EXPIRED == " + this.state.usersExipred);
    }

    setUserActive = (userActiveToSet) => {
        Commons.debugMessage("userActiveToSet - START - userActiveToSet: " + userActiveToSet);
        this.setState({ usersActive: userActiveToSet.content });
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

    handleChangeActive = (event) => {
        const { value } = event.target;
        this.setState({ selectedValueActive: value }, () => {
            console.log(this.state.selectedValueActive);
            this.fetchUserActive(this.state.selectedValueActive);
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
        this.fetchUserExpired(this.state.selectedValueExpired);
        this.fetchUserActive(this.state.selectedValueActive);
    }

    componentDidMount() {
        this.reloadData()
    }

    render() {
        return (
            <div>
                <div style={{ padding: "10px" }}>
                    <div className="panel-heading">
                        <h1 className="panel-title">
                            <span id="active">Lista questionari ancora da compilare</span>
                            <div className="control-table">
                                <label id="labelQuestion">Visualizza</label>
                                <select value={this.selectedValueActive} onChange={this.handleChangeActive}>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="50">50</option>
                                    <option value="100">100</option>
                                </select>
                                <label id="labelQuestion">Questionari</label>
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
                                {this.state.usersActive.map((user) => (
                                    <this.StyledTableRow key={user.id}>
                                        <this.StyledTableCell align="left">{user.email}</this.StyledTableCell>
                                        <this.StyledTableCell align="left">{user.firstname}</this.StyledTableCell>
                                        <this.StyledTableCell align="left">{user.lastname}</this.StyledTableCell>
                                        <this.StyledTableCell align="left">{user.surveyLabel}</this.StyledTableCell>
                                        <this.StyledTableCell align="left">{this.setTime(user.expirationDateTime)}</this.StyledTableCell>
                                        <this.StyledTableCell id="cellRight">
                                            <Button id="buttonDelete" data-id={user.id} onClick={this.handleDelete}>Delete</Button>
                                        </this.StyledTableCell>
                                        <this.StyledTableCell id="cellRight">
                                            <button type="button" className="btn btn-success custom-width" data-id={user.id} onClick={this.sendQuestion}>Invia Questionario</button>
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
                                {this.state.usersExipred.map((user) => (
                                    <this.StyledTableRow key={user.id}>
                                        <this.StyledTableCell align="left">{user.email}</this.StyledTableCell>
                                        <this.StyledTableCell align="left">{user.firstname}</this.StyledTableCell>
                                        <this.StyledTableCell align="left">{user.lastname}</this.StyledTableCell>
                                        <this.StyledTableCell align="left">{user.surveyLabel}</this.StyledTableCell>
                                        <this.StyledTableCell align="left">{this.setTime(user.expirationDateTime)}</this.StyledTableCell>
                                        <this.StyledTableCell id="cellRight">
                                            <Button id="buttonDelete" data-id={user.id} onClick={this.handleDelete}>Delete</Button>
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