import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom"

import './App.css';

//Components
import Feed from "./components/Feed/Feed"
import SearchBox from "./components/SearchBox/SearchBox"


function App() {

  return (
    <Router >
      <div className="App">
        <Route path="/" exact component={SearchBox}></Route>
        <Route path="/feed" component={Feed}></Route>


      </div>
    </Router>

  );
}

export default App;
