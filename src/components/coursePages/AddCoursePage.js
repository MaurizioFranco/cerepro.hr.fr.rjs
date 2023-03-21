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
  Select,
  MenuItem,
  InputLabel
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
      selectedOwner: "",
      owners: [],
      firtname: "",
      latname: ""
    };
    this.gridRef = React.createRef();
  }

  componentDidMount() {
    this.fetchOwners();
  }

  fetchOwners = () => {
    Commons.executeFetch(Constants.BACKEND_API_PREFIX + Constants.GET_USER_BY_ROLE_API + "50", "GET", this.setOwners);
  }

  setOwners = (retrievedOwners) => {
    Commons.debugMessage("setOwners - START - owners: " + retrievedOwners);
    this.setState({
        owners: retrievedOwners,
    });
    console.log(retrievedOwners);
}

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

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
      Commons.operationError,
      JSON.stringify(item),
      true
    );
    this.addPositionUserOwner(item);
  }

  addPositionUserOwner = (item) => {
    var positionUserOwner = {
      coursePageId: item.id,
      userId: this.state.owner.id
    }
    Commons.executeFetch(
      "http://localhost:8080/cerepro.hr.backend/api/v1/positionuserowner/",
      "POST",
      JSON.stringify(positionUserOwner),
      true
    )
  }

  insertError = (err) => {
    console.log("INSERT COURSE PAGE KO");
    toast.error(err.errorMessage, {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    console.error(err);
  };

  insertSuccess = (response) => {
    // console.log("INSERT COURSE PAGE SUCCESS");
    // console.log(response);
    // toast.success("Course Page successfully inserted", {
    //   position: toast.POSITION.BOTTOM_LEFT,
    // });
    Commons.operationSuccess();
    this.setState({ isModalOpen: false });
    this.props.refreshCoursePagesList();
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
          <DialogTitle>New Course Page</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Title"
              name="title"
              onChange={this.handleChange}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Code"
              name="code"
              onChange={this.handleChange}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Body Text"
              name="bodyText"
              onChange={this.handleChange}
              style={{ marginBottom: "20px" }}
            />
            <InputLabel>Proprietario</InputLabel>
            <Select
              fullWidth
              label="Proprietario"
              name="proprietario"
              value={this.state.selectedOwner}
              onChange={(e) => this.setState({ selectedOwner: e.target.value})}
              style={{ marginBottom: "10px" }}
            >
              {this.state.owners.map((owner) => (
                <MenuItem key={owner.value} value={owner.value}>
                  {owner.firstname + " " + owner.lastname}
                </MenuItem>))}
            </Select>

            {/* <TextField fullWidth label="File Name" name="fileName" onChange={this.handleChange} style={moreMarginBottom} /> */}
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

export default AddCoursePages;