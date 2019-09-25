import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import { LoginContext } from './context';

const If = (props) => {
  return props.condition ? props.children : null;
};

export default function Auth(props) {
  const context = useContext(LoginContext);

  const okToRender = context.loggedIn
    && (props.capability
      ? context.user.capabilities && context.user.capabilities.includes(props.capability)
      : true);

  return <If condition={okToRender}>{props.children}</If>;
}

Auth.propTypes = {
  capability: PropTypes.string.isRequired,
  children: PropTypes.object,
};
