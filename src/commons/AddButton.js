import React, { Component } from "react";

import {Button} from "@material-ui/core";
import styles from "../styles.js";

class AddButton extends Component {
  render() {    
    return (
      <Button variant="contained" className={"add-button"} style={styles.addButton} onClick={this.props.onClick}>
        +
      </Button>
      
    );
  }
}

export default AddButton ;