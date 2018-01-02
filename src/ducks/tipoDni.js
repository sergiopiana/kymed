// constants
const FETCH_TIPODNI = 'tipoDni/FETCH_TIPODNI';
// actions

export const fetchTipoDni = () => ({
  type: FETCH_TIPODNI,
});

// reducers
export default function reducers(state = [], action) {
  // const newState = { ...state };
  switch (action.type) {
    case FETCH_TIPODNI:
      return [{ label: 'DNI' }, { label: 'Pasaporte' }, { label: 'LC' }];
    default:
      return state;
  }
}
