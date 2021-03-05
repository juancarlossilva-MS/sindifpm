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
      .ref('filiados')
      .once("value").then((snap) => {
        
        /*const blogs = snap.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));*/
        console.log('here');
        var res = (snap.val())
        console.log(res);
       // setBlogs(blogs);
      });
  }, []);

  

  
  
  class TabelaDependentes extends Component {
    render(){
      return(
            <div  style={{maxWidth:"90%"}}>
            <TableContainer component={Paper}>
                  <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Nome Completo</TableCell>
                        <TableCell align="right">Parentesco º</TableCell>
                        <TableCell align="right">Data de Nasc.</TableCell>
                        <TableCell align="right">RG</TableCell>
                        <TableCell align="right">CPF</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.nomecomp}>
                          <TableCell component="th" scope="row">
                            {row.nomeComp}
                          </TableCell>
                          <TableCell align="right">{row.paren}</TableCell>
                          <TableCell align="right">{row.datanasc}</TableCell>
                          <TableCell align="right">{row.rg}</TableCell>
                          <TableCell align="right">{row.cpf}</TableCell>
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

function atualizaTabelaDep(){
    var newDep = {nomeComp,parentesco, dataNascDep, rgDep, cpfDep};
    setRows(prev => [...prev, newDep]);
    console.log(newDep);
    
    console.log(rows);

}


const [nomeComp, setNomeComp] = useState("");
const [parentesco, setParentesco] = useState("");
const [dataNascDep, setDataNascDep] = useState("");
const [rgDep, setRgDep] = useState("");
const [cpfDep, setCpfDep] = useState("");
const [rows, setRows] = useState([]);

class AddDependentes extends Component {
    render(){
      if(open){
      return(
       
        <Zoom in={open}>
          
        <Grid container  alignItems="center" spacing={4}>  
                  
            <Grid item xs={12} sm={4}> 
            <TextField required style={{width:"90%" }} fullWidth  variant="outlined" id="nomeComp" label="Nome Completo" defaultValue="" 
             onChange={e => setNomeComp(e.target.value)}
            /></Grid>
            <Grid item xs={12} sm={4}> 
            <TextField required style={{width:"90%" }} fullWidth variant="outlined"  id="parentesco" label="Grau de Parentesco" defaultValue="" 
            onChange={e => setParentesco(e.target.value)}
            /></Grid>

            <Grid item xs={12} sm={4}> 
            <TextField
              variant="outlined" 
                    id="date"
                    style={{width:"90%" }} fullWidth
                    label="Data de Nascimento"
                    type="date"
                    defaultValue="2017-05-24"
                    onChange={e => setDataNascDep(e.target.value)}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
            </Grid>
          
            <Grid item xs={12}  sm={4}> 
            <TextField required id="rg" style={{width:"90%" }} fullWidth  variant="outlined"  label="RG" defaultValue="" 
            onChange={e => setRgDep(e.target.value)}
            /></Grid>
            <Grid item xs={12}  sm={4}> 
            <TextField required id="cpf" style={{width:"90%" }} fullWidth variant="outlined" label="CPF" defaultValue="" 
            onChange={e => setCpfDep(e.target.value)}
            /></Grid>
            <Grid item xs={12}  sm={4}> 
                <Button onClick={atualizaTabelaDep} style={{color:"green"}}>
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

  function salvarFiliado() {
    firebase.database().ref('filiados/' ).set({
     
    });
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

  const [name, setName] = useState("");
  const [sname, setSname] = useState("");
  const [dataNasc, setDataNasc] = useState("");
  const [dataAdm, setDataAdm] = useState("");
  const [funcao, setFuncao] = useState("");
  const [dataValid, setDataValid] = useState("");
  const [nomePai, setNomePai] = useState("");
  const [nomeMae, setNomeMae] = useState("");
  const [rg, setRg] = useState("");
  const [cpf, setCpf] = useState("");
  const [numCart, setNumCart] = useState("");

  
 const classes = useStyles();

    return(
  <div style={{overflow:"auto"}}>
  <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1"/>
     <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>


   <Header/>   
   
       <form onSubmit={salvarFiliado}>
          <div style={{margin:"5% 0 0 5%"}}>
          <Grid container  alignItems="flex-start" spacing={2}>  
        
          <Grid item xs={12}> <Typography variant="h5"> Adicionar Filiado</Typography>
              </Grid>
            
              <Grid item  xs={12} sm={8}> 
              <TextField required  
              onChange={e => setName(e.target.value)}
              style={{width:"90%" }} fullWidth  variant="outlined" id="nome" label="Nome" defaultValue="" />
              
              </Grid>
              <Grid item xs={12} sm={8}> 
              <TextField required style={{width:"90%" }} fullWidth variant="outlined"  id="sobrenome" label="Sobrenome" defaultValue="" 
              onChange={e => setSname(e.target.value)}
              /></Grid>

              <Grid item xs={12} sm={6}> 
              <TextField
                variant="outlined" 
                      id="date"
                      style={{width:"90%" }} fullWidth
                      label="Data de Nascimento"
                      type="date"
                      defaultValue="2017-05-24"
                      onChange={e => setDataNasc(e.target.value)}
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
                      onChange={e => setDataAdm(e.target.value)}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
              </Grid>
              <Grid item xs={12}  sm={4}>
              <TextField required id="funcao" style={{width:"90%" }} fullWidth variant="outlined"  label="Função" defaultValue="" 
              onChange={e => setFuncao(e.target.value)}
              /></Grid>
              
              <Grid item xs={12}  sm={4}> 
              <TextField
                      id="validade"
                      label="Validade da Carteira"
                      type="date"
                      style={{width:"90%" }} fullWidth
                      variant="outlined" 
                      defaultValue="2017-05-24"
                      onChange={e => setDataValid(e.target.value)}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
              </Grid>
             
              <Grid item xs={12}  sm={4}>
                <TextField required id="nomePai" style={{width:"90%" }} fullWidth variant="outlined"  label="Nome do Pai" defaultValue="" 
                onChange={e => setNomePai(e.target.value)}
                /></Grid>
              <Grid item xs={12}  sm={4}>
                
              <TextField required id="nomeMar" style={{width:"90%" }} fullWidth variant="outlined" label="Nome da Mãe" defaultValue=""
              onChange={e => setNomeMae(e.target.value)}
              /></Grid>
              <Grid item xs={12}  sm={4}> 
              <TextField required id="rg" label="RG" style={{width:"90%" }} fullWidth variant="outlined" type="number" defaultValue=""
              onChange={e => setRg(e.target.value)}
              /></Grid>
            
              <Grid item xs={12}  sm={4}> 
              <TextField required id="cpf" style={{width:"90%" }} fullWidth variant="outlined" label="CPF" defaultValue="" 
              onChange={e => setCpf(e.target.value)}
              /></Grid>
              <Grid item xs={12}  sm={2}> 
              <TextField required id="numSocio"  variant="outlined" label="Carteira Nº" defaultValue="" 
              onChange={e => setNumCart(e.target.value)}
              /></Grid>
             
            </Grid>
                      
              <HeadDep/>
              <AddDependentes/> 
          
              <Grid item xs={12}   style={{marginTop:"5%"}}>   <TabelaDependentes/></Grid>
              
           
              <Grid item xs={12} sm={4}  >  
              <Button type="submit" style={{color:"green"}}>
                       <Save />
                       <Typography variant="h6"> salvar</Typography>
                </Button>    
                      


                </Grid>


              </div>

        </form>

          
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