import React, { Component } from 'react';
import { Container, Typography, TextField, Avatar, Grid, Button} from '@material-ui/core';
import LockOutLineIcon from '@material-ui/icons/LockOutlined';

import { compose } from 'recompose';
import { consumerFirebase } from '../../server';

import { crearUsuario } from '../../sesion/actions/sesionAction';
import { StateContext } from '../../sesion/store';
import { openMensajePantalla } from '../../sesion/actions/snackbarAction';

const style = {
    paper : {
        marginTop : 8,
        display : "flex",
        flexDirection : "column",
        alignItems: "center"
    },
    avatar : {
        margin: 8,
        backgroundColor : "#e53935"
    },

    form : {
        width: "100%",
        marginTop: 10
    },

    submit : {
        marginTop: 15,
        marginBottom: 20
    }
}

/*const usuarioInicial = {
    nombre: '',
    apellido: '',
    email: '',
    password: ''
}*/

class RegistrarUsuario extends Component {
    
    static contexType = StateContext;

    state = {
        firebase: null,
        usuario: {
            nombre:'',
            apellido:'',
            email:'',
            password:''
        }
    }

    static getDerivedStateFromProps(nextProps, prevState){
        if(nextProps.firebase === prevState.firebase){
            return null;
        }
        return{
            firebase : nextProps.firebase
        }
    }

    onChange = e => {
        let usuario = Object.assign({}, this.state.usuario);

        usuario[e.target.name] = e.target.value;

        this.setState({
            usuario : usuario
        })
    }

    registrarUsuario = async e => {
        e.preventDefault();
        console.log('imprimir objeto usuario del state', this.state.usuario);
        
        /*const { usuario, firebase } = this.state;

        firebase.auth
        .createUserWithEmailAndPassword(usuario.email, usuario.password)
        .then(auth => { 

            const usuarioDB = {
                usuarioid : auth.user.uid,
                email : usuario.email,
                nombre : usuario.nombre,
                apellido : usuario.apellido
            }

            firebase.db
            .collection("usuarios")
            .add(usuarioDB)
            .then(usuarioAfter => {
                console.log('Esta inserción fue un éxito', usuarioAfter);
                this.props.history.push('/');
            })
            .catch(error => {
                console.log('Hubo un error', error);
            })
        })
        .catch(error => {
            console.log(error);
        })*/

        const [{sesion}, dispatch] = this.context;
        const {firebase, usuario} = this.state;

        let callback = await crearUsuario(dispatch,firebase,usuario);

        if(callback.status){
            this.props.history.push("/");
        }else{
            openMensajePantalla(dispatch, {
                open : true,
                mensaje : callback.mensaje.message
            })
        }

    }

    render() {
        return (
            <Container maxWidth="md">
            <h1>Registar Usuarios</h1>
              <div style={style.paper}></div>
                <Avatar style={style.avatar}>
                    <LockOutLineIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Registre su cuenta...
                </Typography>
                <form style={style.form}>
                    <Grid container spacing={2}>
                        <Grid item md={6} xs={12}>
                            <TextField name="nombre" onChange={this.onChange} value={this.state.usuario.nombre} fullWidth label="Ingrese su nombre" />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField name="apellido" onChange={this.onChange} value={this.state.usuario.apellido} fullWidth label="Ingrese sus apellidos" />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField name="email" onChange={this.onChange} value={this.state.usuario.email} fullWidth label="Ingrese su e-mail" />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <TextField type="password" name="password" onChange={this.onChange} value={this.state.usuario.password} fullWidth label="Ingrese su password" />
                        </Grid>
                    </Grid>

                    <Grid container justify="center">
                        <Grid item md={6} xs={12}>
                            <Button type="submit" onClick={this.registrarUsuario} variant="contained" fullWidth size="large" color="primary" style={style.submit}>Registrar
                            </Button>
                        </Grid>
                    </Grid>
                </form>
          </Container>
        );
    }
}

export default compose(consumerFirebase) (RegistrarUsuario);