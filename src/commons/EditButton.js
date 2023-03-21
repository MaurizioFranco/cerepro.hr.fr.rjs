import React, { Component } from "react";

import {Button} from "@material-ui/core";

class EditButton extends Component {
  render() {    
    return (
      <Button variant="contained" color="primary" onClick={this.props.onClickFunction}>
        MODIFICA
      </Button>
    );
  }
}

export default EditButton ;