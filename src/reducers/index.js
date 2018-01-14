import { combineReducers } from 'redux';
import user from './user';
import runtime from './runtime';
import intl from './intl';
import fechas from '../ducks/fechas';
import turnos from '../ducks/turnos';
import auth from '../ducks/auth';

export default function createRootReducer({ apolloClient }) {
  return combineReducers({
    apollo: apolloClient.reducer(),
    user,
    runtime,
    intl,
    auth,
    fechas,
    turnos,
  });
}

