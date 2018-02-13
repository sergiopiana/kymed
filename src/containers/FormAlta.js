/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FormAlta.css';
import { connect } from 'react-redux';
import * as turnosActions from '../ducks/turnos';

class FormAlta extends React.Component {
  constructor(props){
    super(props);
  }

  click(){
    const fecha = $('#fecha').val();
    const profesional = $('#profesional').val();
    const paciente = $('#paciente').val();
    const horario = $('#hora').val();
    this.props.fetchTurnosAdd(fecha, paciente, profesional, horario);

  }
  
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
        <link rel="stylesheet" href="/css/datepicker.css" />
        <script src="/js/bootstrap-datepicker.js" />
        <script src="/js/bootstrap-datepicker.es.js" />        
         <form id="altaTurno">
            <div className="row">

              <div className="col-sm">
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon" id="basic-addon1">
                      <i className="fa fa-user" aria-hidden="true" />
                    </span>
                    <input
                      id="paciente"
                      type="text"
                      className="form-control"
                      placeholder="Paciente"
                      aria-label="Paciente"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
                <div className="form-group">
                  <div className="input-group">
                    <span className="input-group-addon" id="basic-addon1">
                      <i className="fa fa-user-md" aria-hidden="true" />
                    </span>
                    <input
                      id="profesional"
                      type="text"
                      className="form-control"
                      placeholder="Profesional"
                      aria-label="Profesional"
                      aria-describedby="basic-addon1"
                    />
                  </div>
                </div>
              </div>
              <div className="col-sm-2">
                <div className="form-group">
                <div className="input-group">
                <span className="input-group-addon" id="basic-addon1">
                  <i className="fa fa-user-md" aria-hidden="true" />
                </span>
                <input
                  id="fecha"
                  type="text"
                  className="form-control"
                  placeholder="Fecha"
                  aria-label="Fecha"
                  aria-describedby="basic-addon1"
                />
              </div>
                </div>
                <div>
                <div className="input-group">
                <span className="input-group-addon" id="basic-addon1">
                  <i className="fa fa-user-md" aria-hidden="true" />
                </span>
                
                <input
                  type="text"
                  id="hora"
                  className="form-control"
                  placeholder="Hora"
                  aria-label="Hora"
                  aria-describedby="basic-addon1"
                />
              </div>
              </div>
            </div>
              
              

              <div className="col-sm-5">
              <div className="form-group">                
                <button className="btn btn-primary" onClick={this.click.bind(this)}>
                  Agregar turno
                </button>
              </div>
                <div className="input-group">
                  <a className="btn btn-primary" style={{padding:"10px"}} href="#" role="button">Siguiente</a>
                  <a className="btn btn-primary" href="#" role="button">Anterior</a>
                </div>
              </div>
            </div>
        </form>            
      </div>
    </div>  
    );
  }
}

const mapStateToProps = state => ({
  pacientes: state.pacientes,
});

export default connect(mapStateToProps, turnosActions)(withStyles(s)(FormAlta),
);

