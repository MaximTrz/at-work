import React from 'react';
import { Link } from 'react-router-dom';
import Router from './routes';
import './styles/vendors.scss';
import './styles/base.scss';

const App = () => (
  <>
    <p>App Works!</p>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/about">About</Link>
      </li>
    </ul>
    <main className="main">
      <div className="container">
        <Router />
      </div>
    </main>
  </>
);

export default App;
