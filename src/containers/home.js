import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from './CardContainer';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import * as turnosActions from '../ducks/turnos';

class Home extends React.Component {
  componentDidMount() {
    let fechaSelect = '2018-02-05';
 this.props.fetchTurnos(fechaSelect);

  }
  

  render() {
    let fechaSelect = '2018-02-05';
  const cantidad = [0,1,2,3,4]
    moment().tz('America/Argentina/Buenos_Aires');
    console.log(fechaSelect);
    moment().locale('es');
    let day = ""
    let fec = ""
    let dayFor = ""
    const turno = []
    cantidad.forEach(function(element) {
    dayFor = moment(fechaSelect).add(element, 'days').format('DD-MM-YYYY');

    }, this);  

    return (
      <div className="row">  
        { this.props.turnos.map((valor) => (
        <div className="col-sm">
          <Card key={day} dia={fec} fecha={day} turnos={valor} />
        </div>    
        ))}
      </div>  
           
    );
  }
}

const mapStateToProps = state => ({
  turnos: state.turnos,
});

export default connect(mapStateToProps, turnosActions)(Home);
