import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>redux-obtimerable</h2>
        </div>
        <p className="App-intro">
          TIME: { this.props.time }
        </p>
      </div>
    );
  }
}

const mapStateToProps = ({ timer }) => ({ ...timer });

export default connect(mapStateToProps)(App);
