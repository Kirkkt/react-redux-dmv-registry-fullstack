import React, { Component } from 'react';

import logo from './logo.svg';
import './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div className="Home">
        <div className="Home-header">
          <img src={logo} className="Home-logo" alt="logo" />
          <h2>Welcome to the registry</h2>
        </div>
      </div>
    );
  }
}
