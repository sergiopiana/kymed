import { combineReducers } from 'redux';
import user from './user';
import auth from './auth';
import runtime from './runtime';
import intl from './intl';
import fechas from '../ducks/fechas';
import pacientes from '../ducks/pacientes';

export default function createRootReducer({ apolloClient }) {
  return combineReducers({
    apollo: apolloClient.reducer(),
    user,
    auth,
    runtime,
    intl,
    fechas,
    pacientes,
  });
}

