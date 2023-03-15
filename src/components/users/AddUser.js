import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  Typography,
  Grid,
} from "@material-ui/core";
//import SkyLight from 'react-skylight';

import "react-toastify/dist/ReactToastify.css";

import * as Commons from "../../commons.js";
import * as Constants from "../../constants.js";

class AddUsers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      role: props.role || 90,
      enabled: "",
    };
    this.gridRef = React.createRef();
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    var item = {
      email: this.state.email,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      role: this.state.role,
      enabled: this.state.enabled,
    };
    this.addCandidateState(item);
  };

  addCandidateState(item) {
    Commons.executeFetch(
      Constants.USER_API_URI,
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
    this.props.refreshUsersList();
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
          <DialogTitle>New User</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="E-mail"
              name="email"
              onChange={this.handleChange}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              onChange={this.handleChange}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Firstname"
              name="firstname"
              onChange={this.handleChange}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Lastname"
              name="lastname"
              onChange={this.handleChange}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Role"
              name="role"
              type="number"
              onChange={this.handleChange}
              style={{ marginBottom: "20px" }}
            />

            <Grid container alignItems="center" justify="flex-start">
              <Grid item>
                <Typography variant="subtitle1" gutterBottom>
                  Enabled:
                </Typography>
              </Grid>
              <Grid item>
                <Switch
                  checked={this.state.enabled}
                  onChange={(event) => this.setState({ enabled: event.target.checked })}
                  name="enabled"
                  inputProps={{ 'aria-label': 'Enable user' }}
                />
              </Grid>
            </Grid>

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
export default AddUsers;
