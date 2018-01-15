import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from './CardContainer';
import moment from 'moment';
import momentTimezone from 'moment-timezone';
import * as turnosActions from '../ducks/turnos';
class Home extends React.Component {

  render() {
    let days = [];
    moment().tz('America/Argentina/Buenos_Aires');
    const fecha = new Date('2018-01-20');
    console.log(fecha);
    moment().locale('es');
    let a = [0, 1, 2, 3, 4];
      a.forEach(function(element){
      days = moment(fecha).add(element, 'days').format('DD-MM-YYYY');
        console.log("dias:"+days);
      })
  }

    return (
     <div className="row">
       { this.days.map((day) => (  
        <div className="col-sm">
          <Card key={day} dia={day} fecha={day} />
        </div>
      ))};
    </div>  
    )
}

const mapStateToProps = state => ({
  turnos: state.turnos,
});
export default connect(mapStateToProps, turnosActions)(Home);
