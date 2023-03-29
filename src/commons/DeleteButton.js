import React, { Component } from "react";

import {Button} from "@material-ui/core";
import { Delete } from '@material-ui/icons';

class DeleteButton extends Component {
  render() {    
    return (
      <Button variant="contained" endIcon={<Delete />} color="secondary" onClick={this.props.onClick}>
        ELIMINA
      </Button>
    );
  }
}

export default DeleteButton ;