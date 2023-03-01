import React from "react";

import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Commons from "../../commons.js";
import * as Constants from "../../constants.js";

class UpdateSurveyQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = { idItemToLoad: null, surveyLabel: '', questionLabel: '', surveyId: '', questionId: '', position: '' };
        this.gridRef = React.createRef();
    }

    componentDidMount() {
      Commons.executeFetch(
        Constants.FULL_SURVEYQUESTIONCUSTOM_API_URI + this.props.idItemToUpdate,
        "GET",
        this.setSurveyQuestions,
        Commons.operationError
      );
    }
    
    setSurveyQuestions = (data) => {
      this.setState({
        surveyLabel: data.surveyLabel,
        questionLabel: data.questionLabel,
        surveyId: data.surveyId,
        questionId: data.questionId,
        position: data.position,
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
            surveyLabel: this.state.surveyLabel, questionLabel: this.state.questionLabel, surveyId: this.state.surveyId, questionId: this.state.questionId, position: this.state.position
        };
        Commons.executeFetch(Constants.FULL_SURVEYQUESTIONCUSTOM_API_URI + this.props.idItemToUpdate, "PUT", this.updateSuccess, Commons.operationError, JSON.stringify(item), true);
    }

    updateSuccess = (response) => {
        console.log("SURVEY QUESTION SUCCESSFULLY UPDATED");
        console.log(response);
        toast.success("Survey question successfully updated", {
            position: toast.POSITION.BOTTOM_LEFT
        });
        this.setState({ isModalOpen: false });
        this.props.refreshSurveyQuestionsList();
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
        Commons.executeFetch(Constants.FULL_SURVEYQUESTIONCUSTOM_API_URI + this.props.idItemToUpdate, "GET", this.setItemToUpdate);
    }

    setItemToUpdate = (responseData) => {
        this.setState({
            itemLoaded: true,
            surveyLabel: responseData.surveyLabel,
            questionLabel: responseData.questionLabel,
            surveyId: responseData.surveyId,
            questionId: responseData.questionId,
            position: responseData.position
        });
    }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.isModalOpen}
          onClose={() => this.setState({ isModalOpen: false })}
        >
          <DialogTitle>Edit Survey Question</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Survey Label"
              name="surveyLabel"
              value={this.state.surveyLabel}
              onChange={this.handleChange}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Question Label"
              name="questionLabel"
              value={this.state.questionLabel}
              onChange={this.handleChange}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Position"
              name="position"
              type="number"
              value={this.state.position}
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

export default UpdateSurveyQuestions;