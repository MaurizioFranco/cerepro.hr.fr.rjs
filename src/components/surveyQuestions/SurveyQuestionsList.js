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
import AddSurveyQuestions from "./AddSurveyQuestion.js";
import UpdateSurveyQuestions from "./UpdateSurveyQuestions.js";
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

class SurveyQuestionsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      surveyQuestions: [],
      surveyLabels: [],
      sortOrder: "asc",
      sortColumn: "position",
      showArrow: false,
      hideDefaultArrow: false,
    };
  }

  componentDidMount() {
    this.getSurveyQuestions();
    this.getSurveyLabels();
  }

  getSurveyQuestions = () => {
    Commons.executeFetch(
      Constants.FULL_SURVEYQUESTIONCUSTOM_API_URI,
      "GET",
      this.setSurveyQuestions
    );
  };

  setSurveyQuestions = (data) => {
    this.setState({
      surveyQuestions: data,
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
      Constants.FULL_SURVEYQUESTIONS_API_URI + id,
      this.deleteSuccess,
      Commons.operationError
    );
  }

  deleteSuccess = (response) => {
    // console.log("DELETE SURVEY QUESTION SUCCESS");
    // console.log(response);
    // // if (response.status===201) {
    // toast.success("Survey question successfully deleted", {
    //   position: toast.POSITION.BOTTOM_LEFT,
    // });
    Commons.operationSuccess();
    this.getSurveyQuestions();
    // } else {
    // this.insertError (response) ;
    // }
  };

  handleSelectSurveyLabel = (event) => {
    this.setState({ selectedSurveyLabel: event.target.value });
  };

  getSurveyLabels = () => {
    Commons.executeFetch(Constants.FULL_SURVEY_API_URI, "GET", (data) => {
      const labels = data.map((survey) => survey.label);
      this.setState({ surveyLabels: labels });
    });
  };

  sortByPosition = () => {
    const newSortOrder = this.state.sortOrder === "asc" ? "desc" : "asc";
    this.setState({
      surveyQuestions: this.state.surveyQuestions.sort((a, b) =>
        this.state.sortOrder === "asc"
          ? a[this.state.sortColumn] - b[this.state.sortColumn]
          : b[this.state.sortColumn] - a[this.state.sortColumn]
      ),
      sortOrder: newSortOrder,
      sortColumn: "position",
      showArrow: true,
      hideDefaultArrow: true,
    });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className="App">
        {/* <CSVLink data={this.state.candidateStates} separator=";">Export CSV</CSVLink> */}
        <AddSurveyQuestions
          refreshSurveyQuestionsList={this.getSurveyQuestions}
        />
        <TableContainer
          style={{
            paddingLeft: "40px",
            paddingRight: "40px",
            paddingBottom: "140px",
          }}
        >
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="survey table">
              <TableHead>
                <TableRow style={{ backgroundColor: "#333", color: "#fff" }}>
                  <TableCell style={{ color: "#fff" }}>ID</TableCell>
                  <TableCell style={{ color: "#fff" }}>
                    Survey Label
                    <br></br>
                    <div>
                      <select
                        id="survey-label-select"
                        value={this.state.selectedSurveyLabel}
                        onChange={this.handleSelectSurveyLabel}
                      >
                        <option value="">All</option>
                        {this.state.surveyLabels.map((label) => (
                          <option key={label} value={label}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </TableCell>
                  <TableCell style={{ color: "#fff" }}>
                    Question Label
                  </TableCell>
                  <TableCell
                    style={{ color: "#fff", cursor: "pointer" }}
                    onClick={this.sortByPosition}
                  >
                    Position{}
                    {this.state.hideDefaultArrow === false && <span> ↕</span>}
                    {this.state.sortColumn === "position" &&
                      this.state.showArrow &&
                      (this.state.sortOrder === "asc" ? " ↓" : " ↑")}
                  </TableCell>
                  <TableCell style={{ color: "#333" }}></TableCell>
                  <TableCell style={{ color: "#333" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.surveyQuestions
                  .filter(
                    (surveyQuestion) =>
                      !this.state.selectedSurveyLabel ||
                      surveyQuestion.surveyLabel ===
                        this.state.selectedSurveyLabel
                  )
                  .map((surveyQuestion, index) => (
                    <TableRow
                      key={index}
                      className={
                        index % 2 === 0 ? classes.evenRow : classes.oddRow
                      }
                    >
                      <TableCell component="th" scope="row">
                        {surveyQuestion.id}
                      </TableCell>
                      <TableCell>{surveyQuestion.surveyLabel}</TableCell>
                      <TableCell>{surveyQuestion.questionLabel}</TableCell>
                      <TableCell>{surveyQuestion.position}</TableCell>
                      {/* <TableCell>
                    <UpdateSurveyQuestion refreshSurveyQuestionsList={this.getSurveyQuestions} idItemToUpdate={surveyQuestion.id} />
                    </TableCell> */}
                      <TableCell>
                        <UpdateSurveyQuestions refreshSurveyQuestionsList={this.getSurveyQuestions} idItemToUpdate={surveyQuestion.id} oldSurveyPosition={surveyQuestion.position} oldSurveyLabel={surveyQuestion.surveyLabel} oldQuestionLabel={surveyQuestion.questionLabel}></UpdateSurveyQuestions>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => this.confirmDelete(surveyQuestion.id)}
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

export default withStyles(styles)(SurveyQuestionsList);
