import React, { Component } from "react";

import {Button} from "@material-ui/core";
import { Edit } from '@material-ui/icons';

class EditButton extends Component {
  render() {    
    return (
      <Button variant="contained" endIcon={<Edit />} color="primary" onClick={this.props.onClick}>
        MODIFICA
      </Button>
    );
  }
}

export default EditButton ;