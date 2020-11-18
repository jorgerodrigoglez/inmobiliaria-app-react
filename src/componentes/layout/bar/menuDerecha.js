
import React from 'react';
import { List, Link, ListItem, Avatar, ListItemText } from '@material-ui/core';

export const MenuDerecha = ({classes, usuario, textoUsuario, fotoUsuario, salirSesion}) => (
    
    <div className={classes.list}>
        <List>
            <ListItem button component={Link} to="/registrar-usuario">
                <Avatar src={fotoUsuario} />
                <ListItemText classes={{primary: classes.listItemText}} primary={textoUsuario} />
            </ListItem>
            <ListItem button onClick={salirSesion}>
                <ListItemText classes={{primary: classes.listItemText}} primary="Salir" />
            </ListItem>
        </List>
    </div>
);