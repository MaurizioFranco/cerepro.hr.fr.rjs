import React, { Component } from "react";


class PageMainTitle extends Component {
  render() {    
    return (
      <h3 style={this.props.style} className={"page-title"}>{this.props.text}</h3>
    );
  }
}

export default PageMainTitle ;