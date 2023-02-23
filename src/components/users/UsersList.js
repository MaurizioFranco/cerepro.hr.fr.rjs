import React, { Component } from 'react';

import * as Commons from '../../commons.js';
import * as Constants from '../../constants.js';
import AddUser from './AddUser.js';


import ReactTable from "react-table-6";
import 'react-table-6/react-table.css';

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
        this.getUsers () ;
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

    
    // Delete car
    onDelClick = (id) => {
        this.deleteUser(id);
    }
    
    deleteUser(id) {
        //Commons.executeFetch(Constants.USER_API_URI+id, "DELETE", this.deleteSuccess, Commons.operationError);        
        Commons.executeDelete(Constants.USER_API_URI+id, this.deleteSuccess, Commons.operationError);   
    }
    
    operationError = (err) => {
        console.log("INSERT USER KO");
        toast.error(err.errorMessage, {
            position: toast.POSITION.BOTTOM_LEFT
        });
        console.error(err)
    }

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

    // Update car
    updateCar(car, id) {
        // console.log(car);
        // const itemToUpdate = {...car};
        // itemToUpdate.id = id ;
        // fetch(BACKEND_APPLICATION_ROOT + 'v1/cars',
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
            Header: 'id',
            accessor: 'id',
            // Cell: this.renderEditable
        }, {
            Header: 'email',
            accessor: 'email',
            // Cell: this.renderEditable
        }, {
            Header: 'firstname',
            accessor: 'firstname',
            // Cell: this.renderEditable
        }, {
            Header: 'lastname',
            accessor: 'lastname',
            // Cell: this.renderEditable
        // }, {
        //     Header: 'Price €',
        //     accessor: 'price',
        //     Cell: this.renderEditable
        }, {
            id: 'savebutton',
            sortable: false,
            filterable: false,
            width: 100,
            accessor: 'id',
            Cell: ({value, row}) =>
            (<button onClick={()=>{this.updateCar(row, value)}}>
            Save</button>)
            }, {
            id: 'delbutton',
            sortable: false,
            filterable: false, width: 100,
            accessor: 'id',
            Cell: ({ value }) => (<button onClick={() => { this.confirmDelete(value) }}>Delete</button>)
        }]
        return (
            <div className="App">
                    {/* <CSVLink data={this.state.cars} separator=";">Export CSV</CSVLink> */}
                    {/* <AddUser addUser={this.addUser} fetchCars={this.fetchCars}/> */}
                    <AddUser refreshUsersList={this.getUsers}/>
                    <ReactTable data={this.state.cars} columns={columns} filterable={true} />
                    <ToastContainer autoClose={1500} />
            </div>
        );
    }
}
export default UsersList ;