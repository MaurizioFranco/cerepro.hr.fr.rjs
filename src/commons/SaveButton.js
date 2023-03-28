import React, { Component } from "react";

import {Button} from "@material-ui/core";
import styles from "../styles.js";

class SaveButton extends Component {
  render() {    
    return (
      <Button variant="contained" style={styles.saveButton} onClick={this.props.onClickFunction}>
        SALVA
      </Button>
      
    );
  }
}

export default SaveButton ;