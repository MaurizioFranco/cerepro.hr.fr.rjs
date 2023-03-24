import React from "react";

import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

import * as Commons from "../../commons.js";
import * as Constants from "../../constants.js";

import EditButton from "../../commons/EditButton.js";
import CancelButton from "../../commons/CancelButton.js";
import SaveButton from "../../commons/SaveButton.js";

import './UpdateCoursePage.css';

class UpdateCoursePages extends React.Component {
  constructor(props) {
    super(props);
    this.state = { idItemToLoad: null, title: '', code: '', bodyText: '' ,opened_by:''};
    this.gridRef = React.createRef();
  }

  setCoursePages = (data) => {
    this.setState({
      title: data.title,
      code: data.code,
      bodyText: data.bodyText,
      opened_by : data.opened_by
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
      title: this.state.title,
      code: this.state.code, 
      bodyText: this.state.bodyText,
      opened_by : this.state.opened_by
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
          <DialogTitle className="commonDialogTitle">MODIFICA POSIZIONE</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="TITOLO POSIZIONE"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="CODICE ALFANUMERICO"
              name="code"
              value={this.state.code}
              onChange={this.handleChange}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="BREVE DESCRIZIONE"
              name="bodyText"
              value={this.state.bodyText}
              onChange={this.handleChange}
              style={{ marginBottom: "20px" }}
            />
          </DialogContent>
          <DialogActions>
            <SaveButton onClickFunction={() => this.handleSubmit()}/>
            <CancelButton onClickFunction={() => this.setState({ isModalOpen: false })}/>
          </DialogActions>
        </Dialog>
        <div>
          <EditButton onClickFunction={() => this.setState({ isModalOpen: true })} />
        </div>
      </div>
    );
  }
}

export default UpdateCoursePages;