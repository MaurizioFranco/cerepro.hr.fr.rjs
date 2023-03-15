import React from 'react';
import SkyLight from 'react-skylight';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as Commons from '../../commons.js';
import * as Constants from '../../constants.js';

class UpdateUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = { idItemToLoad: null, email: '', firstname: '', lastname: '' };
        this.gridRef = React.createRef();
    }

    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }

    handleSubmit = (event) => {
        event.preventDefault();
        var item = {
            email: this.state.email, firstname: this.state.firstname,
            lastname: this.state.lastname
        };
        Commons.executeFetch(Constants.USER_API_URI+this.props.idItemToUpdate, "PUT", this.updateSuccess, Commons.operationError, JSON.stringify(item), true);
    }

    updateSuccess = (response) => {
        // console.log("UPDATE USER SUCCESSFULLY");
        // console.log(response);
        // toast.success("User successfully updated", {
        //     position: toast.POSITION.BOTTOM_LEFT
        // });
        Commons.operationSuccess();
        this.gridRef.current.hide();
        this.props.refreshUsersList();
    }

    cancelSubmit = (event) => {
        event.preventDefault();
        this.gridRef.current.hide();
    }

    initializeAndShow = () => {
        console.log(this.props.idItemToUpdate);
        this.getItemById();
        this.gridRef.current.show();
    }

    getItemById = () => {
        Commons.executeFetch(Constants.USER_API_URI + this.props.idItemToUpdate, "GET", this.setItemToUpdate);
    }

    setItemToUpdate = (responseData) => {
        this.setState({
            itemLoaded: true,
            email: responseData.email,
            firstname: responseData.firstname,
            lastname: responseData.lastname
        });
    }

    render() {
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref={this.gridRef}>
                    <h3>Update user</h3>
                    <form>
                        <input type="text" placeholder="email" name="email"
                            onChange={this.handleChange} value={this.state.email} /><br />
                        <input type="text" placeholder="firstname" name="firstname"
                            onChange={this.handleChange} value={this.state.firstname}/><br />
                        <input type="text" placeholder="lastname" name="lastname"
                            onChange={this.handleChange} value={this.state.lastname}/><br />                        
                        <button onClick={this.handleSubmit}>Save</button>
                        <button onClick={this.cancelSubmit}>Cancel</button>
                    </form>
                </SkyLight>
                <div>
                    <button onClick={() => this.initializeAndShow()}>Update</button>
                </div>
            </div>
        );
    }


}
export default UpdateUser;
