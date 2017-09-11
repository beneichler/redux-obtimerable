import React, { Component } from 'react';
import { connect } from 'react-redux';
import logo from './logo.svg';
import { stop, start, reset, toggleAuto } from './ducks/timer';
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
        <div>
          <button onClick={ this.props.start }>Start ticking</button>
          <button onClick={ this.props.stop }>Stop ticking</button>
        </div>
        <div>
          <button onClick={() => this.props.reset(false) }>Reset</button>
        </div>
        <div style={{ marginTop: '100px', display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-around' }}>
          <div>
            <button
              style={{ flexBasis: 0.5 }}
              onClick={ this.props.toggleAuto }
            >
              Auto reset: { this.props.auto ? 'ON' : 'OFF' }
            </button>
          </div>
          <div style={{ width: '200px', border: '1px dotted blue', backgroundColor: 'lightblue' }}>
            Your most recent keypress was the [<strong>{ this.props.mostRecentKey }</strong>] key.
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ timer }) => ({ ...timer });
const dispatchToPropsMap = { stop, start, reset, toggleAuto };

export default connect(mapStateToProps, dispatchToPropsMap)(App);
