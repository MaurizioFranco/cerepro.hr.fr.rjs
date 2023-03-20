import React from "react";

import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

import * as Commons from "../../commons.js";
import * as Constants from "../../constants.js";

class UpdateCoursePages extends React.Component {
    constructor(props) {
        super(props);
        this.state = { idItemToLoad: null, title: '', code: '', bodyText: '' };
        this.gridRef = React.createRef();
    }

    componentDidMount() {
      Commons.executeFetch(
        Constants.FULL_COURSEPAGE_API_URI + this.props.idItemToUpdate,
        "GET",
        this.setCoursePages,
        Commons.operationError
      );
    }
    
    setCoursePages = (data) => {
      this.setState({
        title: data.title,
        code: data.code,
        bodyText: data.bodyText,
      });
    };

    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }

    handleSubmit = (event) => {
        event.preventDefault();
        var item = {
            title: this.state.title, code: this.state.code, bodyText: this.state.bodyText
        };
        Commons.executeFetch(Constants.FULL_COURSEPAGE_API_URI + this.props.idItemToUpdate, "PUT", this.updateSuccess, Commons.operationError, JSON.stringify(item), true);
    }

    updateSuccess = (response) => {
        // console.log("COURSE PAGE SUCCESSFULLY UPDATED");
        // console.log(response);
        // toast.success("Course Page successfully updated", {
        //     position: toast.POSITION.BOTTOM_LEFT
        // });
        Commons.operationSuccess();
        this.setState({ isModalOpen: false });
        this.props.refreshCoursePagesList();
    }

    cancelSubmit = (event) => {
        event.preventDefault();
        this.setState({ isModalOpen: false });
    }

    initializeAndShow = () => {
        console.log(this.props.idItemToUpdate);
        this.getItemById();
        //this.gridRef.current.show();
    }

    getItemById = () => {
        Commons.executeFetch(Constants.FULL_COURSEPAGE_API_URI + this.props.idItemToUpdate, "GET", this.setItemToUpdate);
    }

    setItemToUpdate = (responseData) => {
        this.setState({
            itemLoaded: true,
            title: responseData.title,
            code: responseData.code,
            bodyText: responseData.bodyText
        });
    }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.isModalOpen}
          onClose={() => this.setState({ isModalOpen: false })}
        >
          <DialogTitle>Edit Course Page</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Code"
              name="code"
              value={this.state.code}
              onChange={this.handleChange}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Body Text"
              name="bodyText"
              value={this.state.bodyText}
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
            color="primary"
            onClick={() => this.setState({ isModalOpen: true })}
          >
            EDIT
      </Button>
    </div>
  </div>
);
}
}

export default UpdateCoursePages;