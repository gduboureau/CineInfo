import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/header/Layout';
import Watchlist from '../pages/account/Watchlist'
import Favorites from '../pages/account/Favorites';
import Settings from '../pages/account/Settings'
import Ratings from '../pages/account/Ratings';
import Error from '../utils/Error';

const UserRouter = () => {

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/:username" element={<Watchlist />} />
        <Route path="/:username/ratings" element={<Ratings />} />
        <Route path="/:username/watchlist" element={<Watchlist />} />
        <Route path="/:username/favorites" element={<Favorites />} />
        <Route path="/:username/settings" element={<Settings />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default UserRouter;
