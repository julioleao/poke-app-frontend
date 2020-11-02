import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authLogin } from '../../store/fetchActions';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const dispatch = useDispatch();

  function changeForm(e) {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  }

  function submitForm(e) {
    e.preventDefault();
    dispatch(authLogin(form));

    //setForm({ email: '', password: '' });
  }

  return (
    <div>
      <form
        noValidate
        onSubmit={submitForm}
        style={{
          width: '30%',
          margin: '40px auto',
        }}
      >
        <h2 className='text-center'>Login</h2>
        <div className='form-group row'>
          <label>E-mail</label>
          <input
            placeholder='user@mail.com'
            onChange={changeForm}
            name='email'
            className={'form-control'}
            value={form.email}
          />
          <label>Senha</label>
          <input
            placeholder='Infome uma senha válida'
            onChange={changeForm}
            name='password'
            className={'form-control'}
            type='password'
            value={form.password}
          />
        </div>

        <div className='form-group row mt-5'>
          <button className='btn btn-primary btn-block'>Entrar</button>
        </div>
      </form>
    </div>
  );
}
