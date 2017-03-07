import React, { Component } from 'react';
import './App.css';
import Cards from './Cards.js';
import Board from './Board.js';
import Toolbar from './Toolbar.js';
import Ops from './Ops.js';
import Score from './Score.js';
import Eqs from './Eqs.js';
import * as actionCreators from './actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class App extends Component {

  render() {
    return (
      <div className="App">
        <h1 className="Title">Krypto!</h1>
        <p className="Lead">Use the cards and basic arithmetic to reach the target number below.</p>
        <p>You must use all of the cards exactly once</p>
        <p className="Instructions">Whole and non-negative numbers only</p>
        <Toolbar {...this.props}/>
        <Ops {...this.props}/>
        <Cards {...this.props}/>
        <Board {...this.props}/>
        <Eqs {...this.props}/>
        <Score {...this.props}/>
        <footer>
        <p>
          Read more about 
          <a href="https://en.wikipedia.org/wiki/Krypto_(game)">
          Krypto</a>
        </p>
        <p>See the code for this <a href="https://github.com/kdivringi/krypto">here</a></p>
        <p>Read about this on my <a href="http://kdivringi.github.io/new-version-of-krypto-in-react.html#new-version-of-krypto-in-react">blog</a></p>
        </footer>  
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}


export default connect(state => state, mapDispatchToProps)(App);
