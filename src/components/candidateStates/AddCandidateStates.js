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

import { toast } from "react-toastify";
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

  // Save candidate state and close modal form
  handleSubmit = (event) => {
    event.preventDefault();
    var item = {
      roleId: this.state.roleId,
      statusCode: this.state.statusCode,
      statusLabel: this.state.statusLabel,
      statusDescription: this.state.statusDescription,
      statusColor: this.state.statusColor,
    };
    // const formData = new FormData();
    // formData.append("firstname", this.state.firstname);
    // formData.append("lastname", this.state.lastname);
    // formData.append("email", this.state.email);
    // formData.append("password", this.password );
    // console.log(item);
    this.addCandidateState(item);
  };

  addCandidateState(item) {
    Commons.executeFetch(
      Constants.FULL_CANDIDATE_STATES_API_URI,
      "POST",
      this.insertSuccess,
      this.insertError,
      JSON.stringify(item),
      true
    );
  }

  insertError = (err) => {
    console.log("INSERT CANDIDATE STATE KO");
    toast.error(err.errorMessage, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    console.error(err);
  };

  insertSuccess = (response) => {
    console.log("INSERT CANDIDATE STATE SUCCESS");
    console.log(response);
    toast.success("Course Page successfully inserted", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    this.setState({ isModalOpen: false });
    this.props.refreshCandidateStatesList();
  };

  cancelSubmit = (event) => {
    event.preventDefault();
    this.setState({ isModalOpen: false });
  };

  render() {
    const marginBottom = { marginBottom: "7px" };
    const marginRight = { marginRight: "14px" };
    const moreMarginBottom = { marginBottom: "28px" };
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
              style={marginBottom}
            />
            <TextField
              fullWidth
              label="Status Label"
              name="statusLabel"
              onChange={this.handleChange}
              style={marginBottom}
            />
            <TextField
              fullWidth
              label="Status Description"
              name="statusDescription"
              onChange={this.handleChange}
              style={marginBottom}
            />
            <TextField
              fullWidth
              label="Status Color"
              name="statusColor"
              onChange={this.handleChange}
              style={moreMarginBottom}
            />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={this.handleSubmit}
              style={marginRight}
              color="primary"
            >
              Save
            </Button>
            <Button onClick={this.cancelSubmit} color="secondary">
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
        <div>
          <Button
            variant="contained"
            style={{
              marginLeft: "40px",
              backgroundColor: "green",
              color: "#fff",
            }}
            onClick={() => this.setState({ isModalOpen: true })}
          >
            New Candidate State
          </Button>
        </div>
      </div>
    );
  }
}
export default AddCandidateStates;
