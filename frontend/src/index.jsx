
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import PublicRouter from './pages/routers/PublicRouter'

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={
            <PublicRouter /> 
        }
        />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router />
  </React.StrictMode>
);

