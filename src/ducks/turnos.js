import fetch from 'cross-fetch';
// CONSTANTS
const FETCH_TURNOS_LIST = 'pacientes/FETCH_TURNOS_LIST';
const FETCH_ADD_TURNO = 'pacientes/FETCH_ADD_TURNO';

// ACTIONS


export function fetchTurnos() {
  return dispatch =>
    fetch('/api/turnos')
      .then(response => response.json())
      .then(json => dispatch(fetchTurnosSuccess(json)));
}

function fetchTurnosSuccess(json) {
  console.log(json.response.docs);
  return {
    type: FETCH_TURNOS_LIST,
    data: json.response.docs,
  };
}


export const fetchAddTurno = (dia, fecha, paciente, profesional, horario) => ({
  type: FETCH_ADD_TURNO,
  payload: {
    idTurno,
    fecha,
    paciente,
    profesional,
    horario,
  },
});

export const fetchPacientesAlta = () => ({
  type: FETCH_PACIENTES,
  payload: {
    id: '5',
    paciente: 'asasa',
    profesional: 'aaaa',
    horario: '12.00',
  },
});

// REDUCERS
export default function reducer(state = [], action) {
  // const newState = { ...state };
  switch (action.type) {
    case FETCH_TURNOS_LIST:
      return action.data;
    case FETCH_ADD_TURNO:
      return [...state, action.payload];
    default:
      return state;
  }
}