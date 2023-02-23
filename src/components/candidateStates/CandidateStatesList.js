import React, { Component } from 'react';

import * as Commons from '../../commons.js';
import * as Constants from '../../constants.js';
import AddCandidateStates from './AddCandidateStates.js';

import ReactTable from "react-table-6";
import 'react-table-6/react-table.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

// import { CSVLink } from 'react-csv';

class CandidateStatesList extends Component {

    constructor(props) {
        super(props);
        this.state = { candidateStates: [] };
    }

    getCandidateStates = () => {
        Commons.executeFetch(Constants.FULL_CANDIDATE_STATES_API_URI, "GET", this.setCandidateStates);
    }

    setCandidateStates = (data) => {
        this.setState({
            candidateStates: data
        });
    }

    componentDidMount() {        
        this.getCandidateStates () ;
    }

    confirmDelete = (id) => {
        confirmAlert({
            message: 'Are you sure to delete?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.onDelClick(id)
                },
                {
                    label: 'No',
                }
            ]
        })
    }

    
    // Delete candidateState
    onDelClick = (id) => {
    //const accessToken = localStorage.getItem('accessToken');
    fetch(`http://centauri.proximainformatica.com/cerepro.hr.backend/dev/api/v1/candidateStates/${id}`, {
    method: 'DELETE',
    headers: {
        //'Authorization': `Bearer ${accessToken}`
        Authorization: 'Basic ' + btoa('9@9.9:9')
      }
  })
    .then(response => {
      if (response.ok) {
        toast.success("Candidate state deleted successfully!", {
          position: toast.POSITION.BOTTOM_LEFT
        });
        const candidateStates = this.state.candidateStates.filter(candidateState => candidateState.id !== id);
        this.setState({ candidateStates: candidateStates });
      } else {
        toast.error("Error deleting the candidate state!", {
          position: toast.POSITION.BOTTOM_LEFT
        });
      }
    })
    .catch(error => {
      toast.error("Error deleting the candidate state!", {
        position: toast.POSITION.BOTTOM_LEFT
      });
      console.error('Error:', error);
    });
}
    
    // addCandidateStates(item) {
    //     Commons.executeFetch(Constants.FULL_CANDIDATE_STATES_API_URI, "POST", this.insertSuccess, this.insertError, item);        
    // }
    
    // insertError = (err) => {
    //     toast.error("Error when trying to deleting user...", {
    //         position: toast.POSITION.BOTTOM_LEFT
    //     });
    //     console.error(err)
    // }

    // insertSuccess = (response) => {
    //     if (response.status===201) {
    //         toast.success("CandidateStates successfully inserted", {
    //             position: toast.POSITION.BOTTOM_LEFT
    //         });
    //         this.fetchCandidateStates();
    //     } else {
    //         this.insertError (response) ;
    //     }
    // }

    renderEditable = (cellInfo) => {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.candidateStates];
                    data[cellInfo.index][cellInfo.column.id] =
                        e.target.innerHTML;
                    this.setState({ candidateStates: data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.candidateStates[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    // Update candidateState
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
        const columns = [{
            Header: 'ID',
            accessor: 'id',
            width: 35,
            // Cell: this.renderEditable
        }, {
            Header: 'Status Code',
            accessor: 'statusCode',
            width: 95,
            // Cell: this.renderEditable
        }, {
            Header: 'Status Label',
            accessor: 'statusLabel',
            // Cell: this.renderEditable
        }, {
            Header: 'Status Description',
            accessor: 'statusDescription',
            // Cell: this.renderEditable
        }, {
            Header: 'Status Color',
            accessor: 'statusColor',
            width: 100,
            Cell: row => (
                <div style={{ backgroundColor: row.value, width: '100%', height: '100%' }}>
                  &nbsp;
                </div>
              )
            // Cell: this.renderEditable
        }, {
            id: 'savebutton',
            sortable: false,
            filterable: false,
            width: 70,
            accessor: 'id',
            Cell: ({value, row}) =>
            (<button onClick={()=>{this.updateCandidateState(row, value)}}>
            Save</button>)
            }, {
            id: 'delbutton',
            sortable: false,
            filterable: false, width: 70,
            accessor: 'id',
            Cell: ({ value }) => (<button onClick={() => { this.confirmDelete(value) }}>Delete</button>)
        }]
        return (
            <div className="App">
                    {/* <CSVLink data={this.state.candidateStates} separator=";">Export CSV</CSVLink> */}
                    {/* <AddCandidateStates addCandidateStates={this.addCandidateStates} fetchCandidateStates={this.fetchCandidateStates}/> */}
                    <AddCandidateStates refreshCandidateStatesList={this.getCandidateStates}/>
                    <ReactTable
                    data={this.state.candidateStates} 
                    columns={columns}
                    filterable={true}
                    style={{ fontSize: "15px" }}
                    getTrProps={(state, rowInfo, column, instance) => {
                    return {
                    style: {
                    backgroundColor: rowInfo && rowInfo.index % 2 === 0 ? "#efefef" : "#fff",
                            },
                        };
                    }} />
                    <ToastContainer autoClose={1500} />
            </div>
        );
    }
}
export default CandidateStatesList ;