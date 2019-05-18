import React from 'react';
import { Route } from 'react-router-dom';
import './App.css';
import Home from './modules/home/Home';
import Portfolio from './modules/portfolio/Portfolio';

function App() {
  return (
    <div className="App">
      <Route path='/' exact component={Home}/>
      <Route path='/portfolio' component={Portfolio}/>
    </div>
  );
}

export default App;
