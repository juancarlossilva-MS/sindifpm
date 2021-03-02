import React, { useState, Component, useEffect } from 'react';
import { withIronSession } from "next-iron-session";
import { useRouter } from 'next/router';
import {Avatar, makeStyles, Modal, FormControl, FormLabel, Radio, RadioGroup,InputLabel,Fade,Zoom,Collapse,
    AppBar,Toolbar,    Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Menu, MenuItem,
    IconButton,Icon, Button, CssBaseline, TextField, FormControlLabel, Checkbox ,Grid,Box, Typography} from '@material-ui/core';


import Header from "./components/Header";
import {Facebook ,MoreVert,GroupAdd, Save,YouTube,AssignmentInd,Cancel, People} from '@material-ui/icons/';

import MenuIcon from '@material-ui/icons/Menu';

import fire from '../config/fire-config';
import  Link from 'next/link';

const PrivatePage = ({ user }) => {
  const [blogs, setBlogs] = useState([]);
  const [urlAtual, setUrlAtual] = useState("");
  const [canal, setCanal] = useState("");
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
useEffect(() => {
    fire.database()
      .ref('infoAtual')
      .once("value").then((snap) => {
        
        /*const blogs = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));*/
        console.log('here');
        var res = (snap.val())
        setCanal(res.canal);
        setUrlAtual(res.url);
      
       // setBlogs(blogs);
      });
  }, []);

  
  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }
  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  
  class TabelaDependentes extends Component {
    render(){

        return(
            <div  style={{maxWidth:"90%"}}>
            <TableContainer component={Paper}>
                  <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Dessert (100g serving)</TableCell>
                        <TableCell align="right">Calories</TableCell>
                        <TableCell align="right">Fat&nbsp;(g)</TableCell>
                        <TableCell align="right">Carbs&nbsp;(g)</TableCell>
                        <TableCell align="right">Protein&nbsp;(g)</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.calories}</TableCell>
                          <TableCell align="right">{row.fat}</TableCell>
                          <TableCell align="right">{row.carbs}</TableCell>
                          <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
            </div>

        )

    }

}

class HeadDep extends Component {
  render(){
    if(open){
      return(
        

        <Grid container  alignItems="center" spacing={2}>  

          <Grid item xs={12} sm={4} >
           <Typography variant="h5"> Adicionar Dependentes</Typography>
          </Grid>
          <Grid item xs={12} sm={1} >
            
               <Button onClick={handleChange} color="primary">
                   <Cancel />
                   <Typography variant="h6"> cancelar</Typography>
                </Button>
             
          </Grid> 
          
        </Grid>

      );
    }else{
      return(
      

          <Grid container  alignItems="center" spacing={2}>  

            <Grid item xs={12} sm={4} >
            <Typography variant="h5"> Dependentes</Typography>
            </Grid>
            <Grid item xs={12} sm={1} >
              
                <Button onClick={handleChange} color="primary">
                    <GroupAdd />
                    <Typography variant="h6"> dependente</Typography>
                  </Button>
              
            </Grid> 
            
          </Grid>
      
      
        );



    }

  }


}

