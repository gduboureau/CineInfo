
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import PublicRouter from './routes/PublicRouter';
import reportWebVitals from './reportWebVitals';

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

reportWebVitals();

