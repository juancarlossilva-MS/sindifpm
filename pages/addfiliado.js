import React, { useState, Component, useEffect } from 'react';
import { withIronSession } from "next-iron-session";
import { useRouter } from 'next/router';
import {Avatar, makeStyles, Modal, FormControl, FormLabel, Radio, RadioGroup,InputLabel,Fade,Zoom,Collapse,
    AppBar,Toolbar,    Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,Menu, MenuItem,
    IconButton,Icon, Button, CssBaseline, TextField, FormControlLabel, Checkbox ,Grid,Box, Typography} from '@material-ui/core';


import Header from "./components/Header";
import {Facebook ,MoreVert,GroupAdd, Save,YouTube,AssignmentInd,Cancel, People,Delete} from '@material-ui/icons/';

import MenuIcon from '@material-ui/icons/Menu';

import fire from '../config/fire-config';
import  Link from 'next/link';

const PrivatePage = ({ user }) => {
  const [blogs, setBlogs] = useState([]);

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

  

  /*const handler = (selectedRow) => {
    console.log("selectedRow:"+ selectedRow.nomeComp)
    console.log(selectedRow)
	console.log(rows);
	for(var i =0; i<rows.length;i++){
		if(rows[i].nomeComp == selectedRow.nomeComp){
				console.log("achou "+rows[i].nomeComp);
				rows.slice(i,1)
		}
	}
}*/

const handleRemoveItem = (selectedRow) => {
   // const name = selectedRow;
    setRows(rows.filter(item => item !== selectedRow));
  };
  
  class TabelaDependentes extends Component {
    render(){
      return(
            <div  style={{maxWidth:"90%"}}>
            <TableContainer component={Paper}>
                  <Table className={classes.table} size="small" aria-label="a dense table">
                    <TableHead>
                      <TableRow >
                        
                        <TableCell>Nome Completo</TableCell>
                        <TableCell align="right">Parentesco º</TableCell>
                        <TableCell align="right">Data de Nasc.</TableCell>
                        <TableCell align="right">RG</TableCell>
                        <TableCell align="right">CPF</TableCell>
                        <TableCell align="right">Ações</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows.map((row) => (
                        <TableRow key={row.nomeComp}  >
                          <TableCell component="th" scope="row">
                            {row.nomeComp}
                          </TableCell>
                          <TableCell align="right">{row.parentesco}</TableCell>
                          <TableCell align="right">{row.dataNascDep}</TableCell>
                          <TableCell align="right">{row.rgDep}</TableCell>
                          <TableCell align="right">{row.cpfDep}</TableCell>
                          <TableCell align="right"><Button color="secondary" onClick={() => handleRemoveItem(row)}><Delete/></Button></TableCell>
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


let parentesco = "";
let dataNascDep = "";
let rgDep = "";
let cpfDep = "";
const [rows, setRows] = useState([]);
const [fili, setFili] = useState();

let nomeComp = "";

// const onChangeNomeComp = (event) => nome


const FormAddDep = () => (
	<Zoom in={open}>
          
        <Grid container  alignItems="center" spacing={4}>  
                  
            <Grid item xs={12} sm={4}> 
            <TextField required style={{width:"90%" }} fullWidth type="text"  variant="standard" id="nomeComp" label="Nome Completo"  
             onChange={e => nomeComp = e.target.value}
			 autoFocus
			 defaultValue={nomeComp}
            /></Grid>
            <Grid item xs={12} sm={4}> 
            <TextField required style={{width:"90%" }} fullWidth variant="standard"  id="parentesco" label="Grau de Parentesco"  
            onChange={e => parentesco = e.target.value}
            /></Grid>

            <Grid item xs={12} sm={4}> 
            <TextField
              variant="standard" 
                    id="date"
                    style={{width:"90%" }} fullWidth
                    label="Data de Nascimento"
                    type="date"
                    defaultValue="2017-05-24"
                    onChange={e => dataNascDep = e.target.value}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
            </Grid>
          
            <Grid item xs={12}  sm={4}> 
            <TextField required id="rgDep" style={{width:"90%" }} fullWidth  variant="standard"  label="RG obs: apenas numeros"  
              onChange={(event) => { rgDep = ((event.target.value).replace(/\D/g, ''))}}

            /></Grid>
            <Grid item xs={12}  sm={4}> 
            <TextField required id="cpfDep" style={{width:"90%" }} fullWidth variant="standard" label="CPF obs: apenas numeros" 
            
            onChange={(event) => { cpfDep = ((event.target.value).replace(/\D/g, ''))}}
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
	


class AddDependentes extends Component {
	
    render(){
		console.log("render")
		
      if(open){
      return(
			<FormAddDep/>
        

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
  const router = useRouter()

 function selecionaFili(){

    var newFili = {name,sname,dataNasc,dataAdm,funcao,dataValid,nomePai,nomeMae,rg,cpf,numCart}
    setFili(newFili);
	salvarFiliado(newFili);

}


  
  function salvarFiliado(newFili) {
    
    if(newFili.cpf == "" || newFili.cpf == null){
		
      alert("VERIFIQUE O CPF DIGITADO!");
    }else{
              fire.database().ref('filiados/'+cpf ).set({
            nome:newFili.name,
            sname:newFili.sname,
            dataNasc:newFili.dataNasc,
            dataAdm:newFili.dataAdm,
            funcao:newFili.funcao,
            dataValid:newFili.dataValid,
            nomePai:newFili.nomePai,
            nomeMae:newFili.nomeMae,
            rg:newFili.rg,
            cpf:newFili.cpf,
            numCart:newFili.numCart
            }); 
          if(rows.length > 0){
            rows.map((row) => {
              fire.database().ref('filiados/'+cpf+"/dependentes/"+row.nomeComp).set({
                nomeComp:row.nomeComp,
                dataNasc:row.dataNascDep,
                parentesco:row.parentesco,
                rg:row.rgDep,
                cpf:row.cpfDep
              });
            });
          }
          router.push("/filiados");
    }
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

  let name = "";
  let sname = "";
  let dataNasc = "";
  let dataAdm = "";
  let funcao = "";
  let dataValid = "";
  let nomePai = "";
  let nomeMae = "";
  let rg = "";
  let cpf = "";
  let numCart = "";

 const rgChanger = e =>{
	 rg = (e.target.value).replace(/\D/g, '');
 } 
  
  
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
            
              <Grid item  xs={12} sm={8}> 
              <TextField required  
              onChange={e => name = (e.target.value)}
              style={{width:"90%" }} fullWidth  variant="standard" id="name" label="Nome" defaultValue="" />
              
              </Grid>
              <Grid item xs={12} sm={8}> 
              <TextField required style={{width:"90%" }} fullWidth variant="standard"  id="sobrenome" label="Sobrenome" defaultValue="" 
              onChange={e => sname = (e.target.value)}
              /></Grid>

              <Grid item xs={12} sm={6}> 
              <TextField
                variant="standard" 
                      id="date"
                      style={{width:"90%" }} fullWidth
                      label="Data de Nascimento"
                      type="date"
                      defaultValue="2017-05-24"
                      onChange={e => dataNasc = (e.target.value)}
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
                      variant="standard" 
                      type="date"
                      defaultValue="2017-05-24"
                      onChange={e => dataAdm = (e.target.value)}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
              </Grid>
              <Grid item xs={12}  sm={4}>
              <TextField required id="funcao" style={{width:"90%" }} fullWidth variant="standard"  label="Função" defaultValue="" 
              onChange={e => funcao = (e.target.value)}
              /></Grid>
              
              <Grid item xs={12}  sm={4}> 
              <TextField
                      id="validade"
                      label="Validade da Carteira"
                      type="date"
                      style={{width:"90%" }} fullWidth
                      variant="standard" 
                      defaultValue="2017-05-24"
                      onChange={e => dataValid = (e.target.value)}
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
              </Grid>
             
              <Grid item xs={12}  sm={4}>
                <TextField required id="nomePai" style={{width:"90%" }} fullWidth variant="standard"  label="Nome do Pai" defaultValue="" 
                onChange={e => nomePai = (e.target.value)}
                /></Grid>
              <Grid item xs={12}  sm={4}>
                
              <TextField required id="nomeMae" style={{width:"90%" }} fullWidth variant="standard" label="Nome da Mãe" defaultValue=""
              onChange={e => nomeMae = (e.target.value)}
              /></Grid>
              <Grid item xs={12}  sm={4}> 
              <TextField required id="rg" label="RG  obs: Apenas Números" style={{width:"90%" }}
                onChange={rgChanger} 
                fullWidth variant="standard" 
              /></Grid>
            
              <Grid item xs={12}  sm={4}> 
              <TextField required id="cpf" style={{width:"90%" }} fullWidth variant="standard" label="CPF obs: Apenas Números"  
              onChange={(event) =>  cpf = (event.target.value).replace(/\D/g, '')} 
			  
              /></Grid>
              <Grid item xs={12}  sm={2}> 
              <TextField required id="numSocio"  variant="standard" label="Carteira Nº" defaultValue="" 
              onChange={e => numCart = (e.target.value)}
              /></Grid>
             
            </Grid>
                      
              <HeadDep/>
			  
			  {open &&
			    <FormAddDep/> 
			  }

          
              <Grid item xs={12}   style={{marginTop:"5%"}}>   <TabelaDependentes/></Grid>
              
           
              <Grid item xs={12} sm={4}  >  
              <Button onClick={selecionaFili} style={{color:"green"}}>
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