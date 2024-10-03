import React, { FunctionComponent, lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Routes, Route } from 'react-router-dom';

import Home from './Home';

const Users = lazy(() => import('./Users'));

const Router: FunctionComponent = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route
      path="users"
      element={
        <Suspense fallback={<Spin />}>
          <Users />
        </Suspense>
      }
    />
  </Routes>
);

export default Router;
