import React, { Component } from 'react';

import * as Commons from '../../commons.js';
import * as Constants from '../../constants.js';

import AddCoursePages from './AddCoursePage.js';

import ReactTable from "react-table-6";
import 'react-table-6/react-table.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

// import { CSVLink } from 'react-csv';

class CoursePagesList extends Component {

    constructor(props) {
        super(props);
        this.state = { coursePages: [] };
    }

    getCoursePages = () => {
        Commons.executeFetch(Constants.FULL_COURSEPAGE_API_URI, "GET", this.setCoursePages);
    }

    setCoursePages = (data) => {
        this.setState({
            coursePages: data
        });
    }

    componentDidMount() {        
        this.getCoursePages () ;
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
        Commons.executeDelete(Constants.FULL_COURSEPAGE_API_URI+id, this.deleteSuccess, Commons.operationError);   
    }

    deleteSuccess = (response) => {
        console.log("DELETE COURSE PAGE SUCCESS");
        console.log(response);
        // if (response.status===201) {
            toast.success("Course page successfully deleted", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            this.getCoursePages();
        // } else {
            // this.insertError (response) ;
        // }
    }


//     // Delete coursePage
//     onDelClick = (id) => {
//     //const accessToken = localStorage.getItem('accessToken');
//     fetch(`http://centauri.proximainformatica.com/cerepro.hr.backend/dev/api/v1/coursepage/${id}`, {
//     method: 'DELETE',
//     headers: {
//         //'Authorization': `Bearer ${accessToken}`
//         Authorization: 'Basic ' + btoa('9@9.9:9')
//       }
//   })
//     .then(response => {
//       if (response.ok) {
//         toast.success("Course page deleted successfully!", {
//           position: toast.POSITION.BOTTOM_LEFT
//         });
//         const coursePages = this.state.coursePages.filter(coursePage => coursePage.id !== id);
//         this.setState({ coursePages: coursePages });
//       } else {
//         toast.error("Error deleting the course page!", {
//           position: toast.POSITION.BOTTOM_LEFT
//         });
//       }
//     })
//     .catch(error => {
//       toast.error("Error deleting the course page!", {
//         position: toast.POSITION.BOTTOM_LEFT
//       });
//       console.error('Error:', error);
//     });
// }

    renderEditable = (cellInfo) => {
        return (
            <div
                style={{ backgroundColor: "#fafafa" }}
                contentEditable
                suppressContentEditableWarning
                onBlur={e => {
                    const data = [...this.state.coursePages];
                    data[cellInfo.index][cellInfo.column.id] =
                        e.target.innerHTML;
                    this.setState({ coursePages: data });
                }}
                dangerouslySetInnerHTML={{
                    __html: this.state.coursePages[cellInfo.index][cellInfo.column.id]
                }}
            />
        );
    }

    // Update coursePage
    updateCoursePage(coursePage, id) {
        // console.log(coursePage);
        // const itemToUpdate = {...coursePage};
        // itemToUpdate.id = id ;
        // fetch(BACKEND_APPLICATION_ROOT + 'v1/coursePages',
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
            Header: 'Title',
            accessor: 'title',
            width: 350,
            // Cell: this.renderEditable
        }, {
            Header: 'Code',
            accessor: 'code',
            width: 135,
            // Cell: this.renderEditable
        }, {
            Header: 'Body Text',
            accessor: 'bodyText',
            // Cell: this.renderEditable
        }, {
            Header: 'File Name',
            accessor: 'fileName',
            width: 70,
            // Cell: this.renderEditable
        }, {
            id: 'savebutton',
            sortable: false,
            filterable: false,
            width: 70,
            accessor: 'id',
            Cell: ({value, row}) =>
            (<button onClick={()=>{this.updateCoursePage(row, value)}}>
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
                    {/* <CSVLink data={this.state.coursePages} separator=";">Export CSV</CSVLink> */}
                    {/* <AddCoursePages addCoursePages={this.addCoursePages} fetchCoursePages={this.fetchCoursePages}/> */}
                    <AddCoursePages refreshCoursePagesList={this.getCoursePages}/>
                    <ReactTable
                    data={this.state.coursePages} 
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
export default CoursePagesList ;