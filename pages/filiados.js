import React, { useState, Component, useEffect } from 'react';
import { withIronSession } from "next-iron-session";
import { useRouter } from 'next/router';
import {Avatar, makeStyles, Modal, FormControl, FormLabel, Radio, RadioGroup,InputLabel,Collapse,
    AppBar,Toolbar,    Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,
    IconButton,Icon, Button, CssBaseline, TextField, FormControlLabel, Checkbox ,Grid,Box, Typography} from '@material-ui/core';



import {Facebook ,GroupAdd, Save,YouTube,AssignmentInd, People,KeyboardArrowDown,KeyboardArrowUp,
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
				const fili = childSnapshot;
				  setRows(prev=>[...prev,fili]);
				  
				childSnapshot.child("dependentes").forEach(function(dep){
					console.log(dep.val()); 
					
				 });

		  });
	     
		console.log(rows2);
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

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const salvarNovasInfos = () => {
		console.log(rows2);
		console.log(rows);
    
  }
const [rows2, setRows] = useState([]);

  
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  console.log(rows);
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
  
function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      { date: '2020-01-05', customerId: '11091700', amount: 3 },
      { date: '2020-01-02', customerId: 'Anonymous', amount: 1 },
    ],
  };
}
 const router = useRouter();


function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
	console.log(row);
	console.log(row.val());
	const deps = row.child("dependentes");
	deps.forEach((dep)=>(
		console.log(dep.key)
	))
  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.val().nome}
        </TableCell>
        <TableCell align="right">{row.val().funcao}</TableCell>
        <TableCell align="right">{row.val().dataNasc}</TableCell>
        <TableCell align="right">{row.val().dataAdm}</TableCell>
        <TableCell align="right">{row.val().nomePai}</TableCell>
        <TableCell align="right">{row.val().nomeMae}</TableCell>
        <TableCell align="right">{row.val().rg}</TableCell>
        <TableCell align="right">{row.val().cpf}</TableCell>
        <TableCell align="right">{row.val().numCart}</TableCell>
        <TableCell align="right">{row.val().dataValid}</TableCell>
        <TableCell align="right"><Button type="button" onClick={() => {   localStorage.setItem('filiSelected', JSON.stringify(row.val())), router.push("/printCart")}}><Print/></Button></TableCell>
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
					  {row.child("dependentes").forEach((dep) => (
						<TableRow key={dep.key}>
						  <TableCell component="th" scope="row">
							{dep.val().nomeComp}
								{console.log(dep.val().nomeComp)}
						  </TableCell>
						  <TableCell>{dep.val().dataNasc}</TableCell>
						  <TableCell align="right">{dep.val().rg}</TableCell>
						  <TableCell align="right">
							{dep.val().cpf}
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
  
  

  const classes = useStyles();

    return(
  <div>
    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1"/>
     <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>
		
		<Header/>
        <div style={{margin:"5% 0 0 5%"}}>
          <Grid container spacing={2}>  
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
               <Button onClick={salvarNovasInfos} color="primary">
                       <GroupAdd />
                       <Typography variant="h6"> filiado</Typography>
                    </Button>
           
              <Grid item xs={12}></Grid>

              <Grid item xs={2} ></Grid>

              <Grid item xs={6} >
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
						  {rows2.map((row) => (
							<Row key={row.val().cpf} row={row} />
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