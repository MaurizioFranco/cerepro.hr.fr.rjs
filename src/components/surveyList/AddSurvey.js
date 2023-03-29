import React from "react";
import * as Commons from "../../commons.js";
import * as Constants from "../../constants.js";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import AddButton from "../../commons/AddButton.js";
import CancelButton from "../../commons/CancelButton.js";
import SaveButton from "../../commons/SaveButton.js";

import './AddSurvey.css';

export default class AddSurvey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      label: "",
      time: "",
      description: "",
      isModalOpen: false,
    };
    this.gridRef = React.createRef();
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    var item = {
      label: this.state.label,
      time: this.state.time,
      description: this.state.description,
    };
    this.addSurvey(item);
  };

  addSurvey(item) {
    Commons.executeFetch(
      Constants.FULL_SURVEY_API_URI,
      "POST",
      this.insertSuccess,
      Commons.operationError,
      JSON.stringify(item),
      true
    );
  }

  insertSuccess = (response) => {
    Commons.operationSuccess();
    this.setState({ isModalOpen: false });
    this.props.refreshSurveysList();
  };

  cancelSubmit = (event) => {
    event.preventDefault();
    this.setState({ isModalOpen: false });
  };

  render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.state.isModalOpen}
          onClose={() => this.setState({ isModalOpen: false })}
        >
          <DialogTitle>INSERISCI UN NUOVO QUESTIONARIO</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Label"
              name="label"
              value={this.state.label}
              onChange={this.handleChange}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Time"
              name="time"
              type="number"
              value={this.state.time}
              onChange={this.handleChange}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={this.state.description}
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