class AddDependentes extends Component {
  render(){
    if(open){
    return(
      <Zoom in={open}>
      <Grid container  alignItems="center" spacing={4}>  
                
          <Grid item xs={12} sm={4}> <TextField required style={{width:"90%" }} fullWidth  variant="outlined" id="nomeComp" label="Nome Completo" defaultValue="" /></Grid>
          <Grid item xs={12} sm={4}> <TextField required style={{width:"90%" }} fullWidth variant="outlined"  id="parentesco" label="Grau de Parentesco" defaultValue="" /></Grid>

          <Grid item xs={12} sm={4}> 
          <TextField
            variant="outlined" 
                  id="date"
                  style={{width:"90%" }} fullWidth
                  label="Data de Nascimento"
                  type="date"
                  defaultValue="2017-05-24"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
          </Grid>
         
          <Grid item xs={12}  sm={4}> <TextField required id="funcao" style={{width:"90%" }} fullWidth  variant="outlined"  label="RG" defaultValue="" /></Grid>
          <Grid item xs={12}  sm={4}> <TextField required id="cpf" style={{width:"90%" }} fullWidth variant="outlined" label="CPF" defaultValue="" /></Grid>
          <Grid item xs={12}  sm={4}> 
              <Button style={{color:"green"}}>
                          <Save />
                          <Typography variant="h6"> confirmar</Typography>
                </Button>          
          </Grid>
         
          </Grid>
     
     </Zoom> 

    );
  }else{
    return(<div></div>);



  }

  }


}


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

  const handleChange = () => {
    setOpen((prev)=>!prev);
  };
  const handleChange2 = (event) => {
    setValue(event.target.value);
  };

  const salvarNovasInfos = () => {

    
  }
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAnchor = () => {
    setAnchorEl(null);
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


  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  
 const classes = useStyles();

    return(
  <div style={{overflow:"auto"}}>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1"/>
     <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>


   <Header/>
          <div style={{margin:"5% 0 0 5%"}}>
          <Grid container  alignItems="flex-start" spacing={2}>  
             
          <Grid item xs={12}> <Typography variant="h5"> Adicionar Filiado</Typography>
              </Grid>
            
              <Grid item  xs={12} sm={8}> <TextField required  style={{width:"90%" }} fullWidth  variant="outlined" id="nome" label="Nome" defaultValue="" /></Grid>
              <Grid item xs={12} sm={8}> <TextField required style={{width:"90%" }} fullWidth variant="outlined"  id="sobrenome" label="Sobrenome" defaultValue="" /></Grid>

              <Grid item xs={12} sm={6}> 
              <TextField
                variant="outlined" 
                      id="date"
                      style={{width:"90%" }} fullWidth
                      label="Data de Nascimento"
                      type="date"
                      defaultValue="2017-05-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
              </Grid>
             <Grid item xs={12}  sm={6}> 
              <TextField
                      id="admissao"
                      style={{width:"90%" }} fullWidth
                      label="Data de Admissão"
                      variant="outlined" 
                      type="date"
                      defaultValue="2017-05-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
              </Grid>
              <Grid item xs={12}  sm={4}> <TextField required id="funcao" style={{width:"90%" }} fullWidth variant="outlined"  label="Função" defaultValue="" /></Grid>
              
              <Grid item xs={12}  sm={4}> 
              <TextField
                      id="validade"
                      label="Validade da Carteira"
                      type="date"
                      style={{width:"90%" }} fullWidth
                      variant="outlined" 
                      defaultValue="2017-05-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
              </Grid>
             
              <Grid item xs={12}  sm={4}> <TextField required id="nomePai" style={{width:"90%" }} fullWidth variant="outlined"  label="Nome do Pai" defaultValue="" /></Grid>
              <Grid item xs={12}  sm={4}> <TextField required id="nomeMar" style={{width:"90%" }} fullWidth variant="outlined" label="Nome da Mãe" defaultValue="" /></Grid>
              <Grid item xs={12}  sm={4}> <TextField required id="rg" label="RG" style={{width:"90%" }} fullWidth variant="outlined" type="number" defaultValue="" /></Grid>
            



              <Grid item xs={12}  sm={4}> <TextField required id="cpf" style={{width:"90%" }} fullWidth variant="outlined" label="CPF" defaultValue="" /></Grid>
              <Grid item xs={12}  sm={2}> <TextField required id="numSocio"  variant="outlined" label="Carteira Nº" defaultValue="" /></Grid>
             
            </Grid>
                      
              <HeadDep/>
              <AddDependentes/> 
          
              <Grid item xs={12}   style={{marginTop:"5%"}}>   <TabelaDependentes/></Grid>
              
           
              <Grid item xs={12} sm={4}  >  
              <Button style={{color:"green"}}>
                       <Save />
                       <Typography variant="h6"> salvar</Typography>
                </Button>          
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