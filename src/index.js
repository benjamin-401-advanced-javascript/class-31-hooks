import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import LoginContext from './components/auth/context';

import ToDo from './components/todo/todo';
import Header from './components/header/header';

import './site.scss';

require('dotenv').config();

function App() {
  return (
    <BrowserRouter>
      <LoginContext>
        <Header />
        <ToDo />
      </LoginContext>
    </BrowserRouter>
  );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
