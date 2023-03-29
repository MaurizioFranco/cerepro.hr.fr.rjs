import React from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  MenuItem,
} from "@material-ui/core";
import SaveButton from "../../commons/SaveButton.js";
import AddButton from "../../commons/AddButton.js";
import CancelButton from "../../commons/CancelButton.js";
import * as Commons from "../../commons.js";
import * as Constants from "../../constants.js";
import './AddSurveyQuestion.css';

export default class AddSurveyQuestion extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      surveyLabelOptions: [], // opzioni per il primo menu a tendina
      selectedSurveyLabel: "", // valore selezionato dal primo menu a tendina
      questionLabelOptions: [], // opzioni per il secondo menu a tendina
      selectedQuestionLabel: "", // valore selezionato dal secondo menu a tendina
      position: "",
      isModalOpen: false,
    };
    this.gridRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancelSubmit = this.cancelSubmit.bind(this);
    this.addSurveyQuestion = this.addSurveyQuestion.bind(this);
    this.insertSuccess = this.insertSuccess.bind(this);
    // this.insertError = this.insertError.bind(this);
  }

  componentDidMount() {
    // chiamata all'API per ottenere i valori di label dell'entità "survey"
    Commons.executeFetch(
      Constants.FULL_SURVEY_API_URI,
      "GET",
      (data) => {
        const options = [];
        for (let i = 0; i < data.length; i++) {
          options.push({
            value: data[i].label,
            label: data[i].label,
            id: data[i].id,
          });
        }
        this.setState({ surveyLabelOptions: options });
      },
      console.error
    );

    // chiamata all'API per ottenere i valori di label dell'entità "question"
    Commons.executeFetch(
      Constants.FULL_QUESTION_API_URI,
      "GET",
      (data) => {
        const options = [];
        for (let i = 0; i < data.length; i++) {
          options.push({
            value: data[i].label,
            label: data[i].label,
            id: data[i].id,
          });
        }
        this.setState({ questionLabelOptions: options });
      },
      console.error
    );
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const selectedSurveyLabelOption = this.state.surveyLabelOptions.find(
      (option) => option.label === this.state.selectedSurveyLabel
    );
    const selectedQuestionLabelOption = this.state.questionLabelOptions.find(
      (option) => option.label === this.state.selectedQuestionLabel
    );

    const item = {
      surveyId: selectedSurveyLabelOption.id,
      questionId: selectedQuestionLabelOption.id,
      position: parseInt(this.state.position),
    };
    this.addSurveyQuestion(item);
  }

  addSurveyQuestion(item) {
    Commons.executeFetch(
      Constants.FULL_SURVEYQUESTIONS_API_URI,
      "POST",
      this.insertSuccess,
      Commons.operationError,
      JSON.stringify(item),
      true
    );
  }

  // insertError(err) {
  //   console.log("INSERT SURVEY QUESTION KO");
  //   toast.error(err.errorMessage, {
  //     position: toast.POSITION.BOTTOM_LEFT,
  //   });
  //   console.error(err);
  // }

  insertSuccess(response) {
    // console.log("INSERT SURVEY QUESTION SUCCESS");
    // console.log(response);
    // toast.success("Survey question successfully inserted", {
    //   position: toast.POSITION.BOTTOM_LEFT,
    // });
    Commons.operationSuccess(response);
    this.setState({ isModalOpen: false });
    this.props.refreshSurveyQuestionsList();
  }

  cancelSubmit(event) {
    event.preventDefault();
    this.setState({ isModalOpen: false });
  }

  render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.state.isModalOpen}
          onClose={() => this.setState({ isModalOpen: false })}
        >
          <DialogTitle>New Survey Question</DialogTitle>
          <DialogContent>
            <Select
              fullWidth
              label="Survey Label"
              name="selectedSurveyLabel"
              value={this.state.selectedSurveyLabel}
              onChange={this.handleChange}
              style={{ marginBottom: "10px" }}
            >
              {this.state.surveyLabelOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <Select
              fullWidth
              label="Question Label"
              name="selectedQuestionLabel"
              value={this.state.selectedQuestionLabel}
              onChange={this.handleChange}
              style={{ marginBottom: "10px" }}
            >
              {this.state.questionLabelOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <TextField
              fullWidth
              label="Position"
              name="position"
              type="number"
              onChange={this.handleChange}
              style={{ marginBottom: "20px" }}
            />
          </DialogContent>
          <DialogActions>
            <SaveButton
              onClick={this.handleSubmit}
            >
            </SaveButton>
            <CancelButton
              onClick={this.cancelSubmit}
            >
            </CancelButton>
          </DialogActions>
        </Dialog>
        <AddButton
          onClick={() => this.setState({ isModalOpen: true })}
        >
          </AddButton>
      </React.Fragment>
    );
  }
}