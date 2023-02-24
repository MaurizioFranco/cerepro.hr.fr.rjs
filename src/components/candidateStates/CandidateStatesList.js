import React, { Component } from "react";

import * as Commons from "../../commons.js";
import * as Constants from "../../constants.js";
import AddCandidateStates from "./AddCandidateStates.js";

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

import { ToastContainer, toast } from "react-toastify";
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

class CandidateStatesList extends Component {
  constructor(props) {
    super(props);
    this.state = { candidateStates: [] };
  }

  getCandidateStates = () => {
    Commons.executeFetch(
      Constants.FULL_CANDIDATE_STATES_API_URI,
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
    console.log("DELETE CANDIDATE STATE SUCCESS");
    console.log(response);
    // if (response.status===201) {
    toast.success("Candidate State successfully deleted", {
      position: toast.POSITION.BOTTOM_LEFT,
    });
    this.getCandidateStates();
    // } else {
    // this.insertError (response) ;
    // }
  };

  renderEditable = (cellInfo) => {
    return (
      <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => {
          const data = [...this.state.candidateStates];
          data[cellInfo.index][cellInfo.column.id] = e.target.innerHTML;
          this.setState({ candidateStates: data });
        }}
        dangerouslySetInnerHTML={{
          __html:
            this.state.candidateStates[cellInfo.index][cellInfo.column.id],
        }}
      />
    );
  };

  updateCandidateState(candidateState, id) {
    // console.log(candidateState);
    // const itemToUpdate = {...candidateState};
    // itemToUpdate.id = id ;
    // fetch(BACKEND_APPLICATION_ROOT + 'v1/candidateStates',
    //     {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(itemToUpdate)
    //     })
    //     .then(res =>
    //         toast.success("Changes saved", {
    //             position: toast.POSITION.BOTTOM_LEFT
    //         })
    //     )
    //     .catch(err =>
    //         toast.error("Error when saving", {
    //             position: toast.POSITION.BOTTOM_LEFT
    //         })
    //     )
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="App">
        {/* <CSVLink data={this.state.candidateStates} separator=";">Export CSV</CSVLink> */}
        <AddCandidateStates refreshCandidateStatesList={this.getCandidateStates}/>
        <br></br>
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
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                          this.updateCandidateState(
                            candidateState,
                            candidateState.id
                          )
                        }
                      >
                        Save
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => this.confirmDelete(candidateState.id)}
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

//export default CandidateStatesList ;
export default withStyles(styles)(CandidateStatesList);