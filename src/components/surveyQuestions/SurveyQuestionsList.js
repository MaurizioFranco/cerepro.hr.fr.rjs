import React, { Component } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";
import styles from '../../styles';
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AddSurveyQuestions from "./AddSurveyQuestion.js";
import UpdateSurveyQuestions from "./UpdateSurveyQuestions.js";
import * as Commons from "../../commons.js";
import * as Constants from "../../constants.js";

import DeleteButton from "../../commons/DeleteButton.js";
import PageMainTitle from "../../commons/PageMainTitle.js";


import './SurveyQuestionsList.css';

export default class SurveyQuestionsList extends Component {
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
    Commons.operationSuccess(response);
    this.getSurveyQuestions();
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
    return (
      <div style={styles.divContainer} className="App">
        <div class="panel panel-default">
					<PageMainTitle text={"QUESTIONARI COMPLETI (CON COLLEGAMENTO ALLE SINGOLE DOMANDE)"} />
          <AddSurveyQuestions refreshCoursePagesList={this.getSurveyQuestions} />
				</div>
        <TableContainer component={Paper}>
          <Table className={"table-style"}>
						<TableHead>
							<TableRow className={"table-head-row"}>               
                  <TableCell style={{ color: "#fff" }}>&nbsp;</TableCell>
                  <TableCell style={{ color: "#fff" }}>
                    TITOLO QUESTIONARIO
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
                      TITOLO DOMANDA
                  </TableCell>
                  <TableCell
                    style={{ color: "#fff", cursor: "pointer" }}
                    onClick={this.sortByPosition}
                  >
                    POSIZIONE DELLA DOMANDA ALL'INTERNO DEL QUESTIONARIO{}
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
                        index % 2 === 0 ? "table-style-even-row" : "table-style-odd-row"
                      }
                    >
                      <TableCell component="th" scope="row">
                        {surveyQuestion.id}
                      </TableCell>
                      <TableCell>{surveyQuestion.surveyLabel}</TableCell>
                      <TableCell>{surveyQuestion.questionLabel}</TableCell>
                      <TableCell>{surveyQuestion.position}</TableCell>
                      <TableCell>
                        <UpdateSurveyQuestions refreshSurveyQuestionsList={this.getSurveyQuestions} idItemToUpdate={surveyQuestion.id} oldSurveyPosition={surveyQuestion.position} oldSurveyLabel={surveyQuestion.surveyLabel} oldQuestionLabel={surveyQuestion.questionLabel}></UpdateSurveyQuestions>
                      </TableCell>
                      <TableCell>
                        <DeleteButton onClickFunction={() => this.confirmDelete(surveyQuestion.id)}/>
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
