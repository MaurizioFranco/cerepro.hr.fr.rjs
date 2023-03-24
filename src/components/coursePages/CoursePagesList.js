import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AddCoursePages from "./AddCoursePage.js";
import UpdateCoursePage from "./UpdateCoursePage.js";
import * as Commons from "../../commons.js";
import * as Constants from "../../constants.js";

import DeleteButton from "../../commons/DeleteButton.js";


const styles = {
  table: {
    minWidth: 650,
  },
  evenRow: {
    backgroundColor: "#fff",
  },
  oddRow: {
    backgroundColor: "#f2f2f2",
  },
};

class CoursePagesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coursePages: [],

    };
  }

  componentDidMount() {
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

  deleteSuccess = (response) => {
    Commons.operationSuccess(response, "Cancellazione posizione avvenuta con successo");
    this.getCoursePages();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        {/* <div style={{ display: "inline"}} >
            <h2 style={{ textAlign: "center"}}>POSIZIONI</h2> */}
            {/* <AddCoursePages refreshCoursePagesList={this.getCoursePages} /> */}
        {/* </div> */}

        {/* <div className="panel-heading">
                        <h1 className="panel-title">
                            <span id="active">POSIZIONI</span>
                            <div className="control-table">

                                
                                <AddCoursePages refreshCoursePagesList={this.getCoursePages} />
                            </div>
                        </h1>
                    </div> */}
        <div class="panel panel-default">
            <h3  style={{ textAlign: "center"}}>Panel title</h3>
            <AddCoursePages refreshCoursePagesList={this.getCoursePages} />
        </div>
        <TableContainer
          style={{
            paddingLeft: "40px",
            paddingRight: "40px",
            paddingBottom: "140px",
          }}
        >
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="course pages table">
              <TableHead>
                <TableRow style={{ backgroundColor: "#333", color: "#fff" }}>
                  <TableCell style={{ color: "#fff" }}>POSIZIONE</TableCell>
                  <TableCell style={{ color: "#fff" }}>CODICE NUMERICO</TableCell>
                  <TableCell style={{ color: "#fff" }}>CODICE ALFANUMERICO</TableCell>
                  <TableCell style={{ color: "#fff" }}>BREVE DESCRIZIONE</TableCell>
                  <TableCell style={{ color: "#fff" }}>HR RESPONSABILE DELLA POSIZIONE</TableCell>
                  <TableCell style={{ color: "#fff" }}>APERTO DA</TableCell>
                  <TableCell style={{ color: "#fff" }}>APERTA IL</TableCell>
                  <TableCell style={{ color: "#333" }}></TableCell>
                  <TableCell style={{ color: "#333" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.coursePages.map((coursePage, index) => (
                  <TableRow
                    key={index}
                    className={
                      index % 2 === 0 ? classes.evenRow : classes.oddRow
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
                    <TableCell>
                      <UpdateCoursePage refreshCoursePagesList={this.getCoursePages} idItemToUpdate={coursePage.id} />
                    </TableCell>
                    <TableCell>
                      <DeleteButton onClickFunction={() => Commons.confirmDelete("Sei sicuro di voler cancellare la posizione " + coursePage.code + "?", "Si", "No", Constants.FULL_COURSEPAGE_API_URI + coursePage.id, this.deleteSuccess, Commons.operationError)}/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TableContainer>
      </div>
    );
  }
}

export default withStyles(styles)(CoursePagesList);