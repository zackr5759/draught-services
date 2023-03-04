import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Main from './Main';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
// import Demo from './BoxAttributes';
import AddRoute from './Components/InputComponents/AddRoute';

ReactDOM.render(
    <BrowserRouter>
      <React.StrictMode>
        <Main />
      </React.StrictMode>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
