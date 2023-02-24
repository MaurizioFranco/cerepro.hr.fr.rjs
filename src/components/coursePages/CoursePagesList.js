import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@material-ui/core";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AddCoursePages from "./AddCoursePage.js";
import * as Commons from "../../commons.js";
import * as Constants from "../../constants.js";

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
    this.state = { coursePages: [] };
  }

  componentDidMount() {
    this.getCoursePages();
  }

  getCoursePages = () => {
    Commons.executeFetch(
      Constants.FULL_COURSEPAGE_API_URI,
      "GET",
      this.setCoursePages
    );
  };

  setCoursePages = (data) => {
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
    console.log("DELETE COURSE PAGE SUCCESS");
    console.log(response);
    // if (response.status===201) {
    toast.success("Course page successfully deleted", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    this.getCoursePages();
    // } else {
    // this.insertError (response) ;
    // }
  };

  updateCoursePage(coursePage, id) {
    // console.log(coursePage);
    // const itemToUpdate = {...coursePage};
    // itemToUpdate.id = id ;
    // fetch(BACKEND_APPLICATION_ROOT + 'v1/coursePages',
    //     {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(itemToUpdate)
    //     })
    //     .then(res =>
    //         toast.success("Changes saved", {
    //             position: toast.POSITION.BOTTOM_LEFT
    //         })
    //     )
    //     .catch(err =>
    //         toast.error("Error when saving", {
    //             position: toast.POSITION.BOTTOM_LEFT
    //         })
    //     )
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        {/* <CSVLink data={this.state.candidateStates} separator=";">Export CSV</CSVLink> */}
        <AddCoursePages refreshCoursePagesList={this.getCoursePages} />
        <br></br>
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
                    <TableCell>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          this.updateCoursePage(coursePage, coursePage.id)
                        }
                      >
                        Edit
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => this.confirmDelete(coursePage.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TableContainer>
        <ToastContainer autoClose={1500} />
      </div>
    );
  }
}

export default withStyles(styles)(CoursePagesList);