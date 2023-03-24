import React, { Component } from "react";

import * as Commons from "../../commons.js";
import * as Constants from "../../constants.js";

import AddUser from "./AddUser.js";
import UpdateUser from "./UpdateUser.js";
import UpdateUserEnabled from './UpdateUserEnabled.js';

import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@material-ui/core";

import "react-table-6/react-table.css";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import DeleteButton from "../../commons/DeleteButton.js";

const styles = {
  table: {
    minWidth: 650,
  },
  evenRow: {
    backgroundColor: "#fff",
  },
  oddRow: {
    backgroundColor: "#f2f2f2",
  },
};

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = { users: [], roles: [] };
  }

  getUsers = () => {
    Commons.executeFetch(
      Constants.USER_API_URI,
      "GET",
      this.setUsers
    );
  };

  getRoles = () => {
    Commons.executeFetch(Constants.ROLE_API_URI, 'GET', this.setRoles)
  }

  setRoles = (data) => {
    this.setState({ roles: data })
  }

  getRoleLevel = (level) => {
    const roles = this.state.roles;
    const role = roles.find(role => role.level === level);
    return role ? role.label : null;
  };

  // getRoleLevel = (level, index) => {
  //   Commons.executeFetch(
  //     Constants.FULL_ROLE_LEVEL_URI + level,
  //     "GET",
  //     (data) => this.setLabel(data, index)
  //   );
  // };

  // setLabel = (data, index) => {
  //   const label = data.label;
  //   const users = [...this.state.users];
  //   users[index].roleLabel = label;
  //   this.setState({ users });
  // };

  setUsers = (data) => {
    this.setState({
      users: data,
    });
  };


  componentDidMount() {
    this.getUsers();
    this.getRoles()
  }

  confirmDelete = (id) => {
    confirmAlert({
      message: "Are you sure to delete?",
      buttons: [
        {
          label: "Yes",
          onClick: () => this.deleteItem(id),
        },
        {
          label: "No",
        },
      ],
    });
  };

  deleteItem(id) {
    Commons.executeDelete(
      Constants.USER_API_URI + id,
      this.deleteSuccess,
      Commons.operationError
    );
  }

  deleteSuccess = (response) => {
    Commons.operationSuccess(response, "Cancellazione utente avvenuta correttamente.");
    this.getUsers();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <AddUser refreshUsersList={this.getUsers} />
        <TableContainer
          style={{
            paddingLeft: "40px",
            paddingRight: "40px",
            paddingBottom: "140px",
          }}
        >
          <TableContainer component={Paper}>
            <Table
              className={classes.table}
              aria-label="user table"
            >
              <TableHead>
                <TableRow style={{ backgroundColor: "#333", color: "#fff" }}>
                  <TableCell style={{ color: "#fff" }}>ID</TableCell>
                  <TableCell style={{ color: "#fff" }}>E-mail</TableCell>
                  <TableCell style={{ color: "#fff" }}>Firstname</TableCell>
                  <TableCell style={{ color: "#fff" }}>Lastname</TableCell>
                  <TableCell style={{ color: "#fff" }}>Role</TableCell>
                  <TableCell style={{ color: "#333" }}></TableCell>
                  <TableCell style={{ color: "#333" }}></TableCell>
                  <TableCell style={{ color: "#333" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.users.map((user, index) => (
                  <TableRow
                    key={index}
                    className={
                      index % 2 === 0 ? classes.evenRow : classes.oddRow
                    }
                  >
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.firstname}</TableCell>
                    <TableCell>{user.lastname}</TableCell>
                    {/* <TableCell>{user.roleLabel || this.getRoleLevel(user.role, index)}</TableCell> */}
                    <TableCell>{this.getRoleLevel(user.role)}</TableCell>
                    <TableCell><UpdateUserEnabled refreshUsersList={this.getUsers} idItemToUpdate={user.id} /></TableCell>
                    <TableCell>
                      <UpdateUser refreshUsersList={this.getUsers} idItemToUpdate={user.id} />
                    </TableCell>
                    <TableCell>                      
                      <DeleteButton onClickFunction={() => this.confirmDelete(user.id)}/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TableContainer>
      </div>
    );
  }
}

export default withStyles(styles)(UsersList);