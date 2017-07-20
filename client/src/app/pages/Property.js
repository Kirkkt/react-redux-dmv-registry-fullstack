import React, { Component } from 'react';

export default class Property extends Component {
  onClick = () => {
    const newProperty = prompt("Update property", this.props.property)
    newProperty && this.props.update(newProperty)
  }
  render() {
    return (
      <span onClick={this.onClick}>
        {this.props.property}
      </span>
    )
  }
}