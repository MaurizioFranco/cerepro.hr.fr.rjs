import React from "react";
//import SkyLight from 'react-skylight';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Commons from "../../commons.js";
import * as Constants from "../../constants.js";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

class AddSurvey extends React.Component {
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
      this.insertError,
      JSON.stringify(item),
      true
    );
  }

  insertError = (err) => {
    console.log("INSERT SURVEY KO");
    toast.error(err.errorMessage, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    console.error(err);
  };

  insertSuccess = (response) => {
    console.log("INSERT SURVEY SUCCESS");
    console.log(response);
    toast.success("Survey successfully inserted", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    this.setState({ isModalOpen: false });
    this.props.refreshSurveyList();
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
          <DialogTitle>New Survey</DialogTitle>
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

export default AddSurvey;