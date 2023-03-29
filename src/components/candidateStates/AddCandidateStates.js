import React from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import styles from "../../styles.js";
import AddButton from "../../commons/AddButton.js";
import SaveButton from "../../commons/SaveButton.js";
import CancelButton from "../../commons/CancelButton.js";

import "react-toastify/dist/ReactToastify.css";

import * as Commons from "../../commons.js";
import * as Constants from "../../constants.js";

import './AddCandidateStates.css';

class AddCandidateStates extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roleId: props.roleId || 4,
      statusCode: "",
      statusLabel: "",
      statusDescription: "",
      statusColor: "",
    };
    this.gridRef = React.createRef();
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    var item = {
      roleId: this.state.roleId,
      statusCode: this.state.statusCode,
      statusLabel: this.state.statusLabel,
      statusDescription: this.state.statusDescription,
      statusColor: this.state.statusColor,
    };
    this.addCandidateState(item);
  };

  addCandidateState(item) {
    Commons.executeFetch(
      Constants.FULL_CANDIDATE_STATES_API_URI,
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
    this.props.refreshCandidateStatesList();
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
          <DialogTitle>INSERISCI UN NUOVO STATO CANDIDATURA</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Status Code"
              name="statusCode"
              onChange={this.handleChange}
              style={styles.field}
            />
            <TextField
              fullWidth
              label="Status Label"
              name="statusLabel"
              onChange={this.handleChange}
              style={styles.field}
            />
            <TextField
              fullWidth
              label="Status Description"
              name="statusDescription"
              onChange={this.handleChange}
              style={styles.field}
            />
            <TextField
              fullWidth
              label="Status Color"
              name="statusColor"
              onChange={this.handleChange}
              style={styles.fieldBeforeButtons}
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
export default AddCandidateStates;