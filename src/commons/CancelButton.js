import React, { Component } from "react";

import {Button} from "@material-ui/core";

class CancelButton extends Component {
  render() {    
    return (
      <Button variant="contained" color="secondary" onClick={this.props.onClickFunction}>
        ANNULLA
      </Button>
      
    );
  }
}

export default CancelButton ;