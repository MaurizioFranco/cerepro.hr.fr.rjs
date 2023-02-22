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

    setUsers = (data) => {
        this.setState({
            cars: data
        });
    }

    componentDidMount() {        
        Commons.executeFetch(Constants.USER_API_URI, "GET", this.setUsers);
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

    insertError = (err) => {
        toast.error("Error when deleting", {
            position: toast.POSITION.BOTTOM_LEFT
        });
        console.error(err)
    }

    // Delete car
    onDelClick = (id) => {
        // fetch(BACKEND_APPLICATION_ROOT + 'v1/cars/' + id, { method: 'DELETE' })
        // .then(res => {
        //         if (res.status===200) {
        //             toast.success("Car deleted OK!!!!!!!!", {
        //             position: toast.POSITION.BOTTOM_LEFT
        //             });
        //             this.fetchCars();
        //         } else {
        //             this.insertError (res) ;
        //         }
        //     })
        //     .catch(err => {
        //         this.insertError (err) ;            
        //     })
    }

    // Add new car
    addCar(car) {
        // fetch(BACKEND_APPLICATION_ROOT + 'v1/cars',
        //     {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(car)
        //     })
        //     .then(res => this.fetchCars())
        //     .catch(err => console.error(err))
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
            Cell: this.renderEditable
        }, {
            Header: 'firstname',
            accessor: 'firstname',
            Cell: this.renderEditable
        }, {
            Header: 'lastname',
            accessor: 'lastname',
            Cell: this.renderEditable
        }, {
            Header: 'Price €',
            accessor: 'price',
            Cell: this.renderEditable
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
                    <AddUser addCar={this.addCar} fetchCars={this.fetchCars}/>
                    <ReactTable data={this.state.cars} columns={columns} filterable={true} />
                    <ToastContainer autoClose={1500} />
            </div>
        );
    }
}
export default UsersList ;