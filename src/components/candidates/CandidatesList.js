import React, { Component } from "react";

import * as Commons from "../../commons.js";
import * as Constants from "../../constants.js";
import './CandidatesList.css';
import downloadIcon from "../../images/download_icon.png";

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
  Paper,
  Button,
} from "@material-ui/core";

//import ReactTable from "react-table-6";
import "react-table-6/react-table.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

// import { CSVLink } from 'react-csv';

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
    this.state = { candidates: [] };
  }

  getCandidates = () => {
    Commons.executeFetch(
      Constants.FULL_CANDIDATE_CUSTOM_GET_LIST_API_URI,
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
    this.getCandidates();
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
      (error) => {
        console.error("Delete failed:", error);
        Commons.operationError();
      }
    );
  };

  deleteSuccess = () => {
    Commons.operationSuccess();
    this.getCandidates();
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        {/* <CSVLink data={this.state.candidates} separator=";">Export CSV</CSVLink> */}
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
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => this.confirmDelete(candidate.id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TableContainer>
      <ToastContainer autoClose={1500} />
      </div>
    );
  }
}

export default withStyles(styles)(CandidatesList);