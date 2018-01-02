import React, { Component } from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Card.css';
import CardHead from '../components/CardHead';
import * as pacientesActions from '../ducks/pacientes';
import _ from 'lodash';

class CardContainer extends React.Component {

  handleOnClick() {
    this.props.store.dispatch(addItem());
  }
  renderHorarios(turnos){
    return(  
      <div>   
        { turnos.map((turno) => (  
          <a key={turno.id} href="#" className="list-group-item list-group-item-action flex-column align-items-start"> 
          <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{turno.paciente}</h5>
            <small className={s.smallCenter}>
              <span className="badge badge-pill badge-danger">Nuevo</span>{' '}
              <b>{turno.horario}</b>
            </small>      
          </div> 
          <small>{turno.profesional}</small>
          </a>        
        ))}
      </div>
    )}
  
  render() {
    const turnos = this.props.turnos;
    if (_.isEmpty(turnos)){
      return(
        <div key={'loading'} >Loading...</div>
      )
    }
    return (
    <div className={s.root}>
      <div className={s.container}>

      <CardHead />
        <div className="card">
          <div className={s.cardTitle}>
          <p className={s.cardTitleText}>{this.props.dia}</p>
          <h6 className={s.cardTitleText}>{this.props.fecha}</h6>
            </div>
          <div className="card-body" style={{ padding: '0px' }}>
            <div className="list-group">
            { this.renderHorarios(turnos) }
            </div>
            <div style={{ padding: '10px', textAlign: 'right' }}>
              <button type="button" className="btn btn-success"  >
                <i className="fa fa-plus" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
  }
}


export default ( withStyles(s)(CardContainer));
