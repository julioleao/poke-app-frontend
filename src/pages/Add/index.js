import Axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addMessage } from '../../store/ducks/layout';
import { addCardFetch } from '../../store/fetchActions';

export default function Add() {
  const [form, setForm] = useState({ name: '', img: {} });
  const [image, setImage] = useState('');
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const CLOUDINARY_URL =
    'https://api.cloudinary.com/v1_1/dpyt7xsiy/image/upload';
  const CLOUDINARY_UPLOAD_PRESET = 'oto9jwoi';

  const formChange = (e) => {
    //setForm({ ...form, [e.target.name]: e.target.value });
    if (e.target.type === 'file') {
      setImage(e.target.files[0]);
      setForm({ ...form, img: e.target.files[0].name });
    }

    if (e.target.type === 'text') {
      setForm({ ...form, [e.target.name]: e.target.value });
    }

    console.log(image);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    setLoading(true);
    await Axios.post(CLOUDINARY_URL, formData)
      .then((res) => {
        const url = res.data.url;
        setForm({ ...form, img: url });
      })
      .catch(console.log);

    setForm({ ...form, img: 'teste' });
    console.log(form);
    dispatch(addCardFetch(form));
    setForm({ name: '', img: {} });
    dispatch(addMessage('Item inserido com sucesso!'));
  };
  /* const onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.name);
  };

  const _handleReaderLoaded = (readerEvt) => {
    let binaryString = readerEvt.target.result;

    this.setState({
      img: btoa(binaryString),
    });
  };

  const onChange = (e) => {
    if (e.target.type === 'file') {
      console.log('file to upload: ', e.target.files[0]);
      let file = e.target.files[0];

      if (file) {
        const reader = new FileReader();

        reader.onload = this._handleReaderLoaded.bind(this);

        reader.readAsBinaryString(file);
      }
    } else {
      console.log('Name: ', e.target.value);
      this.setState({ name: e.target.value });
    }
  };

  const onFileSubmit = (e) => {
    e.preventDefault();
    console.log('binary string: ', this.state.img);
    console.log('name: ', this.state.name);

    this.setState({ name: '', img: '' });

    const url = `http://localhost:3003/cards/${this.props.cards.id}`;
    const preview = document.getElementById('profile-picture');
    console.log('binary string: ', this.state.img);
    let payload = { img: this.state.img };
    Axios.patch(url, JSON.stringify(payload))
      .then((resp) => resp.json())
      .then((json) => console.log(json));

    preview.src = 'data:image/png;base64,' + this.state.img; 
  }; */
  return (
    <form className='container mt-5' onSubmit={onSubmit}>
      <div className='form-group'>
        <label>Nome</label>
        <input
          type='text'
          name='name'
          className='form-control'
          placeholder='Nome do Pokémon'
          onChange={formChange}
          value={form.name}
        />
      </div>
      <label>Imagem</label>
      <div className='form-group'>
        <input
          type='file'
          name='img'
          accept='.jpeg, .png, .jpg'
          placeholder='Insira uma imagem'
          onChange={formChange}
        />
      </div>
      <div className='mt-4'>
        <button className='btn btn-primary btn-block' type='submit'>
          Adicionar
        </button>
      </div>
    </form>
  );
}
