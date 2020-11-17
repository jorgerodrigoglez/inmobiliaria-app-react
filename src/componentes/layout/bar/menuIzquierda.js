import React from 'react';
import { List, ListItem, Divider , ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

export const MenuIzquierda = ({classes}) => (
    
    <div className={classes.list}>
        <List>
            <ListItem button component={Link} to="/perfil">
                <i className="material-icons">account_box</i>
                <ListItemText classes={{primary: classes.listItemText}} primary="Perfil" />    
            </ListItem>
        </List>
        <Divider />

        <List>
            <ListItem button component={Link} to="/inmueble/nuevo">
                <i className="material-icons">add_box</i>
                <ListItemText classes={{primary: classes.listItemText}} primary="Nuevo Inmueble" />    
            </ListItem>
            <ListItem button component={Link} to="">
                <i className="material-icons">business</i>
                <ListItemText classes={{primary: classes.listItemText}} primary="Inmueble" />    
            </ListItem>
            <ListItem button component={Link} to="">
                <i className="material-icons">mail_outline</i>
                <ListItemText classes={{primary: classes.listItemText}} primary="Mensajes" />    
            </ListItem>
        </List>         
    </div>
);