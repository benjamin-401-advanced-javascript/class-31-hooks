import React, { useState, useContext } from 'react';
import superagent from 'superagent';
import { LoginContext } from './context';

const API = process.env.REACT_APP_API;

const If = (props) => {
  return props.condition ? props.children : null;
};

export default function Login(props) {
  const [username, setusername] = useState('username');
  const [password, setpassword] = useState('password');
  const context = useContext(LoginContext);

  function handlePasswordChange(e) {
    setpassword(e.target.value);
  }

  function handleUsernameChange(e) {
    setusername(e.target.value);
  }

  function handleSubmit(e, loginMethodFromContext) {
    e.preventDefault();
    superagent
      .post(`${API}/signin`)
      .auth(username, password)
      .then((response) => {
        const token = response.text;
        loginMethodFromContext(token);
      })
      .catch(console.error);
  }


  return (
    <>
      <If condition={context.loggedIn}>
        <button onClick={context.logout}>
          Log Out
                </button>
      </If>
      <If condition={!context.loggedIn}>
        <div>
          <form onSubmit={(e) => handleSubmit(e, context.login)}>
            <input
              placeholder="username"
              name="username"
              onChange={handleUsernameChange}
            />
            <input
              placeholder="password"
              name="password"
              type="password"
              onChange={handlePasswordChange}
            />
            <input type="submit" value="login" />
          </form>
        </div>
      </If>
    </>
  );
}
