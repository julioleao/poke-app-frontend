import { configureStore } from '@reduxjs/toolkit';

import authReducer from './ducks/auth';
import cardsReducer from './ducks/cards';
import showMessage from './ducks/layout';

export default configureStore({
  reducer: {
    auth: authReducer,
    cards: cardsReducer,
    msg: showMessage,
  },
});
