import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

// components/buttons
import MyButtonMyWorld from './buttons/MyButtonMyWorld';
import MyButtonStore from './buttons/MyButtonStore';
import MyButtonDevice from './buttons/MyButtonDevice';
import MyButtonNotifications from './buttons/MyButtonNotifications';
import MyButtonProfile from './buttons/MyButtonProfile';

const useStyles = makeStyles(() => ({
    appBar: {
        top: 'auto',
        bottom: 0,
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)'
    },
    grow: {
        flexGrow: 1,
    }
})); 

export default function NavBar() {
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.appBar}>
            <Toolbar>
                <MyButtonMyWorld/>
                <div className={classes.grow} />
                <MyButtonStore/>
                <div className={classes.grow} />
                <MyButtonDevice className={classes.fabButton}/>
                <div className={classes.grow} />
                <MyButtonNotifications/>
                <div className={classes.grow} />
                <MyButtonProfile/>
            </Toolbar>
        </AppBar>
    );  
}