import React, { Component } from "react";


class PageMainTitle extends Component {
  render() {    
    return (
      <h3 className={"page-title"}>{this.props.text}</h3>
    );
  }
}

export default PageMainTitle ;