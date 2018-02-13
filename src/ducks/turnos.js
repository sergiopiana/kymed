import fetch from 'cross-fetch';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
// CONSTANTS

const FETCH_TURNOS_LIST = 'pacientes/FETCH_TURNOS_LIST';
const FETCH_ADD_TURNO = 'pacientes/FETCH_ADD_TURNO';

// ACTIONS

export function fetchTurnos(fecha){
  //let fechaDate = new Date(fecha);
  moment().locale('es')
  moment().tz('America/Argentina/Buenos_Aires')
  let fecha1 = moment(fecha).add(0, 'days').format('DD-MM-YYYY')
  let fecha2 = moment(fecha).add(1, 'days').format('DD-MM-YYYY')
  let fecha3 = moment(fecha).add(2, 'days').format('DD-MM-YYYY')
  let fecha4 = moment(fecha).add(3, 'days').format('DD-MM-YYYY')
  let fecha5 = moment(fecha).add(4, 'days').format('DD-MM-YYYY')
    return dispatch =>
      fetch('/api/turnos?fecha='+fecha1)
        .then(response => response.json())
        .then(json => dispatch(fetchTurnosSuccess(json,fecha)))
        .then(
        fetch('/api/turnos?fecha='+fecha2)
        .then(response => response.json())
        .then(json => dispatch(fetchTurnosSuccess(json,fecha))))    
        .then(
        fetch('/api/turnos?fecha='+fecha3)
        .then(response => response.json())
        .then(json => dispatch(fetchTurnosSuccess(json,fecha))))   
        .then(
        fetch('/api/turnos?fecha='+fecha4)
        .then(response => response.json())
        .then(json => dispatch(fetchTurnosSuccess(json,fecha))))   
        .then(
        fetch('/api/turnos?fecha='+fecha5)
        .then(response => response.json())
        .then(json => dispatch(fetchTurnosSuccess(json,fecha))))                         
}


function fetchTurnosSuccess(json,fecha) {
 // console.log(json.response.docs);
  return {
    type: FETCH_TURNOS_LIST,
    data: json.response.docs,
    fecha: fecha,
  };
}

export function fetchTurnosAdd(fecha, paciente, profesional, horario) {
  return dispatch =>
  state = {},
    fetch('/api/addTurnos?fecha='+fecha+'&paciente='+paciente+'&profesional='+profesional+'&horario='+horario)
      .then(response => response.json())
      .then(json => dispatch(fetchTurnos(fecha)));
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
      return [...state,action.data];
      
    case FETCH_ADD_TURNO:
      return [...state, action.payload];
    default:
      return state;
  }
}
