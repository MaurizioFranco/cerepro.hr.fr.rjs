import React from 'react';
import SkyLight from 'react-skylight';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as Commons from '../../commons.js';
import * as Constants from '../../constants.js';

class AddCandidateStates extends React.Component {
    constructor(props) {
        super(props);
        this.state = { roleId: props.roleId || 4, statusCode: '', statusLabel: '', statusDescription: '', statusColor: '' };
        this.gridRef = React.createRef();
    }

    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }

    // Save candidate state and close modal form
    handleSubmit = (event) => {
        event.preventDefault();
        var item = {
            roleId: this.state.roleId, statusCode: this.state.statusCode, statusLabel: this.state.statusLabel,
            statusDescription: this.state.statusDescription, statusColor: this.state.statusColor            
        };
        // const formData = new FormData();
	    // formData.append("firstname", this.state.firstname);
	    // formData.append("lastname", this.state.lastname);
	    // formData.append("email", this.state.email);
	    // formData.append("password", this.password );
        // console.log(item);
        this.addCandidateState(item);
    }

    addCandidateState(item) {
        Commons.executeFetch(Constants.FULL_CANDIDATE_STATES_API_URI, "POST", this.insertSuccess, this.insertError, JSON.stringify(item), true);    
    }
    
    insertError = (err) => {
        console.log("INSERT CANDIDATE STATE KO");
        toast.error(err.errorMessage, {
            position: toast.POSITION.BOTTOM_LEFT
        });
        console.error(err)
    }

    insertSuccess = (response) => {
        console.log("INSERT CANDIDATE STATE SUCCESS");
        console.log(response);
        // if (response.status===201) {
            toast.success("Candidate State successfully inserted", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            this.gridRef.current.hide();
            this.props.refreshCandidateStateList();
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
                    <h3>New Candidate State</h3><br />
                    <form>
                        {/* <input type="text" placeholder="roleId" name="roleId"
                            onChange={this.handleChange} style={marginBottom} /><br /> */}
                        <input type="text" placeholder="statusCode" name="statusCode"
                            onChange={this.handleChange} style={marginBottom} /><br />
                        <input type="text" placeholder="statusLabel" name="statusLabel"
                            onChange={this.handleChange} style={marginBottom} /><br />
                        <input type="text" placeholder="statusDescription" name="statusDescription"
                            onChange={this.handleChange} style={marginBottom} /><br />
                        <input type="text" placeholder="statusColor" name="statusColor"
                            onChange={this.handleChange} style={moreMarginBottom} /><br />
                        <button onClick={this.handleSubmit} style={marginRight} >Save</button>
                        <button onClick={this.cancelSubmit} >Cancel</button>
                    </form>
                </SkyLight>
                <div>
                    <button style={{ 'margin': '10px' }}
                        onClick={() => this.gridRef.current.show()}>New Candidate State</button>
                </div>
            </div>
        );
    }


}
export default AddCandidateStates;
