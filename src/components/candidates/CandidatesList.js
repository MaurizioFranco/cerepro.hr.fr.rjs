import React, { Component } from "react";

import * as Commons from "../../commons.js";
import * as Constants from "../../constants.js";
import './CandidatesList.css';
import downloadIcon from "../../images/download_icon.png";


import { withRouter } from "react-router";
//import AddUser from "./AddUser.js";
//import UpdateUser from "./UpdateUser.js";

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

class CandidatesList extends Component {
  constructor(props) {
    super(props);
    const { match: { params } } = props;
    this.state = { candidates: [] };
  }

  getCandidates = (positionCode) => {
    Commons.executeFetch(
      Constants.FULL_CANDIDATE_CUSTOM_GET_LIST_API_URI + (positionCode!==undefined?positionCode:''),
      "GET",
      this.setCandidates
    );

  };

  setCandidates = (data) => {
    this.setState({
      candidates: data.content,
    });
  };

  componentDidMount() {			
		const { match: { params } } = this.props;
		this.getCandidates(params.id);
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
      Constants.FULL_CANDIDATE_CUSTOM_API_URI + id,
      this.deleteSuccess,
      this.deleteFailed
    );
  };

  deleteSuccess = (response) => {
    Commons.operationSuccess(response, "Cancellazione dell'utente avvenuta correttamente.");
    this.getCandidates();
  };

  deleteFailed = (response) => {
    Commons.operationError(response, "Cancellazione dell'utente fallita.");
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        {/* <AddUser refreshCandidatesList={this.getCandidates}/> */}
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
              aria-label="candidate table"
            >
              <TableHead>
                <TableRow style={{ backgroundColor: "#333", color: "#fff" }}>
                  <TableCell style={{ color: "#fff" }}>Id</TableCell>
                  <TableCell style={{ color: "#fff" }}></TableCell>
                  <TableCell style={{ color: "#fff" }}>E-mail</TableCell>
                  <TableCell style={{ color: "#fff" }}>Firstname</TableCell>
                  <TableCell style={{ color: "#fff" }}>Lastname</TableCell>
                  <TableCell style={{ color: "#fff" }}>CV</TableCell>
                  <TableCell style={{ color: "#fff" }}>Inserted by</TableCell>
                  <TableCell style={{ color: "#333" }}></TableCell>
                  <TableCell style={{ color: "#333" }}></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {this.state.candidates.map((candidate, index) => (
                  <TableRow
                    key={index}
                    className={
                      index % 2 === 0 ? classes.evenRow : classes.oddRow
                    }
                  >
                    <TableCell>{candidate.id}</TableCell>
                    <TableCell><img class="candidateImg" src={Constants.FRONTEND_API_PREFIX + "/canimg/" + candidate.imgpath} alt={candidate.imgpath} /></TableCell>
                    <TableCell>{candidate.email}</TableCell>
                    <TableCell>{candidate.firstname}</TableCell>
                    <TableCell>{candidate.lastname}</TableCell>
                    <TableCell>
                      <a href={`${Constants.FRONTEND_API_PREFIX}/${candidate.cvExternalPath}`} target="_blank" rel="noopener noreferrer">
                      <img class="downloadIcon" src={downloadIcon} alt={candidate.cvExternalPath} />
                      </a>
                    </TableCell>
                    <TableCell>{candidate.insertedByFirstname} {candidate.insertedByLastname}</TableCell>
                    <TableCell>
                    {/* <UpdateUser refreshCandidatesList={this.getCandidates} idItemToUpdate={candidate.id} /> */}
                    </TableCell>
                    <TableCell>
                    <DeleteButton onClickFunction={() => this.confirmDelete(candidate.id)}/>
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

export default withRouter((withStyles(styles)(CandidatesList)))