import React, { useState, Component, useEffect } from 'react';
import { withIronSession } from "next-iron-session";
import { useRouter } from 'next/router';
import {Avatar, makeStyles, Modal, FormControl, FormLabel, Radio, RadioGroup,InputLabel,
    AppBar,Toolbar,IconButton,Icon, Button, CssBaseline, TextField, FormControlLabel, Checkbox ,Grid,Box, Typography} from '@material-ui/core';

import {Facebook , Save,YouTube,AssignmentInd, People} from '@material-ui/icons/';
import MenuIcon from '@material-ui/icons/Menu';
import  Link from 'next/link';
import Header from "./components/Header";

import fire from '../config/fire-config';

const PrivatePage = ({ user }) => {

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }
  
  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }
  

  const useStyles2 = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const classes2 = useStyles2();
  const [modalStyle] = React.useState(getModalStyle);

  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };


  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }));

  const classes = useStyles();

    return(
   

  <div>
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1"/>

     <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>

<Header/>
<div style={{margin:"5% 0 0 25%"}}>
          <Grid container spacing={3}>  
             
              <Grid item xs={12} lg={3}>
                <Link href="/filiados">
                  <Button  style={{paddingRight:"0"}} variant="contained" color="primary">
                       <People style={{padding:"0", marginLeft:"-18%" ,fontSize:"100px"}}/>
                        <h4 style={{margin:"55% 0 0 -50%"}}> Filiados </h4>
                  </Button>
                  </Link>
                 
              </Grid>
              <Grid item xs={12} lg={3}>
                <Link href="/usuarios">
                  <Button  style={{paddingRight:"0"}} variant="contained" color="primary">
                       <AssignmentInd style={{padding:"0", marginLeft:"-18%" ,fontSize:"100px"}}/>
                        <h4 style={{margin:"55% 0 0 -50%"}}> Usuários </h4>
                  </Button>
                  </Link>
              </Grid>



          </Grid>
</div>
          
  </div>);
};



export const getServerSideProps = withIronSession(

  
  async ({ req, res }) => {
    const user = req.session.get("user");
    if (!user) {
      res.setHeader("location", "/login");
      res.statusCode = 302;
      res.end();
      return { props: {} };
    }

    return {
      props: { user }
    };
  },
  {
    cookieName: "MYSITECOOKIE",
    cookieOptions: {
      secure: process.env.NODE_ENV === "production" ? true : false
    },
    password: process.env.APPLICATION_SECRET
  }
);

export default PrivatePage;