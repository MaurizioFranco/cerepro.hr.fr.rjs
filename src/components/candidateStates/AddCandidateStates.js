import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
//import SkyLight from 'react-skylight';

import "react-toastify/dist/ReactToastify.css";

import * as Commons from "../../commons.js";
import * as Constants from "../../constants.js";

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
      <div>
        <Dialog
          open={this.state.isModalOpen}
          onClose={() => this.setState({ isModalOpen: false })}
        >
          <DialogTitle>New Candidate State</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Status Code"
              name="statusCode"
              onChange={this.handleChange}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Status Label"
              name="statusLabel"
              onChange={this.handleChange}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Status Description"
              name="statusDescription"
              onChange={this.handleChange}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Status Color"
              name="statusColor"
              onChange={this.handleChange}
              style={{ marginBottom: "20px" }}
            />
          </DialogContent>
          <DialogActions>
          <Button
              onClick={this.handleSubmit}
              style={{ marginRight: "14px" }}
              color="primary"
            >
              Save
            </Button>
            <Button 
              onClick={this.cancelSubmit}
              style={{ margin: "7px" }}
              color="secondary"
            >
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <div>
          <Button
            variant="contained"
            style={{
              marginRight: "40px",
              marginBottom: "40px",
              backgroundColor: "green",
              color: "#fff",
              float: "right",
            }}
            onClick={() => this.setState({ isModalOpen: true })}
          >
            +
          </Button>
        </div>
      </div>
    );
  }
}

export default AddCandidateStates;
