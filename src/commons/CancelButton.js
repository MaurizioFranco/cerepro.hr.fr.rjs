import React, { Component } from "react";

import {Button} from "@material-ui/core";
import { Cancel } from '@material-ui/icons';
import styles from "../styles.js";

class CancelButton extends Component {
  render() {    
    return (
      <Button variant="contained" endIcon={<Cancel />} style={styles.cancelButton} onClick={this.props.onClick}>
        ANNULLA
      </Button>
      
    );
  }
}

export default CancelButton ;