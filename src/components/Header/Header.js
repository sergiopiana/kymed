
import React from 'react';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import _ from 'lodash';
import * as authActions from '../../ducks/auth';

class Header extends React.Component {
  render() {
    if (_.isEmpty(this.props.auth)){
      return(
      <div className={s.root}>
        <div className="container-fluid">
          <nav className="navbar navbar-dark bg-primary">
            <span className="navbar-brand">
             Kymed - Autenticación de usuario
            </span>
          </nav>
        </div>
      </div>        
      )
    }
    return (
      <div className={s.root}>
        <div className="container-fluid">
          <nav className="navbar navbar-dark bg-primary">
            <span className="navbar-brand">
              <b>Kymed - Bienvenido:</b> {this.props.auth.nombre} {this.props.auth.apellido}
            </span>
          </nav>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(mapStateToProps, authActions)(withStyles(s)(Header));
