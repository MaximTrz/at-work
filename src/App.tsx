import React from 'react';

import Router from './routes';
import Header from './components/Header';
import './styles/vendors.scss';
import './styles/base.scss';

const App = () => (
  <>
    <Header />
    <main className="main">
      <div className="container">
        <Router />
      </div>
    </main>
  </>
);

export default App;
