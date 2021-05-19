import React, { useState, Component, useEffect } from 'react';
import { withIronSession } from "next-iron-session";
import { useRouter } from 'next/router';
import {Avatar, makeStyles, Modal, FormControl, FormLabel, Radio, RadioGroup,InputLabel,Collapse,
    AppBar,Toolbar,    Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,
    IconButton,Icon, Button, CssBaseline, TextField, FormControlLabel, Checkbox ,Grid,Box, Typography} from '@material-ui/core';



import {Facebook ,DoneAll, Close, GroupAdd, Save,YouTube,AssignmentInd, People,KeyboardArrowDown,KeyboardArrowUp,
Print
} from '@material-ui/icons/';
import MenuIcon from '@material-ui/icons/Menu';
import Header from "./components/Header";

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
		 snap.forEach(function(childSnapshot) {
          // key will be "ada" the first time and "alan" the second time
          
			  const name = childSnapshot.key;
				const fili = childSnapshot.val();
				// console.log(fili);
					 const res = createDataFili( fili.nome,fili.sname,fili.cpf,fili.rg,fili.nomeMae,fili.nomePai,
						fili.numCart,fili.dataNasc,fili.dataAdm,fili.dataValid,fili.funcao,fili.dependentes);
					 //console.log(res);
				  setRows(prev=>[...prev,res]);
				  
				

		  });
	     
	//	console.log(rows2);
      });
  }, []);

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
  const [openmul, setOpenmul] = React.useState(true);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const salvarNovasInfos = () => {
		//console.log(rows2);
	//	console.log(rows);
    
  }
const [rows2, setRows] = useState([]);

  

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
  
  const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});
  
function createDataFili(nome,sname,cpf,rg,nomeMae,nomePai,numCart,dataNasc,dataAdm,dataValid,funcao,deps) {
	// Object.map(deps)
			let dps = [];

	if(deps != null){
		let keys = Object.keys(deps);
	  
		keys.forEach((key) => { dps = [...dps,deps[key]] });
		
	}
	
	// console.log(dps);
	

  
  return {
     nome,
    sname,
    cpf,
    rg,
    nomeMae,
    nomePai,
    numCart,
    dataNasc,
    dataAdm,
    dataValid,
    funcao,
    dps
  };
}
 const router = useRouter();

function Row(props) {
  const { row,index } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
//	console.log(row);

	
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.nome + " "+row.sname}
        </TableCell>

        <TableCell align="right">{row.funcao}</TableCell>
        <TableCell align="right">{row.dataNasc}</TableCell>
        <TableCell align="right">{row.dataAdm}</TableCell>
        <TableCell align="right">{row.nomePai}</TableCell>
        <TableCell align="right">{row.nomeMae}</TableCell>
        <TableCell align="right">{row.rg}</TableCell>
        <TableCell align="right">{row.cpf}</TableCell>
        <TableCell align="right">{row.numCart}</TableCell>
        <TableCell align="right">{row.dataValid}</TableCell>
        { openmul ? 
        <TableCell align="right"><Button type="button" onClick={() => {   localStorage.setItem('filiSelected', JSON.stringify(row)), router.push("/printCart")}}><Print/></Button></TableCell>
         :   <Checkbox key={row.cpf}  checked={cartsCheck[row.cpf]}  value={JSON.stringify(row)} onClick={addArrayCarts} />}
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Dependentes
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Nome Completo</TableCell>
                    <TableCell>Data de Nasc.</TableCell>
                    <TableCell align="right">RG</TableCell>
                    <TableCell align="right">CPF</TableCell>
                  </TableRow>
                </TableHead>
              
               		<TableBody>
					{row.dps.map((dep) => (
						<TableRow key={dep.cpf}>
						  <TableCell component="th" scope="row">
						  {dep.nomeComp}
						  </TableCell>
						  <TableCell>{dep.dataNasc}</TableCell>
						  <TableCell align="right">{dep.rg}</TableCell>
						  <TableCell align="right">{dep.cpf}
						  </TableCell>
						</TableRow>
					))}
					</TableBody>
				 
                
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
  
