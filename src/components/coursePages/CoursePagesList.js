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

  confirmDelete = (id) => {
    confirmAlert({
      message: "Are you sure to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.deleteItem(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  deleteItem(id) {
    Commons.executeDelete(
      Constants.FULL_COURSEPAGE_API_URI + id,
      this.deleteSuccess,
      Commons.operationError
    );
  }

  deleteSuccess = (response) => {
    Commons.operationSuccess(response, "Cancellazione posizione avvenuta con successo");
    this.getCoursePages();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <AddCoursePages refreshCoursePagesList={this.getCoursePages} />
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
                  <TableCell style={{ color: "#fff" }}>ID</TableCell>
                  <TableCell style={{ color: "#fff" }}>Title</TableCell>
                  <TableCell style={{ color: "#fff" }}>Code</TableCell>
                  <TableCell style={{ color: "#fff" }}>Body Text</TableCell>
                  <TableCell style={{ color: "#fff" }}>Owner</TableCell>
                  <TableCell style={{ color: "#fff" }}>Opened_By</TableCell>
                  <TableCell style={{ color: "#fff" }}>InsertedTime</TableCell>
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
                    <TableCell component="th" scope="row">
                      {coursePage.id}
                    </TableCell>
                    <TableCell>{coursePage.title}</TableCell>
                    <TableCell>{coursePage.code}</TableCell>
                    <TableCell>{coursePage.bodyText}</TableCell>
                    <TableCell>{coursePage.coursePageOwnerFirstname !== "null" ? coursePage.coursePageOwnerFirstname : ""} {coursePage.coursePageOwnerLastname !== "null" ? coursePage.coursePageOwnerLastname : ""}</TableCell>
                    <TableCell>{coursePage.coursePageFirstNameOpenedBy} {coursePage.coursePageLastNameOpenedBy }</TableCell>
                    <TableCell>{coursePage.created_datetime}</TableCell>
                    <TableCell>
                    <UpdateCoursePage refreshCoursePagesList={this.getCoursePages} idItemToUpdate={coursePage.id} />
                    </TableCell>
                    <TableCell>
                      <DeleteButton onClickFunction={() => this.confirmDelete(coursePage.id)}/>
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