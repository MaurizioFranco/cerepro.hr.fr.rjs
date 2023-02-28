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
import AddSurvey from "./AddSurvey.js";
import UpdateSurvey from "./UpdateSurvey.js";
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

class SurveysList extends Component {
  constructor(props) {
    super(props);
    this.state = { surveys: [] };
  }

  componentDidMount() {
    this.getSurveys();
  }

  getSurveys = () => {
    Commons.executeFetch(
      Constants.FULL_SURVEY_API_URI,
      "GET",
      this.setSurveys
    );
  };

  setSurveys = (data) => {
    this.setState({
      surveys: data,
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
      Constants.FULL_SURVEY_API_URI + id,
      this.deleteSuccess,
      Commons.operationError
    );
  }

  deleteSuccess = (response) => {
    console.log("DELETE SURVEY SUCCESS");
    console.log(response);
    // if (response.status===201) {
    toast.success("Survey successfully deleted", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    this.getSurveys();
    // } else {
    // this.insertError (response) ;
    // }
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        {/* <CSVLink data={this.state.candidateStates} separator=";">Export CSV</CSVLink> */}
        <AddSurvey refreshSurveysList={this.getSurveys} />
        <TableContainer
          style={{
            paddingLeft: "40px",
            paddingRight: "40px",
            paddingBottom: "140px",
          }}
        >
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="Survey table">
              <TableHead>
                <TableRow style={{ backgroundColor: "#333", color: "#fff" }}>
                  <TableCell style={{ color: "#fff" }}>ID</TableCell>
                  <TableCell style={{ color: "#fff" }}>Label</TableCell>
                  <TableCell style={{ color: "#fff" }}>Time</TableCell>
                  <TableCell style={{ color: "#fff" }}>Description</TableCell>
                  <TableCell style={{ color: "#333" }}></TableCell>
                  <TableCell style={{ color: "#333" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.surveys.map((survey, index) => (
                  <TableRow
                    key={index}
                    className={
                      index % 2 === 0 ? classes.evenRow : classes.oddRow
                    }
                  >
                    <TableCell component="th" scope="row">
                      {survey.id}
                    </TableCell>
                    <TableCell>{survey.label}</TableCell>
                    <TableCell>{survey.time}</TableCell>
                    <TableCell>{survey.description}</TableCell>
                    <TableCell>
                    <UpdateSurvey refreshSurveysList={this.getSurveys} idItemToUpdate={survey.id} />
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => this.confirmDelete(survey.id)}
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

export default withStyles(styles)(SurveysList);