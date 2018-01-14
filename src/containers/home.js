import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from './CardContainer';
import * as turnosActions from '../ducks/turnos';
import moment from 'moment';
import momentTimezone from 'moment-timezone';

class Home extends React.Component {
  componentDidMount() {
    this.props.fetchTurnos();
  }
  render() {
    moment().tz('America/Argentina/Buenos_Aires');
    const turnos = this.props.turnos;
    const fecha = new Date('2017-01-20');
    console.log(fecha);
    moment().locale('es');
    const day1 = moment(fecha).format('DD-MM-YYYY');
    const fec1 = moment(fecha).format('dddd');
    const day2 = moment(fecha)
      .add(1, 'days')
      .format('DD-MM-YYYY');
    const fec2 = moment(fecha)
      .add(1, 'days')
      .format('dddd');
    const day3 = moment(fecha)
      .add(2, 'days')
      .format('DD-MM-YYYY');
    const fec3 = moment(fecha)
      .add(2, 'days')
      .format('dddd');
    const day4 = moment(fecha)
      .add(3, 'days')
      .format('DD-MM-YYYY');
    const fec4 = moment(fecha)
      .add(3, 'days')
      .format('dddd');
    const day5 = moment(fecha)
      .add(4, 'days')
      .format('DD-MM-YYYY');
    const fec5 = moment(fecha)
      .add(4, 'days')
      .format('dddd');
    return (
      <div className="row">
        <div className="col-sm">
          <Card key={turnos.fecha} dia={fec1} fecha={day1} turnos={turnos} />
        </div>
        <div className="col-sm">
          <Card
            key={turnos.fecha * 1}
            dia={fec2}
            fecha={day2}
            turnos={turnos}
          />
        </div>
        <div className="col-sm">
          <Card
            key={turnos.fecha + 2}
            dia={fec3}
            fecha={day3}
            turnos={turnos}
          />
        </div>
        <div className="col-sm">
          <Card
            key={turnos.fecha + 3}
            dia={fec4}
            fecha={day4}
            turnos={turnos}
          />
        </div>
        <div className="col-sm">
          <Card
            key={turnos.fecha + 4}
            dia={fec5}
            fecha={day5}
            turnos={turnos}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  turnos: state.turnos,
});

export default connect(mapStateToProps, turnosActions)(Home);
