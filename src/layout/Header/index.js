import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import './styles.css';
import logoutService from '../../services/logout.service';

export default function Header() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  function authLogoutButton() {
    isAuthenticated && dispatch(logoutService());
  }

  return (
    <nav className='l-header navbar navbar-expand-sm navbar-dark bg-primary'>
      <NavLink to='/list' activeClassName='active' className='navbar-brand'>
        <strong>P</strong>ics<strong>M</strong>on
      </NavLink>

      <div className='collapse navbar-collapse' id='navbarColor01'>
        <ul className='navbar-nav mr-auto'>
          <li className='nav-item'>
            <NavLink to='/list' activeClassName='active' className='nav-link'>
              Listar
            </NavLink>
          </li>
          <li className='nav-item'>
            <NavLink to='/add' className='nav-link'>
              Adicionar
            </NavLink>
          </li>
        </ul>
      </div>

      <ul className='navbar-nav ml-md-auto'>
        <NavLink
          to='/login'
          activeClassName='active'
          onClick={authLogoutButton}
          className='nav-item mt-2 mr-3'
        >
          {isAuthenticated ? (
            <button
              className='btn btn-outline-secondary mr-1 mb-2'
              type='submit'
            >
              <i className='fa fa-sign-out mr-2' aria-hidden='true' />
              Logout
            </button>
          ) : (
            <button
              className='btn btn-outline-secondary mr-1 mb-2'
              type='submit'
            >
              <i className='fa fa-sign-in mr-2' aria-hidden='true' />
              Login
            </button>
          )}
        </NavLink>
      </ul>
      <ul className='navbar-nav ml-md-auto'>
        {isAuthenticated ? (
          <h5>Bem vindo {isAuthenticated}</h5>
        ) : (
          <NavLink
            to='/register'
            activeClassName='active'
            className='nav-item mt-2 mr-3'
          >
            <button
              className='btn btn-outline-secondary mr-2 mb-2'
              type='submit'
            >
              <i className='fa fa-user mr-2' aria-hidden='true' />
              Registrar-se
            </button>
          </NavLink>
        )}
      </ul>
    </nav>
  );
}
