import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Icon
} from "@material-ui/core";
import styles from "../../styles.js";
import AddCoursePages from "./AddCoursePage.js";
import UpdateCoursePage from "./UpdateCoursePage.js";
import * as Commons from "../../commons.js";
import * as Constants from "../../constants.js";
import { CheckCircle } from '@material-ui/icons';

import DeleteButton from "../../commons/DeleteButton.js";
import PageMainTitle from "../../commons/PageMainTitle.js";

export default class CoursePagesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coursePages: [],
    };
  }

  componentDidMount() {
    const hashString = window.location.hash.slice(1);
    const url = new URL(hashString, window.location.href);
    const positionCode = url.searchParams.get("positionCode");
    if (positionCode) {
      this.setState({positionCode:positionCode})
    } 
    this.getCoursePages();
  }

  getCoursePages = () => {
    Commons.executeFetch(
      Constants.COURSEPAGE_CUSTOM_API,
      "GET",
      this.setCoursePages
    );
  };

  setCoursePages = (data) => {
    console.log("ecco i miei dati " + JSON.stringify(data))
    this.setState({
      coursePages: data,
    });
  };

setTime = (expirationDateTime) => {
    if (expirationDateTime != null) {
      const expirationTime = new Date(expirationDateTime)
      const date = expirationTime.toLocaleDateString();
      const time = expirationTime.toLocaleTimeString();
      const separator = ' ';
      return `${date}${separator}${time}`;
    } else {
      return expirationDateTime
    }
  }

  setStatusOpen = (statusOpen) => {
    if(statusOpen === true){
      return <Icon color="secondary"><CheckCircle /></Icon>;
    }else{
      return <Icon color="disabled"><CheckCircle /></Icon>;
    }
  }

  deleteSuccess = (response) => {
    Commons.operationSuccess(response, "Cancellazione posizione avvenuta con successo");
    this.getCoursePages();
  };

  render() {
    return (
      <div style={styles.divContainer} className="App">
        <div class="panel panel-default">
          <PageMainTitle text={"POSIZIONI"} />
          <AddCoursePages refreshCoursePagesList={this.getCoursePages} />
        </div>
        <TableContainer component={Paper}>
          <Table className={"table-style"}>
            <TableHead>
              <TableRow className={"table-head-row"}>
                <TableCell style={{ color: "#fff" }}>POSIZIONE</TableCell>
                <TableCell style={{ color: "#fff" }}>CODICE NUMERICO</TableCell>
                <TableCell style={{ color: "#fff" }}>CODICE ALFANUMERICO</TableCell>
                <TableCell style={{ color: "#fff" }}>BREVE DESCRIZIONE</TableCell>
                <TableCell style={{ color: "#fff" }}>HR RESPONSABILE DELLA POSIZIONE</TableCell>
                <TableCell style={{ color: "#fff" }}>APERTO DA</TableCell>
                <TableCell style={{ color: "#fff" }}>APERTA IL</TableCell>
                <TableCell style={{ color: "#fff" }}>STATO</TableCell>
                <TableCell style={{ color: "#333" }}></TableCell>
                <TableCell style={{ color: "#333" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.coursePages.map((coursePage, index) => (
                  <TableRow
                    key={index}
                    className={
                      index % 2 === 0 ? "table-style-even-row" : "table-style-odd-row"
                    }
                  >
                    <TableCell>{coursePage.title}</TableCell>
                    <TableCell component="th" scope="row">
                      {coursePage.id}
                    </TableCell>
                    <TableCell>{coursePage.code}</TableCell>
                    <TableCell>{coursePage.bodyText}</TableCell>
                    <TableCell>{coursePage.coursePageOwnerFirstname !== "null" ? coursePage.coursePageOwnerFirstname : ""} {coursePage.coursePageOwnerLastname !== "null" ? coursePage.coursePageOwnerLastname : ""}</TableCell>
                    <TableCell>{coursePage.coursePageFirstNameOpenedBy} {coursePage.coursePageLastNameOpenedBy}</TableCell>
                    <TableCell>{this.setTime(coursePage.created_datetime)}</TableCell>
                    <TableCell>{this.setStatusOpen(coursePage.statusOpen)}</TableCell>
                    <TableCell>
                      <UpdateCoursePage refreshCoursePagesList={this.getCoursePages} coursePage={coursePage}/>
                    </TableCell>
                    <TableCell>
                      <DeleteButton onClickFunction={() => Commons.confirmDelete("Sei sicuro di voler cancellare la posizione " + coursePage.code + "?", "Si", "No", Constants.FULL_COURSEPAGE_API_URI + coursePage.id, this.deleteSuccess, Commons.operationError)}/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </div>
    );
  }
}