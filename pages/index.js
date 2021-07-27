import React, { useState, Component, useEffect } from 'react';
import { withIronSession } from "next-iron-session";
import { useRouter } from 'next/router';
import {Avatar, makeStyles, Modal, FormControl, FormLabel, Radio, RadioGroup,InputLabel,List, ListItem,ListItemText,Divider,Paper,
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


  const [filiados,setFiliados] = useState([]);
  const today = new Date();

useEffect(() => {
  fire.database()
    .ref('filiados').orderByChild("dataNasc")
    .on("value",(snap) => {
      
      var total = 0;
      var items = [];
   snap.forEach(function(childSnapshot) {
        
      const name = childSnapshot.key;
      const fili = childSnapshot.val();
       var date = (new Date(fili.dataNasc))

      fili.dataNasc = date;
       if(date.getMonth() ==today.getMonth()){
         
         items.push(fili)
       }
        total++;
        
        if(total == snap.numChildren()){
           ordenaValores(items);
        }
      

    });
    

    });
}, []);

function ordenaValores(items){
    
    
    const clonedList = [...items]
  
    for (let increment = 1; increment < clonedList.length; increment++) {
      const currentValue = clonedList[increment].dataNasc.getDate();
      const current = clonedList[increment];
      let j = increment - 1
  
      while (j >= 0 && clonedList[j].dataNasc.getDate() > currentValue) {
        clonedList[j + 1] = clonedList[j]
        j -= 1
      }
      clonedList[j + 1] = current
    }
    setFiliados(clonedList)
  
}

  
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

const month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];

function formatarData(data){
  
  var month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
  return(data.getDate()+" de "+month[data.getMonth()]+" "+data.getFullYear())
}




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
              <Grid xs></Grid>
              <Grid xs={8} style={{marginLeft:-30}} ><br/>
                <Paper elevation={5} style={{padding:30}} >
               
              <Typography variant="h3">Aniversariantes do Mês de {month[today.getMonth()]}</Typography>
              <br/>
              <List className={classes.root}>
      
                {filiados.map(fili => {
                    if(fili.dataNasc.getDate() == today.getDate()){
                      return(
                        <>
                        
                          <ListItem style={{backgroundColor:"#3f51b5"}}>
                              <Typography style={{color:"#fff"}}  variant="h4">
                                {fili.nome+" "+fili.sname}
                                </Typography>
                             
                          </ListItem>
                          <ListItem style={{backgroundColor:"#3f51b5",marginTop:-17}} >
                              
                              <Typography  style={{color:"#fff"}}  variant="h6">
                                {formatarData(fili.dataNasc)}
                                </Typography> 
                          </ListItem>
                          <Divider component="li" />
                        </>
                      )

                    }else{
                        return(
                          <>
                          
                            <ListItem>
                            <ListItemText primary={fili.nome+" "+fili.sname} secondary={formatarData(fili.dataNasc)} />
                          </ListItem>
                          <Divider component="li" />
                          </>
                        )
                    }
                })

                }
                </List>
                </Paper>
              </Grid>
              <Grid xs></Grid>



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