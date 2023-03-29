import React, { Component } from "react";

import {Button} from "@material-ui/core";
import { Save } from '@material-ui/icons';
import styles from "../styles.js";

class SaveButton extends Component {
  render() {    
    return (
      <Button variant="contained" endIcon={<Save />} style={styles.saveButton} onClick={this.props.onClick} disabled={this.props.disabled}>
        SALVA
      </Button>
      
    );
  }
}

export default SaveButton ;