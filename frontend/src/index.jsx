
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import PublicRouter from './routes/PublicRouter';
import reportWebVitals from './reportWebVitals';
import UserRouter from './routes/UserRouter';
import AuthGuard from './routes/AuthGuard';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={
          <PublicRouter />
        }
        />
        <Route path='/account/*' element={
          <AuthGuard>
            <UserRouter />
          </AuthGuard>
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

reportWebVitals();

