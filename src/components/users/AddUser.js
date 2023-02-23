import React from 'react';
import SkyLight from 'react-skylight';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as Commons from '../../commons.js';
import * as Constants from '../../constants.js';

class AddUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = { brand: '', model: '', year: '', color: '', price: '' };
        this.gridRef = React.createRef();
    }

    handleChange = (event) => {
        this.setState(
            { [event.target.name]: event.target.value }
        );
    }

    // Save car and close modal form
    handleSubmit = (event) => {
        event.preventDefault();
        var item = {
            email: this.state.email, firstname: this.state.firstname,
            lastname: this.state.lastname, password: this.state.password            
        };
        // const formData = new FormData();
	    // formData.append("firstname", this.state.firstname);
	    // formData.append("lastname", this.state.lastname);
	    // formData.append("email", this.state.email);
	    // formData.append("password", this.password );
        // console.log(item);
        this.addUser(item);        
    }

    addUser(item) {
        Commons.executeFetch(Constants.USER_API_URI, "POST", this.insertSuccess, Commons.operationError, JSON.stringify(item), true);        
    }

    
    // operationError = (err) => {
    //     console.log("INSERT USER KO");
    //     toast.error(err.errorMessage, {
    //         position: toast.POSITION.BOTTOM_LEFT
    //     });
    //     console.error(err)
    // }

    insertSuccess = (response) => {
        console.log("INSERT USER SUCCESS");
        console.log(response);
        // if (response.status===201) {
            toast.success("User successfully inserted", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            this.gridRef.current.hide();
            this.props.refreshUserList();
        // } else {
            // this.insertError (response) ;
        // }
    }

    

    insertSuccess = (response) => {
        console.log("INSERT USER SUCCESS");
        console.log(response);
        // if (response.status===201) {
            toast.success("User successfully inserted", {
                position: toast.POSITION.BOTTOM_LEFT
            });
            this.gridRef.current.hide();
            this.props.refreshUserList();
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
        return (
            <div>
                <SkyLight hideOnOverlayClicked ref={this.gridRef}>
                    <h3>New user</h3>
                    <form>
                        <input type="text" placeholder="email" name="email"
                            onChange={this.handleChange} /><br />
                        <input type="text" placeholder="firstname" name="firstname"
                            onChange={this.handleChange} /><br />
                        <input type="text" placeholder="lastname" name="lastname"
                            onChange={this.handleChange} /><br />
                        <input type="password" placeholder="password" name="password"
                            onChange={this.handleChange} /><br />
                        <input type="password" placeholder="repeat-password" name="repeat-password"
                            onChange={this.handleChange} /><br />
                        <button onClick={this.handleSubmit}>Save</button>
                        <button onClick={this.cancelSubmit}>Cancel</button>
                    </form>
                </SkyLight>
                <div>
                    <button style={{ 'margin': '10px' }}
                        onClick={() => this.gridRef.current.show()}>New User</button>
                </div>
            </div>
        );
    }


}
export default AddUser;
