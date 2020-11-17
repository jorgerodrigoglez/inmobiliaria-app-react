import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import './App.css';
import ListaInmuebles from './componentes/vistas/ListaInmuebles';
import AppNavbar from './componentes/layout/AppNavbar';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import { MuiThemeProvider } from '@material-ui/core/styles';
import theme from './theme/theme';

import RegistrarUsuario from './componentes/seguridad/RegistrarUsuario';
import Login from './componentes/seguridad/Login';
import { FirebaseContext } from './server';
import { useStateValue } from './sesion/store';
import { Snackbar } from '@material-ui/core';
import openSnackbarReducer from './sesion/reducers/openSnackbarReducer';
import RutaAutenticada from './componentes/seguridad/RutaAutenticada';
import PerfilUsuario from './componentes/seguridad/PerfilUsuario';
import NuevoInmueble from './componentes/vistas/NuevoInmueble';

function App(props) {
  let firebase = React.useContext(FirebaseContext);
  const [autenticacionIniciada, setupFirebaseInicial] = React.useState(false);

  const [{openSnackbar}, dispatch] = useStateValue();

  useEffect(() => {
    firebase.estaIniciado().then(val=> {
      setupFirebaseInicial(val);
    })
  })

  return autenticacionIniciada !== false ? (
    <React.Fragment>
      <Snackbar
        anchorOrigin = {{vertical:"bottom", horizontal:"center"}}
        open={openSnackbar ? openSnackbar.open : false}
        autoHideDuration={3000}
        ContentProps={{
          "aria-describedby" : "message-id"
        }}
        message={
          <span id="message-id">
            {openSnackbar ? openSnackbar.mensaje : ""}
          </span>
        }
        onClose = {() =>
          dispatch({
            type : "OPEN_SNACKBAR",
            openMensaje : {
              open: false,
              mensaje: ""
            }
          })
        }
      >

      </Snackbar>

      <Router>
        <MuiThemeProvider theme={theme}>
          
          <AppNavbar/>

          <Grid container>
            <Switch>
              <RutaAutenticada exact path="/" autenticadoFirebase={firebase.auth.currentUser} component={ListaInmuebles}/>
              <RutaAutenticada exact path="/perfil" autenticadoFirebase={firebase.auth.currentUser} component={PerfilUsuario}/>
              <RutaAutenticada exact path="/inmueble/nuevo" autenticadoFirebase={firebase.auth.currentUser} component={NuevoInmueble}/>
              <Route path="/registrar-usuario" exact component={RegistrarUsuario} />
              <Route path="/login" exact component={Login} />
            </Switch>
          </Grid>      
        </MuiThemeProvider>
      </Router>
    </React.Fragment>
  )
  :null
  ;
}

export default App;
