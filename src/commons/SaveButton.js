import React, { Component } from "react";

import {Button} from "@material-ui/core";

class SaveButton extends Component {
  render() {    
    return (
      <Button variant="contained" color="primary" onClick={this.props.onClickFunction}>
        SALVA
      </Button>
      
    );
  }
}

export default SaveButton ;