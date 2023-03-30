import React from 'react';

import { Switch } from '@material-ui/core';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import * as Commons from '../../commons.js';
import * as Constants from '../../constants.js';

class UpdateUserEnabled extends React.Component {
    constructor(props) {
        super(props);
        this.state = {enabled: false};
    }
    
    updateEnabled = () => {
        const { enabled } = this.state;
        const newEnabledState = !enabled;
        Commons.executeFetch(
            Constants.USER_API_URI + this.props.idItemToUpdate,
            "PATCH",
            this.updateSuccess,
            Commons.operationError,
            {'Content-Type': 'application/json'},
            JSON.stringify({ enabled: newEnabledState }),
            true
        );
    }
    
    updateSuccess = (response) => {
        if (this.state.enabled) {
            console.log("USER DISABLED SUCCESSFULLY");
            console.log(response);
            toast.success("User successfully disabled", {position: toast.POSITION.BOTTOM_LEFT});
        } else {
            console.log("USER ENABLED SUCCESSFULLY");
            console.log(response);
            toast.success("User successfully enabled", {position: toast.POSITION.BOTTOM_LEFT});
        }
        this.setState(prevState => ({ enabled: !prevState.enabled }));
        this.props.refreshUsersList();
    }
    
    componentDidMount() {
        console.log(this.props.idItemToUpdate);
        this.getItemById();
    }
    
    getItemById = () => {
        Commons.executeFetch(Constants.USER_API_URI + this.props.idItemToUpdate, "GET", this.setItemToUpdate);
    }
    
    setItemToUpdate = (responseData) => {
        this.setState({
            enabled: responseData.enabled
        });
        console.log(this.state.enabled);
    }
    
    render() {
        const { enabled } = this.state;
        return (
            <div>
                <Switch
                    checked={enabled}
                    onChange={this.updateEnabled}
                    color="secondary"
                />
            </div>
        );
    }
}

export default UpdateUserEnabled;