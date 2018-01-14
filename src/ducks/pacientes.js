import axios from 'axios';
// CONSTANTS
const FETCH_PACIENTES = 'pacientes/FETCH_PACIENTES';
const FETCH_ADD_TURNO = 'pacientes/FETCH_ADD_TURNO';

// ACTIONS
export function fetchPacientes(){
    return function(){
      return fetch('/api/turnos')
        .then(function(response){console.log(response)});
    }
}
 
/*export function fetchPacientes(fecha){

const request = axios.get('http://localhost:8983/solr/turnos/select?q=*:*');
    
return{
    type: FETCH_PACIENTES,
    payload:request,
  }
};*/

export const fetchAddTurno = (dia,fecha,paciente,profesional,horario) => ({
  type: FETCH_ADD_TURNO,
  payload: {
    idTurno,
    fecha,   
    paciente, 
    profesional, 
    horario 
  }
});

export const fetchPacientesAlta = () => ({
  type: FETCH_PACIENTES,
  payload: {id:'5' , paciente:'asasa', profesional:'aaaa', horario:'12.00'}
});


// REDUCERS
export default function reducer(state = [], action) {
  // const newState = { ...state };
  switch (action.type) {
    case FETCH_PACIENTES:
        return[action.payload, ...state]
      /*return [
                  {idDia: '1', dia:'lunes', fecha:'01/01/2018',  turnos: [
                    {id:'1', paciente: 'Sergio Luis' , profesional: 'sasa papa', horario: '7.45' },
                    {id:'2', paciente: 'Ursula' , profesional: 'peter', horario: '10.30' }
                  ]},
                  {idDia: '2', dia:'Martes', fecha:'02/01/2018', turnos:[
                    {id:'3', paciente: 'Juan Perez' , profesional: 'sasa papa', horario: '10.30' },
                    {id:'4', paciente: 'Roger ' , profesional: 'Pablo sasa', horario: '12.30' }
                  ]}
              ]*/

    case FETCH_ADD_TURNO:
    return[...state, action.payload]
    default:
      return state;
  }
}
