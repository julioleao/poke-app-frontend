import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Cards from '../../components/Cards';
import logo from '../../assets/logo.png';
import { getAllCards, getCard } from '../../store/fetchActions';

import './style.css';

export default function List() {
  const item = useSelector((state) => state);
  const [query, setQuery] = useState({ name: '' });
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCards());
  }, [dispatch]);

  /* const fetchSearchResults = (query) => {
    const url = `https://api.pokemontcg.io/v1/cards?name=${query}`;
    if (this.cancel) {
      this.cancel.cancel();
    }

    this.cancel = Axios.CancelToken.source();
    Axios.get(url, { cancelToken: this.cancel.token })
      .then((res) => {
        this.setState({ cards: res.data.cards });
      })
      .catch((error) => {
        if (Axios.isCancel(error) || error) {
          this.setState({
            loading: false,
            message: 'Falha ao encontrar o valor digitado',
          });
        }
      });
  };
 */
  const onChange = (e) => {
    setQuery({ ...query, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    dispatch(getCard(query.name));
    /* dispatch(showMessage());
    setTimeout(() => {
      dispatch(hideMessage());
    }, 2500); */
  };

  return (
    <div>
      <div className='container'>
        <div className='d-flex justify-content-center'>
          <img src={logo} alt='cur' height={350} width={700} />
        </div>
        <form
          className='form-inline d-flex justify-content-center md-form form-sm active-cyan mt-2'
          onSubmit={onSubmit}
        >
          <i className='fa fa-search' aria-hidden='true'></i>
          <input
            className='form-control form-control-sm ml-3 w-75'
            name='name'
            type='text'
            placeholder='Buscar...'
            aria-label='Search'
            value={query.name}
            onChange={onChange}
          />
        </form>
      </div>

      <div className='container-fluid'>
        <div className='row mt-5'>
          {item.cards.map((cards, index) => (
            <Cards key={index} cards={cards} />
          ))}
        </div>
      </div>
    </div>
  );
}
