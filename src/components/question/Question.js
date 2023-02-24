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
import { Link } from "react-router-dom";



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

    deleteSuccess = () => {
        console.log("DELETE COURSE PAGE SUCCESS");
        this.fetchUserExpired(this.state.selectedValueExpired);
        this.fetchUserActive(this.state.selectedValueActive);
    }

    setUserExpired = (userExpiredToSet) => {
        Commons.debugMessage("userExpiredToSet - START - userExpiredToSet: " + userExpiredToSet);
        this.setState({ usersExipred: userExpiredToSet.content });
        console.log(this.state.usersExipred);
    }

    setUserActive = (userActiveToSet) => {
        Commons.debugMessage("userActiveToSet - START - userActiveToSet: " + userActiveToSet);
        this.setState({ usersActive: userActiveToSet.content });
        console.log(this.state.usersActive);
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

    handleDelete = (event) => {
        const id = event.target.dataset.id;
        console.log(id)
        this.fetchDelete(id)
        // this.fetchUserExpired(this.state.selectedValueExpired);
        // this.fetchUserActive(this.state.selectedValueActive);
    }

    reloadData(){
        this.fetchUserExpired(this.state.selectedValueExpired);
        this.fetchUserActive(this.state.selectedValueActive);
    }

    componentDidMount() {
        this.reloadData()
    }

    render() {
        return (
            <div>
                <div class="container-lg">
                    <div class="panel-heading">
                        <h1 class="panel-title">
                            Lista questionari ancora da compilare
                            <div class="control-table" align="right">
                                <button style={{ marginRight: "10px" }} onClick={this.reloadData}>RELOAD</button>
                                <Link to="/registerQuestion" >+</Link>
                            </div>
                        </h1>
                    </div>
                    <div>
                        <label>Visualizza</label>
                        <select select value={this.selectedValueActive} onChange={this.handleChangeActive}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        <label style={{ marginLeft: "10px" }}>Questionari</label>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <this.StyledTableCell align="left">Email</this.StyledTableCell>
                                    <this.StyledTableCell align="left">Name</this.StyledTableCell>
                                    <this.StyledTableCell align="left">Lastname</this.StyledTableCell>
                                    <this.StyledTableCell align="left">Question</this.StyledTableCell>
                                    <this.StyledTableCell align="left">Expirationdate</this.StyledTableCell>
                                    <this.StyledTableCell align="left"></this.StyledTableCell>
                                    <this.StyledTableCell align="left"></this.StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.usersActive.map((user) => (
                                    <this.StyledTableRow key={user.id}>
                                        <this.StyledTableCell align="left">{user.email}</this.StyledTableCell>
                                        <this.StyledTableCell align="left">{user.firstname}</this.StyledTableCell>
                                        <this.StyledTableCell align="left">{user.lastname}</this.StyledTableCell>
                                        <this.StyledTableCell align="left">{user.surveyLabel}</this.StyledTableCell>
                                        <this.StyledTableCell align="left">{user.expirationdate}</this.StyledTableCell>
                                        <this.StyledTableCell>
                                            <button type="button" class="btn btn-danger custom-width" data-id={user.id} onClick={this.handleDelete}>Delete</button>
                                        </this.StyledTableCell>
                                        <this.StyledTableCell>
                                            <button type="button" class="btn btn-success custom-width">Invia Questionario</button>
                                        </this.StyledTableCell>
                                    </this.StyledTableRow>
                                ))}

                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
                <br>
                </br>
                <div class="container-lg">
                    <div class="panel-heading">
                        <h1 class="panel-title">
                            Lista questionari scaduti
                        </h1>
                    </div>
                    <div>
                        <label>Visualizza</label>
                        <select value={this.selectedValueExpired} onChange={this.handleChangeExpired}>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                        </select>
                        <label style={{ marginLeft: "10px" }}>Questionari</label>
                    </div>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 700 }} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <this.StyledTableCell align="left">Email</this.StyledTableCell>
                                    <this.StyledTableCell align="left">Name</this.StyledTableCell>
                                    <this.StyledTableCell align="left">Lastname</this.StyledTableCell>
                                    <this.StyledTableCell align="left">Question</this.StyledTableCell>
                                    <this.StyledTableCell align="left">Expirationdate</this.StyledTableCell>
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
                                        <this.StyledTableCell align="left">{user.expirationdate}</this.StyledTableCell>
                                        <this.StyledTableCell align="left">
                                            <button type="button" class="btn btn-danger custom-width" data-id={user.id} onClick={this.handleDelete}>Delete</button>
                                        </this.StyledTableCell>
                                    </this.StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        );
    }
}


export default Question;