import React from 'react';
import { Link, Route } from 'react-router-dom';

import './App.css';
import Home from './pages/Home';
import People from './pages/People';
import Cars from './pages/Cars';
import Registry from './pages/Registry';

export default () => (
  <div>
    <nav className="nav">
      <Link className="navItem" to="/">Home</Link>
      <Link className="navItem" to="/people">People</Link>
      <Link className="navItem" to="/cars">Cars</Link>
      <Link className="navItem" to="/registry">Registry</Link>
    </nav>
    <div>
      <Route exact path="/" component={Home}/>
      <Route exact path="/people" component={People}/>
      <Route exact path="/cars" component={Cars}/>
      <Route exact path="/registry" component={Registry}/>
    </div>
  </div>
);
