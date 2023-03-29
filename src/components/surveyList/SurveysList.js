import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";
import DeleteButton from "../../commons/DeleteButton.js";
import styles from "../../styles.js";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AddSurvey from "./AddSurvey.js";
import UpdateSurvey from "./UpdateSurvey.js";
import * as Commons from "../../commons.js";
import * as Constants from "../../constants.js";
import PageMainTitle from "../../commons/PageMainTitle.js";

export default class SurveysList extends Component {
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
    Commons.operationSuccess();
    this.getSurveys();
  };

  render() {
    return (
      <div style={styles.divContainer} className="App">
        <div class="panel panel-default">
          <PageMainTitle text={"QUESTIONARI"} />
          <AddSurvey refreshCoursePagesList={this.getSurveys} />
        </div>
        <TableContainer component={Paper}>
          <Table className={"table-style"}>
            <TableHead>
              <TableRow className={"table-head-row"}>

                <TableCell style={{ color: "#fff" }}>&nbsp;</TableCell>
                <TableCell style={{ color: "#fff" }}>TITOLO</TableCell>
                <TableCell style={{ color: "#fff" }}>TEMPO DI ESECUZIONE (in minuti)</TableCell>
                <TableCell style={{ color: "#fff" }}>DESCRIZIONE</TableCell>
                <TableCell style={{ color: "#333" }}></TableCell>
                <TableCell style={{ color: "#333" }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.surveys.map((survey, index) => (
                <TableRow
                  key={index}
                  className={
                    index % 2 === 0 ? "table-style-even-row" : "table-style-odd-row"
                  }
                >
                  <TableCell component="th" scope="row">
                    {survey.id}
                  </TableCell>
                  <TableCell>{survey.label}</TableCell>
                  <TableCell>{survey.time}</TableCell>
                  <TableCell>{survey.description}</TableCell>
                  <TableCell>
                    <UpdateSurvey idItemToUpdate={survey.id} updateSurvey={this.getSurveys} />
                  </TableCell>
                  <TableCell>
                    <DeleteButton
                      onClick={() => this.confirmDelete(survey.id)}
                    >
                      </DeleteButton>
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