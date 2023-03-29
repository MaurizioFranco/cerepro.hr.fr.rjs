import React, { Component } from "react";

import styles from "../styles";
import {Button} from "@material-ui/core";
import { Refresh } from '@material-ui/icons';

class ResetButton extends Component {
  render() {    
    return (
      <Button variant="contained" endIcon={<Refresh />} style={styles.resetButton} onClick={this.props.onClick} id="buttonResetForm">
        RESET
      </Button>
    );
  }
}

export default ResetButton ;