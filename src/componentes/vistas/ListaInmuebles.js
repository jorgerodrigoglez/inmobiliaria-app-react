import React, { Component } from 'react';
import Button from '@material-ui/core/Button';


class ListaInmuebles extends Component {
    render() {
        return (
            <div>
                <h1>Lista de Inmuebles</h1>
                <Button variant="contained" color="primary">Color primario</Button>
                <Button variant="contained" color="common">Color secondario</Button>
            </div>
        );
    }
}

export default ListaInmuebles;