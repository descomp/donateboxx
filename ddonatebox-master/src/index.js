import React from 'react';
import ReactDOM from 'react-dom/client'; // todo this or from "react-dom"?
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import AboutUsPage from "./pages/AboutUsPage";
import DonatePage from "./pages/DonatePage";
import VolunteerPage from "./pages/VolunteerPage";
import LoginPage from "./pages/LoginPage";
import NoPage from "./pages/NoPage";

import reportWebVitals from './reportWebVitals';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="aboutus" element={<AboutUsPage />} />
          <Route path="donate" element={<DonatePage />} />
          <Route path="volunteer" element={<VolunteerPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
const root = ReactDOM.createRoot(document.getElementById('root'));
// todo could probably avert strictmode and reportwebvitals for this project!
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
