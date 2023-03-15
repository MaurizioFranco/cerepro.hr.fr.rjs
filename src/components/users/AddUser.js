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

import "react-toastify/dist/ReactToastify.css";
import * as Commons from "../../commons.js";
import * as Constants from "../../constants.js";

class UpdateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = { idItemToLoad: null,
            email: "",
            firstname: "",
            lastname: "",
            role: "",
            enabled: "",
        };
        this.gridRef = React.createRef();
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
        email: data.email,
        firstname: data.firstname,
        lastname: data.lastname,
        role: data.role,
        enabled: data.enabled
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
            email: this.state.email,
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            role: this.state.role,
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
        this.getItemById();
        //this.gridRef.current.show();
    }

    getItemById = () => {
        Commons.executeFetch(Constants.USER_API_URI + this.props.idItemToUpdate, "GET", this.setItemToUpdate);
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
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Firstname"
              name="firstname"
              value={this.state.firstname}
              onChange={this.handleChange}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Lastname"
              name="lastname"
              value={this.state.lastname}
              onChange={this.handleChange}
              style={{ marginBottom: "10px" }}
            />
            <TextField
              fullWidth
              label="Role"
              name="role"
              type="number"
              value={this.state.role}
              onChange={this.handleChange}
              style={{ marginBottom: "20px" }}
            />

            <Grid container alignItems="center" justifyContent="flex-start">
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

export default UpdateUser;
