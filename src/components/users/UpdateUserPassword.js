import React from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@material-ui/core";
import { Cancel, Save, VpnKey } from "@material-ui/icons";
import styles from "../../styles.js";

import * as Commons from "../../commons.js";
import * as Constants from "../../constants.js";

class UpdateUserPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: "",
      confirmPassword: "",
      isModalOpen: false,
      isFormValid: false,
      firstname: "",
      lastname: "",
    };
  }

  componentDidMount() {
    Commons.executeFetch(
      Constants.USER_API_URI + this.props.idItemToUpdate,
      "GET",
      this.setUser,
      Commons.operationError
    );
  }

  setUser = (data) => {
    this.setState({
      firstname: data.firstname,
      lastname: data.lastname
    });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value }, this.validateForm);
  };

  validateForm = () => {
    const { password, confirmPassword } = this.state;
    const isFormValid = password === confirmPassword && password !== "" && confirmPassword !== "";
    this.setState({ isFormValid });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { password } = this.state;
    Commons.executeFetch(
      Constants.USER_API_URI + "updatepassword/" + this.props.idItemToUpdate,
      "PATCH",
      this.handleSuccess,
      Commons.operationError,
      password,
      true
    );
  };

  handleSuccess = () => {
    Commons.operationSuccess();
    this.setState({ isModalOpen: false });
  };

  render() {
    const { password, confirmPassword, isModalOpen, isFormValid, firstname, lastname } = this.state;
    const title = `Stai per cambiare la password dell'utente ${firstname} ${lastname}`;
    return (
      <>
        <Dialog
          open={isModalOpen}
          onClose={() => this.setState({ isModalOpen: false })}
        >
          <form onSubmit={this.handleSubmit}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
              <TextField
                fullWidth
                label="New password"
                name="password"
                type="password"
                value={password}
                onChange={this.handleInputChange}
                style={styles.field}
              />
              <TextField
                fullWidth
                label="Confirm password"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={this.handleInputChange}
                error={!isFormValid && confirmPassword !== ""}
                helperText={
                  !isFormValid && confirmPassword !== ""
                    ? "Le due password non corrispondono"
                    : ""
                }
                style={styles.fieldBeforeButtons}
              />
            </DialogContent>
            <DialogActions>
              <Button type="submit" disabled={!isFormValid} endIcon={<Save />} style={styles.saveButton}>
                Save
              </Button>
              <Button
                onClick={() => this.setState({ isModalOpen: false })} endIcon={<Cancel />} style={styles.cancelButton}>
                Cancel
              </Button>
            </DialogActions>
          </form>
        </Dialog>
        <Button
          endIcon={<VpnKey />}
          style={styles.resetPasswordButton}
          onClick={() => this.setState({ isModalOpen: true })}
        >
          Cambia password
        </Button>
      </>
    );
  }
}


export default UpdateUserPassword;
