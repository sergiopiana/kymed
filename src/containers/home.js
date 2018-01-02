import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from './CardContainer';
import * as pacientesActions from '../ducks/pacientes';

class Home extends React.Component {
        
componentDidMount() {
    this.props.fetchPacientes();
}
    render(){
      return(  
        <div className="row">
                { this.props.pacientes.map((paciente) => (     
            <div className="col-sm">

            <Card key={paciente.unique} dia={paciente.dia} fecha={paciente.fecha} turnos={paciente.turnos} />
            </div>
        ))}
        </div>
        );
    }
}        

  
  const mapStateToProps = state => ({
    pacientes: state.pacientes,
  });
  
  export default connect(mapStateToProps,  pacientesActions)((Home),
  );