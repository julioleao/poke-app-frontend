import Axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCardFetch } from '../../store/fetchActions';

export default function Add() {
  const [form, setForm] = useState({ name: '', img: '' });
  const [image, setImage] = useState('');
  const [preview, setPreview] = useState('');
  /* const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(false); */

  const dispatch = useDispatch();
  const CLOUDINARY_URL =
    'https://api.cloudinary.com/v1_1/dpyt7xsiy/image/upload';
  const CLOUDINARY_UPLOAD_PRESET = 'oto9jwoi';

  // eslint-disable-next-line
  const handleFileInputChange = (e) => {
    if (e.target.type === 'file') {
      const file = e.target.files[0];
      const { name } = file;
      setForm({ ...form, img: name });
      previewFile(file);
    }

    if (e.target.type === 'text') {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreview(reader.result);
    };

    setImage(file.name);
  };

  // eslint-disable-next-line
  const onSubmitFile = (e) => {
    e.preventDefault();
    if (!preview) return;

    uploadImage();
    console.log(image);
  };

  const uploadImage = async () => {
    const formData = new FormData();
    formData.append('file', preview);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

    try {
      await Axios.post(CLOUDINARY_URL, formData).then((res) =>
        setImage(res.data.url)
      );
    } catch (error) {
      console.error(error);
    }
  };

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

    /* const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    setLoading(true);
    await Axios.post(CLOUDINARY_URL, formData)
      .then((res) => {
        const url = res.data.url;
        setForm({ ...form, img: url });
      })
      .catch(console.log); */

    dispatch(addCardFetch(form));
    //setForm({ name: '', img: '' });
  };

  return (
    <div>
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
        <div className='d-flex justify-content-center'>
          {preview && (
            <img src={preview} alt='pic' style={{ height: '300px' }} />
          )}
        </div>

        <div>
          <label>Imagem</label>
          <div className='form-group'>
            <input
              type='text'
              name='img'
              accept='.jpeg, .png, .jpg'
              className='form-control'
              placeholder='Insira a URL da imagem'
              value={form.img}
              onChange={formChange}
            />
          </div>
        </div>

        <div className='mt-4'>
          <button className='btn btn-primary btn-block' type='submit'>
            Adicionar
          </button>
        </div>
      </form>
    </div>
  );
}
