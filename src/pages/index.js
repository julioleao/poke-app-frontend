import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import { addMessage } from '../store/ducks/layout';

import List from './List';
import Login from './Login';
import Register from './Register';
import Add from './Add';

function PrivateRoute({ component: Component, ...rest }) {
  const { isAdmin } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  return (
    <Route
      {...rest}
      render={(props) =>
        JSON.parse(isAdmin) ? (
          <Component {...props} />
        ) : (
          dispatch(addMessage('Entre como usuário Administrador')) && (
            <Redirect to={{ pathname: '/', state: { from: props.location } }} />
          )
        )
      }
    />
  );
}

export default () => (
  <Switch>
    <Route path='/list' component={List} />
    <PrivateRoute path='/add' component={Add} />
    <Route path='/login' component={Login} />
    <Route path='/register' component={Register} />
    <Redirect path='/' to='/list' />
  </Switch>
);
