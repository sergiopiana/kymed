// CONSTANTS

const FETCH_FECHAS = 'fechas/FETCH_FECHAS';

// ACTIONS
export const fetchFechas = () => ({
  type: FETCH_FECHAS,
});

// REDUCERS

export default function reducer(state = [], action) {
  // const newState = { ...state };
  switch (action.type) {
    case FETCH_FECHAS:
      return [{ dia: 'viernes', fecha:'15/12/2017' }, { dia: 'viernes', fecha:'15/12/2017' }, { dia: 'viernes', fecha:'15/12/2017' }];
    default:
      return state;
  }
}
