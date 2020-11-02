import api from '../../services/api';
import { addCard, addCards } from '../ducks/cards';
import { login, register } from '../ducks/auth';
import { addMessage } from '../ducks/layout';

export const getAllCards = () => {
  return (dispatch) => {
    api
      .get('/cards')
      .then((res) => dispatch(addCards(res.data)))
      .catch(console.log);
  };
};

export const getCard = (name) => {
  return (dispatch) => {
    api
      .get(`/cards/search?name=${name}`, {
        params: {
          card: name,
        },
      })
      .then((res) => dispatch(addCards(res.data)))
      .catch(console.log);
  };
};

export const addCardFetch = (card) => {
  return (dispatch) => {
    api
      .post('/cards', card)
      .then((res) => dispatch(addCard(res.data)))
      .catch(console.log);
  };
};

export const authLogin = (user) => {
  return (dispatch) => {
    api
      .post('/login', user)
      .then((res) => {
        localStorage.setItem('email', res.data.email);
        localStorage.setItem('isAdmin', res.data.isAdmin);
        dispatch(login(res.data));
        res.data.isAdmin
          ? (window.location.pathname = '/add')
          : (window.location.pathname = '/list');
      })
      .catch((e) => {
        e.response.data.errors.forEach((e) => dispatch(addMessage(e)));
      });
  };
};

export const authRegister = (user) => {
  return (dispatch) => {
    api
      .post('/register', user)
      .then((res) => {
        localStorage.setItem('email', res.data.email);
        dispatch(register());
        window.location.pathname = '/list';
      })
      .catch((e) => {
        e.response.data.errors.forEach((e) => dispatch(addMessage(e)));
      });
  };
};
