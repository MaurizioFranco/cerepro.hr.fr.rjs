import React, { Component } from "react";

import './UsersList.css';

import * as Commons from "../../commons.js";
import * as Constants from "../../constants.js";

import AddUser from "./AddUser.js";
import UpdateUser from "./UpdateUser.js";
import UpdateUserEnabled from './UpdateUserEnabled.js';
import UpdateUserPassword from './UpdateUserPassword.js';

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
import styles from "../../styles.js";

import "react-table-6/react-table.css";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

import DeleteButton from "../../commons/DeleteButton.js";
import PageMainTitle from "../../commons/PageMainTitle.js";

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
      <div style={styles.divContainer} className="App">
        <div class="panel panel-default">
					<PageMainTitle text={"UTENTI"} />
          <AddUser refreshCoursePagesList={this.getUsers} />
				</div>
        <TableContainer component={Paper}>
          <Table className={"table-style"}>
						<TableHead>
							<TableRow className={"table-head-row"}>
                  <TableCell style={{ color: "#fff" }}>&nbsp;</TableCell>
                  <TableCell style={{ color: "#fff" }}>E-MAIL</TableCell>
                  <TableCell style={{ color: "#fff" }}>NOME</TableCell>
                  <TableCell style={{ color: "#fff" }}>COGNOME</TableCell>
                  <TableCell style={{ color: "#fff" }}>RUOLO</TableCell>
                  <TableCell style={{ color: "#333" }}></TableCell>
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
                    <TableCell>{this.getRoleLevel(user.role)}</TableCell>
                    <TableCell><UpdateUserEnabled refreshUsersList={this.getUsers} idItemToUpdate={user.id} /></TableCell>
                    <TableCell>
                      <UpdateUserPassword refreshUsersList={this.getUsers} idItemToUpdate={user.id}/>
                    </TableCell>
                    <TableCell>
                      <UpdateUser refreshUsersList={this.getUsers} idItemToUpdate={user.id} roles={this.state.roles}/>
                    </TableCell>
                    <TableCell>                      
                      <DeleteButton onClick={() => this.confirmDelete(user.id)}/>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
      </div>
    );
  }
}


export default withStyles(styles)(UsersList);