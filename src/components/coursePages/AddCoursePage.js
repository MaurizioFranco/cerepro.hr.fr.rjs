import React from 'react';
import SkyLight from 'react-skylight';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as Commons from '../../commons.js';
import * as Constants from '../../constants.js';

class AddCoursePages extends React.Component {
    constructor(props) {
        super(props);
        this.state = { title: '', code: '', bodyText: '', fileName: '' };
        this.gridRef = React.createRef();
    }

    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }

    // Save course page and close modal form
    handleSubmit = (event) => {
        event.preventDefault();
        var item = {
            title: this.state.title, code: this.state.code, bodyText: this.state.bodyText,
            fileName: this.state.fileName         
        };
        // const formData = new FormData();
	    // formData.append("firstname", this.state.firstname);
	    // formData.append("lastname", this.state.lastname);
	    // formData.append("email", this.state.email);
	    // formData.append("password", this.password );
        // console.log(item);
        this.addCoursePage(item);
    }

    addCoursePage(item) {
        Commons.executeFetch(Constants.FULL_COURSEPAGE_API_URI, "POST", this.insertSuccess, this.insertError, JSON.stringify(item), true);    
    }
    
    insertError = (err) => {
        console.log("INSERT COURSE PAGE KO");
        toast.error(err.errorMessage, {
            position: toast.POSITION.BOTTOM_LEFT
        });
        console.error(err)
    }

    insertSuccess = (response) => {
        console.log("INSERT COURSE PAGE SUCCESS");
        console.log(response);
        // if (response.status===201) {
            toast.success("Course Page successfully inserted", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            this.gridRef.current.hide();
            this.props.refreshCoursePageList();
        // } else {
            // this.insertError (response) ;
        // }
    }

    // Cancel and close modal form
    cancelSubmit = (event) => {
        event.preventDefault();
        this.gridRef.current.hide();
    }

    render() {
        const marginBottom = { marginBottom: '7px' };
        const marginRight = { marginRight: '14px' };
        const moreMarginBottom = { marginBottom: '28px' };
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref={this.gridRef}>
                    <h3>New Course Page</h3><br />
                    <form>
                        <input type="text" placeholder="title" name="title"
                            onChange={this.handleChange} style={marginBottom} /><br />
                        <input type="text" placeholder="code" name="code"
                            onChange={this.handleChange} style={marginBottom} /><br />
                        <input type="text" placeholder="bodyText" name="bodyText"
                            onChange={this.handleChange} style={marginBottom} /><br />
                        <input type="text" placeholder="fileName" name="fileName"
                            onChange={this.handleChange} style={moreMarginBottom} /><br />
                        <button onClick={this.handleSubmit} style={marginRight} >Save</button>
                        <button onClick={this.cancelSubmit} >Cancel</button>
                    </form>
                </SkyLight>
                <div>
                    <button style={{ 'margin': '10px' }}
                        onClick={() => this.gridRef.current.show()}>New Course Page</button>
                </div>
            </div>
        );
    }


}
export default AddCoursePages;