const [arrayCarts, setArrayCarts] = React.useState([]);
const [cartsCheck, setCartsCheck] = React.useState([]);
function addArrayCarts(event){
   
    let fs = JSON.parse(event.target.value);
  if(cartsCheck[fs.cpf]){
    cartsCheck[fs.cpf] = false;
    console.log(arrayCarts);
    console.log(fs);
    console.log(cartsCheck);
    setArrayCarts(arrayCarts.filter(item => item.cpf !== fs.cpf));
  }else{
     cartsCheck[fs.cpf] = true;
     console.log(cartsCheck);
     setArrayCarts(prev=>[...prev,fs]);
  }

  //  let cpf = fs.cpf;
   // setCartsCheck(prev=>[cpf,true])
  

}

function GerarCarteiras(){
  console.log(arrayCarts);
  localStorage.setItem('filiSelected', JSON.stringify(arrayCarts));
   router.push("/printCart");

}
const [selAll, setSelAll] = React.useState(true);

function SelAll(){
  rows2.map((row) => {

    cartsCheck[row.cpf] = true;     
     setArrayCarts(prev=>[...prev,row]); 
    
  });
  setSelAll(!selAll);

}
function DesAll(){
  rows2.map((row) => {  
     cartsCheck[row.cpf] = false;
     setArrayCarts([]);
    
  });
  setSelAll(!selAll);
}

function SelecionaTodas(){

    if(selAll){
      return(
      <Button color="primary" onClick={SelAll}>
        <DoneAll /><Typography variant="h6">Selecionar Todas</Typography>
      </Button>);
    }else{
        return(
        <Button color="primary" onClick={DesAll}>
        <Close /><Typography variant="h6">Desmarcar Todas</Typography>
      </Button>);
    }
  
}

function OpenCheckBox(){ setOpenmul(!openmul); }
  

  const classes = useStyles();

    return(
  <div style={{overflow:"auto"}}>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1"/>
     <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>
		
		<Header/>
        <div style={{margin:"5% 0 0 5%"}}>
          <Grid container >  
              <Grid item xs={12} ></Grid>
                    
              <Grid item xs={12} sm={2}></Grid>
              <Grid item xs={12} sm={3}>
               <Typography variant="h5"> FILIADOS ao SINDIFPM</Typography>
              </Grid>
              <Grid item xs={12} sm={1}></Grid>
              <Grid item xs={12} sm={2}></Grid>
              <Grid item xs={12} sm={2}></Grid>
              
              <Grid item xs={12} sm={2}>
                 <Link href="/addfiliado">
                   <Button color="primary">
                       <GroupAdd />
                       <Typography variant="h6"> filiado</Typography>
                    </Button>
                  </Link>
              </Grid>
              <Grid item xs={12} sm={2}>
                  {
                    openmul ?
                   <Button color="primary" onClick={OpenCheckBox}>
                       <Print />
                       <Typography variant="h6"> Gerar Multiplas Carterinhas</Typography>
                     </Button>
                   :
                   <Button color="primary" onClick={OpenCheckBox}>
                       <Print /><Typography variant="h6">Cancelar</Typography>
                     </Button>                                                         
                    }

                    {!openmul && 
                      <SelecionaTodas/>                  
                     
                    }

                    {arrayCarts.length > 0 && !openmul &&

                      <Button color="primary" onClick={GerarCarteiras}>
                        <DoneAll />
                        <Typography variant="h6"> Confirmar Carterinhas Selecionadas</Typography>
                      </Button>
                    }
                 
              </Grid>
              
           
              <Grid item xs={12}></Grid>


              <Grid item xs={10} >
                <TableContainer component={Paper}>
					  <Table aria-label="collapsible table">
						<TableHead>
						  <TableRow>
							<TableCell />
							<TableCell>Nome Filiado</TableCell>
							<TableCell align="right">Função</TableCell>
							<TableCell align="right">Data de Nasc.</TableCell>
							<TableCell align="right">Data de Admissão</TableCell>
							<TableCell align="right">Nome do Pai</TableCell>
							<TableCell align="right">Nome da Mãe</TableCell>
							<TableCell align="right">RG</TableCell>
							<TableCell align="right">CPF</TableCell>
							<TableCell align="right">Nº Cart. Sócio</TableCell>
							<TableCell align="right">Data de Valid.</TableCell>
							<TableCell align="right">Ações</TableCell>

						  </TableRow>
						</TableHead>
						<TableBody>
						  {rows2.map((row,index) => (
							<Row key={row.cpf} row={row} />
						  ))}
						</TableBody>
					  </Table>
					</TableContainer>
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