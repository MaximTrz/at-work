import React, { FunctionComponent, lazy, Suspense } from 'react';
import { Spin } from 'antd';
import { Routes, Route } from 'react-router-dom';

import Home from './Home';

const Users = lazy(() => import('./Users'));
const UserProfile = lazy(() => import('../components/partials/UserProfile'));

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
    <Route
      path="user/:userId"
      element={
        <Suspense fallback={<Spin />}>
          <UserProfile />
        </Suspense>
      }
    />
  </Routes>
);

export default Router;
