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

class AddCoursePages extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      code: "",
      bodyText: "",
      fileName: "",
      isModalOpen: false,
    };
    this.gridRef = React.createRef();
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // Save course page and close modal form
  handleSubmit = (event) => {
    event.preventDefault();
    var item = {
      title: this.state.title,
      code: this.state.code,
      bodyText: this.state.bodyText,
      fileName: this.state.fileName,
    };
    this.addCoursePage(item);
  };

  addCoursePage(item) {
    Commons.executeFetch(
      Constants.FULL_COURSEPAGE_API_URI,
      "POST",
      this.insertSuccess,
      this.insertError,
      JSON.stringify(item),
      true
    );
  }

  insertError = (err) => {
    console.log("INSERT COURSE PAGE KO");
    toast.error(err.errorMessage, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    console.error(err);
  };

  insertSuccess = (response) => {
    console.log("INSERT COURSE PAGE SUCCESS");
    console.log(response);
    toast.success("Course Page successfully inserted", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    this.setState({ isModalOpen: false });
    this.props.refreshCoursePagesList();
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
          <DialogTitle>New Course Page</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Title"
              name="title"
              onChange={this.handleChange}
              style={marginBottom}
            />
            <TextField
              fullWidth
              label="Code"
              name="code"
              onChange={this.handleChange}
              style={marginBottom}
            />
            <TextField
              fullWidth
              label="Body Text"
              name="bodyText"
              onChange={this.handleChange}
              style={moreMarginBottom}
            />
            {/* <TextField fullWidth label="File Name" name="fileName" onChange={this.handleChange} style={moreMarginBottom} /> */}
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
            New Course Page
          </Button>
        </div>
      </div>
    );
  }
}

export default AddCoursePages;