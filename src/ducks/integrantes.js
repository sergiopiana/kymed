import request from 'request';
// CONSTANTS
const FETCH_INTEGRANTES = 'integrantes/FETCH_INTEGRANTES';

// ACTIONS
//  export const fetchIntegrantes = () => ({
//  type: FETCH_INTEGRANTES,
// });

export const fetchIntegrantesSuccess = data => ({
  type: FETCH_INTEGRANTES,
  data,
});

export const fetchIntegrantes = () => dispatch => {
  const options = {
    uri: 'http://localhost:3000/obtenerIntegrantes',
    method: 'POST',
    json: {
      contra: '0801415',
    },
  };
  request(options, (err, rsp, body) => {
    // if (err) console.log('Error en el servicio integrantes');
    if (!err && rsp.statusCode === 200) {
      // console.log('Integrantes:' + JSON.stringify(body));
      dispatch(fetchIntegrantesSuccess(body));
    }
  });
};

// REDUCERS

export default function reducer(state = [], action) {
  // const newState = { ...state };
  switch (action.type) {
    case FETCH_INTEGRANTES:
      return action.data; // [{ label: 'INTE 1' }, { label: 'INTE 2' }, { label: 'INTE 3' }];
    default:
      return state;
  }
}
