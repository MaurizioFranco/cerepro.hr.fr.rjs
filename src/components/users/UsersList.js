import React, { Component } from 'react';

import * as Commons from '../../commons.js';
import * as Constants from '../../constants.js';
import AddUser from './AddUser.js';
import UpdateUser from './UpdateUser.js';
import UpdateUserEnabled from './UpdateUserEnabled.js';


import ReactTable from "react-table-6";
import 'react-table-6/react-table.css';

import { Switch } from '@material-ui/core';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'


// import { CSVLink } from 'react-csv';

class UsersList extends Component {

    constructor(props) {
        super(props);
        this.state = { cars: [] };
    }

    getUsers = () => {
        Commons.executeFetch(Constants.USER_API_URI, "GET", this.setUsers);
    }

    setUsers = (data) => {
        this.setState({
            cars: data
        });
    }

    componentDidMount() {
        this.getUsers();
    }

    confirmDelete = (id) => {
        confirmAlert({
            message: 'Are you sure to delete?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.deleteItem(id)
                },
                {
                    label: 'No',
                }
            ]
        })
    }

    deleteItem(id) {
        Commons.executeDelete(Constants.USER_API_URI + id, this.deleteSuccess, Commons.operationError);
        // Commons.executeDeleteAsync(Constants.USER_API_URI+id, this.deleteSuccess, Commons.operationError);   

    }

    // operationError = (err) => {
    //     console.log("INSERT USER KO");
    //     toast.error(err.errorMessage, {
    //         position: toast.POSITION.BOTTOM_LEFT
    //     });
    //     console.error(err)
    // }

    deleteSuccess = (response) => {
        console.log("DELETE USER SUCCESS");
        console.log(response);
        // if (response.status===201) {
        toast.success("User successfully deleted", {
            position: toast.POSITION.BOTTOM_LEFT
        });
        this.getUsers();
        // } else {
        // this.insertError (response) ;
        // }
    }

    renderEditable = (cellInfo) => {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.cars];
                    data[cellInfo.index][cellInfo.column.id] =
                        e.target.innerHTML;
                    this.setState({ cars: data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.cars[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    render() {
        const columns = [{
            Header: 'id',
            accessor: 'id'
        }, {
            Header: 'email',
            accessor: 'email'
        }, {
            Header: 'firstname',
            accessor: 'firstname'
        }, {
            Header: 'lastname',
            accessor: 'lastname'
        }, {
            id: 'updateEnabledButton',
            sortable: false,
            filterable: false, width: 100,
            accessor: 'id',
            Cell: ({ value }) => (<UpdateUserEnabled refreshUsersList={this.getUsers} idItemToUpdate={value} />)
        }, {
            id: 'updateButton',
            sortable: false,
            filterable: false, width: 100,
            accessor: 'id',
            Cell: ({ value }) => (<UpdateUser refreshUsersList={this.getUsers} idItemToUpdate={value} />)
        }, {
            id: 'deleteButton',
            sortable: false,
            filterable: false, width: 100,
            accessor: 'id',
            Cell: ({ value }) => (<button onClick={() => { this.confirmDelete(value) }}>Delete</button>)
        }]
        return (
            <div className="App">
                <AddUser refreshUsersList={this.getUsers} />
                <ReactTable data={this.state.cars} columns={columns} filterable={true} />
                <ToastContainer autoClose={2500} />
            </div>
        );
    }
}
export default UsersList;