import React from "react";
import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Switch,
  Typography,
  Grid,
  Select
} from "@material-ui/core";
import AddButton from "../../commons/AddButton.js";
import SaveButton from "../../commons/SaveButton.js";
import CancelButton from "../../commons/CancelButton.js";
import styles from "../../styles.js";

import "react-toastify/dist/ReactToastify.css";

import * as Commons from "../../commons.js";
import * as Constants from "../../constants.js";
//import { common } from "@mui/material/colors";

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
      roles: [],
      selectedRole: ""
    };
    this.gridRef = React.createRef();
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const selectedLabel = this.state.selectedRole.label;
    const selectedRole = this.state.roles.find(role => role.label === selectedLabel);
    const selectedRoleLevel = selectedRole.level;
    var item = {
      email: this.state.email,
      password: this.state.password,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      role: selectedRoleLevel,
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
    Commons.operationSuccess(response, "Utente inserito correttamente.");
    this.setState({ isModalOpen: false });
    this.props.refreshUsersList();
  };

  cancelSubmit = (event) => {
    event.preventDefault();
    this.setState({ isModalOpen: false });
  };

  componentDidMount() {
    this.getRoles()
  }

  getRoles = () => {
    Commons.executeFetch(Constants.ROLE_API_URI, 'GET', this.setRoles)
  }

  setRoles = (data) => {
    this.setState({ roles: data })
  }

  render() {
    return (
      <React.Fragment>
        <Dialog
          open={this.state.isModalOpen}
          onClose={() => this.setState({ isModalOpen: false })}
        >
          <DialogTitle>INSERISCI UN NUOVO UTENTE</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="E-mail"
              name="email"
              onChange={this.handleChange}
              style={styles.field}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              onChange={this.handleChange}
              style={styles.field}
            />
            <TextField
              fullWidth
              label="Firstname"
              name="firstname"
              onChange={this.handleChange}
              style={styles.field}
            />
            <TextField
              fullWidth
              label="Lastname"
              name="lastname"
              onChange={this.handleChange}
              style={styles.fieldBeforeSelect}
            />
            <Select
              fullWidth
              label="Role"
              name="roles"
              value={this.state.selectedRole}
              onChange={(e) => this.setState({ selectedRole: e.target.value })}
              style={styles.field}
            >
              {this.state.roles.map((role) => (
                <option key={role} value={role}>{role.label}</option>
                ))}
            </Select>

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
            <SaveButton
              onClick={this.handleSubmit}
            >
            </SaveButton>
            <CancelButton 
              onClick={this.cancelSubmit}>
            </CancelButton>
          </DialogActions>
        </Dialog>
          <AddButton
            onClick={() => this.setState({ isModalOpen: true })}>
          </AddButton>
        </React.Fragment>
    );
  }
}
export default AddUsers;
