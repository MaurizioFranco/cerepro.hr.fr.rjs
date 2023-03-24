import React, { Component } from "react";

import * as Commons from "../../commons.js";
import * as Constants from "../../constants.js";

import AddCandidateStates from "./AddCandidateStates.js";
import UpdateCandidateStates from "./UpdateCandidateStates.js";

import { withStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
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

class CandidateStatesList extends Component {
  constructor(props) {
    super(props);
    this.state = { candidateStates: [] };
  }

  getCandidateStates = () => {
    Commons.executeFetch(
      Constants.FULL_CANDIDATE_STATES_BY_CODE_API_URI,
      "GET",
      this.setCandidateStates
    );
  };

  setCandidateStates = (data) => {
    this.setState({
      candidateStates: data,
    });
  };

  componentDidMount() {
    this.getCandidateStates();
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
      Constants.FULL_CANDIDATE_STATES_API_URI + id,
      this.deleteSuccess,
      Commons.operationError
    );
  }

  deleteSuccess = (response) => {
    Commons.operationSuccess(response, "Cancellazione stato candidatura avvenuta con successo.");
    this.getCandidateStates();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        <AddCandidateStates refreshCandidateStatesList={this.getCandidateStates}/>
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
              aria-label="candidate states table"
            >
              <TableHead>
                <TableRow style={{ backgroundColor: "#333", color: "#fff" }}>
                  <TableCell style={{ color: "#fff" }}>ID</TableCell>
                  <TableCell style={{ color: "#fff" }}>Status Code</TableCell>
                  <TableCell style={{ color: "#fff" }}>Status Label</TableCell>
                  <TableCell style={{ color: "#fff" }}>Status Description</TableCell>
                  <TableCell style={{ color: "#fff" }}>Status Color</TableCell>
                  <TableCell style={{ color: "#333" }}></TableCell>
                  <TableCell style={{ color: "#333" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.candidateStates.map((candidateState, index) => (
                  <TableRow
                    key={index}
                    className={
                      index % 2 === 0 ? classes.evenRow : classes.oddRow
                    }
                  >
                    <TableCell>{candidateState.id}</TableCell>
                    <TableCell>{candidateState.statusCode}</TableCell>
                    <TableCell>{candidateState.statusLabel}</TableCell>
                    <TableCell>{candidateState.statusDescription}</TableCell>
                    <TableCell>
                      <div
                        style={{
                          border: "1.5px solid #333",
                          backgroundColor: candidateState.statusColor,
                          width: "100%",
                          height: "100%",
                        }}
                      >
                        &nbsp;
                      </div>
                    </TableCell>
                    <TableCell>
                    <UpdateCandidateStates refreshCandidateStatesList={this.getCandidateStates} idItemToUpdate={candidateState.id} />
                    </TableCell>
                    <TableCell>                      
                      <DeleteButton onClickFunction={() => this.confirmDelete(candidateState.id)}/>
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

export default withStyles(styles)(CandidateStatesList);