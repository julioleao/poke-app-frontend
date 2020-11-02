import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { authRegister } from '../../store/fetchActions';

import '../styles.css';

export default function Register() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const dispatch = useDispatch();

  function changeForm(e) {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  }

  function submitForm(e) {
    e.preventDefault();
    dispatch(authRegister(form));

    //setForm({ name: '', email: '', password: '', confirmPassword: '' });
  }
  return (
    <form
      noValidate={false}
      onSubmit={submitForm}
      style={{
        width: '30%',
        margin: '40px auto',
      }}
    >
      <h2 className='text-center'>Registrar</h2>

      <div className='form-group row'>
        <label>Nome</label>
        <input
          placeholder='Informe seu nome'
          onChange={changeForm}
          name='name'
          className='form-control'
          value={form.name}
        />
        <label>E-mail</label>
        <input
          placeholder='Digite um e-mail válido'
          onChange={changeForm}
          name='email'
          className='form-control'
          value={form.email}
        />
        <label>Senha</label>
        <input
          placeholder='Informe uma senha entre 4 a 20 caracteres'
          onChange={changeForm}
          name='password'
          className='form-control'
          type='password'
          value={form.password}
        />
        <label>Confirmar senha</label>
        <input
          placeholder='Confirme sua senha'
          onChange={changeForm}
          name='confirmPassword'
          className='form-control'
          type='password'
          value={form.confirmPassword}
        />
      </div>

      <div className='form-group row mt-5'>
        <button className='btn btn-primary btn-block'>Registrar-se</button>
      </div>
    </form>
  );
}
