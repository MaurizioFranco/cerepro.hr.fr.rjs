import React, { Component } from "react";

import {Button} from "@material-ui/core";

class DeleteButton extends Component {
  render() {    
    return (
      <Button variant="contained" color="secondary" onClick={this.props.onClickFunction}>
        ELIMINA
      </Button>
    );
  }
}

export default DeleteButton ;