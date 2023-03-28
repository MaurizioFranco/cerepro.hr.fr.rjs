import React, { Component } from "react";

import {Button} from "@material-ui/core";
import styles from "../styles.js";

class CancelButton extends Component {
  render() {    
    return (
      <Button variant="contained" style={styles.cancelButton} onClick={this.props.onClickFunction}>
        ANNULLA
      </Button>
      
    );
  }
}

export default CancelButton ;