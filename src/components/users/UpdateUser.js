import React from "react";

import {
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select
} from "@material-ui/core";
import styles from "../../styles.js";

import "react-toastify/dist/ReactToastify.css";
import * as Commons from "../../commons.js";
import * as Constants from "../../constants.js";

import SaveButton from "../../commons/SaveButton.js";
import CancelButton from "../../commons/CancelButton.js";
import EditButton from "../../commons/EditButton.js";

class UpdateUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      idItemToLoad: null,
      email: "",
      firstname: "",
      lastname: "",
      role: "",
      enabled: "",
      roles: this.props.roles,
      selectedRole: ""
    };
    this.gridRef = React.createRef();
  }

  // componentDidMount() {
  //   Commons.executeFetch(
  //     Constants.USER_API_URI + this.props.idItemToUpdate,
  //     "GET",
  //     this.setUser,
  //     Commons.operationError
  //   );
  // }

  setUser = (data) => {
    // const roleLabel = this.state.roles;
    // const role = roleLabel.find(role => role.level === data.role);
    // console.log("++++++++++++++++++++++++++++++" + role.label)
    // if(role){
    //   this.setState({selectedRole : role.label})
    // }
    console.log("setUser");
    console.log(data);
    const selectedRole = this.state.roles.find(role => role.level === data.role);
    console.log("selectedRole");
    console.log(selectedRole);
    this.setState({
      email: data.email,
      firstname: data.firstname,
      lastname: data.lastname,
      role: data.role,
      enabled: data.enabled,
      selectedRole: selectedRole
    });
  };

  handleChange = (event) => {
    this.setState(
      { [event.target.name]: event.target.value }
    );
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const selectedLabel = this.state.selectedRole.label;
    const selectedRole = this.state.roles.find(role => role.label === selectedLabel);
    const selectedRoleLevel = selectedRole.level;
    var item = {
      email: this.state.email,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      role: selectedRoleLevel,
      enabled: this.state.enabled,
    };
    Commons.executeFetch(Constants.USER_API_URI + this.props.idItemToUpdate, "PUT", this.updateSuccess, Commons.operationError, JSON.stringify(item), true);
  }

  updateSuccess = (response) => {
    Commons.operationSuccess();
    this.setState({ isModalOpen: false });
    this.props.refreshUsersList();
  }

  cancelSubmit = (event) => {
    event.preventDefault();
    this.setState({ isModalOpen: false });
  }

  initializeAndShow = () => {
    console.log(this.props.idItemToUpdate);
    console.log(this.state.roles);
    this.getItemById();
    this.setState({ isModalOpen: true });
    //this.gridRef.current.show();
  }

  getItemById = () => {
    // Commons.executeFetch(Constants.USER_API_URI + this.props.idItemToUpdate, "GET", this.setItemToUpdate);
    Commons.executeFetch(
      Constants.USER_API_URI + this.props.idItemToUpdate,
      "GET",
      this.setUser,
      Commons.operationError
    );
  }

  setItemToUpdate = (responseData) => {
    this.setState({
      itemLoaded: true,
      email: responseData.email,
      firstname: responseData.firstname,
      lastname: responseData.lastname,
      role: responseData.role,
      enabled: responseData.enabled,
    });
  }

  showUpdateModal = () => {
    console.log("show modal");
      this.setState({ isModalOpen: true });
  }

  render() {
    return (
      <div>
        <Dialog
          open={this.state.isModalOpen}
          onClose={() => this.setState({ isModalOpen: false })}
        >
          <DialogTitle>Edit Users</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="E-mail"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              style={styles.field}
            />
            <TextField
              fullWidth
              label="Firstname"
              name="firstname"
              value={this.state.firstname}
              onChange={this.handleChange}
              style={styles.field}
            />
            <TextField
              fullWidth
              label="Lastname"
              name="lastname"
              value={this.state.lastname}
              onChange={this.handleChange}
              style={styles.field}
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
          </DialogContent>
          <DialogActions>
            <SaveButton
              onClick={this.handleSubmit}
            >
            </SaveButton>
            <CancelButton
              onClick={this.cancelSubmit}
            >
            </CancelButton>
          </DialogActions>
        </Dialog>
        <div>
          <EditButton onClick={() => this.initializeAndShow()} />
        </div>
      </div>
    );
  }
}

export default UpdateUser;
