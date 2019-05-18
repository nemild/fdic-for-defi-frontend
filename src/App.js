import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Header from './modules/header/Header';
import Home from './modules/home/Home';
import Portfolio from './modules/portfolio/Portfolio';

function App() {
  return (
    <div className="App">
        <Header hideName={false} />
        <Route exact path='/' component={Home}/>
        <Route path='/porfolio' component={Portfolio}/>
    </div>
  );
}

export default App;
