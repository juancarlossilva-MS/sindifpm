import React, { useState, Component, useEffect } from 'react';
import { withIronSession } from "next-iron-session";
import { useRouter } from 'next/router';
import {Avatar, makeStyles, Modal, FormControl, FormLabel, Radio, RadioGroup,InputLabel,
    AppBar,Toolbar,    Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,
    IconButton,Icon, Button, CssBaseline, TextField, FormControlLabel, Checkbox ,Grid,Box, Typography} from '@material-ui/core';



import {Facebook ,GroupAdd, Save,YouTube,AssignmentInd, People} from '@material-ui/icons/';

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
            <div>
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


  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  
  const classes = useStyles();

    return(
  <div>
     <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"></link>


    <AppBar position="static">
    <Toolbar>
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
      <MenuIcon />
    </IconButton>
    <Link href="/">
      <Button color="inherit">
      <Typography variant="h6" className={classes.title}>
        SINDIFPM
      </Typography>
      </Button>
    </Link>
    <h6 style={{marginLeft: '79%'}}>{user.email}</h6>
    <Button color="inherit">sair</Button>
  </Toolbar>
</AppBar>
        
          <Grid container spacing={2}>  
              <Grid item xs={12} ></Grid>
                    
              <Grid item xs={12} sm={3}></Grid>
              <Grid item xs={12} sm={3}>
               <Typography variant="h5"> Adicionar Filiado</Typography>
              </Grid>
              <Grid item xs={12} sm={6}></Grid>
              <Grid item xs={12}></Grid> {/*like a broken line*/}

              <Grid item xs={3}  ></Grid>

              <Grid item xs={6}  sm={2}> <TextField required   variant="outlined" id="nome" label="Nome" defaultValue="" /></Grid>
              <Grid item xs={6}  sm={2}> <TextField required  variant="outlined"  id="sobrenome" label="Sobrenome" defaultValue="" /></Grid>

              <Grid item xs={6}  sm={2}> 
              <TextField
                variant="outlined" 
                      id="date"
                      label="Data de Nascimento"
                      type="date"
                      defaultValue="2017-05-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
              </Grid>

            
              <Grid item xs={3}  ></Grid>

              <Grid item xs={12}></Grid> 

              <Grid item xs={3}  ></Grid>

              <Grid item xs={6}  sm={2}> <TextField required id="funcao"  variant="outlined"  label="Função" defaultValue="" /></Grid>
              <Grid item xs={6}  sm={2}> 
              <TextField
                      id="admissao"
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
              <Grid item xs={6}  sm={2}> 
              <TextField
                      id="validade"
                      label="Validade da Carteira"
                      type="date"
                      variant="outlined" 
                      defaultValue="2017-05-24"
                      className={classes.textField}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
              </Grid>
            
              <Grid item xs={3}  ></Grid>

              <Grid item xs={3}  ></Grid>

              <Grid item xs={6}  sm={2}> <TextField required id="nomePai"  variant="outlined"  label="Nome do Pai" defaultValue="" /></Grid>
              <Grid item xs={6}  sm={2}> <TextField required id="nomeMar"  variant="outlined" label="Nome da Mãe" defaultValue="" /></Grid>
              <Grid item xs={6}  sm={2}> <TextField required id="rg" label="RG"  variant="outlined" type="number" defaultValue="" /></Grid>
              <Grid item xs={3}  ></Grid>


              <Grid item xs={3}  ></Grid>

              <Grid item xs={6}  sm={2}> <TextField required id="cpf"  variant="outlined" label="CPF" defaultValue="" /></Grid>
              <Grid item xs={6}  sm={1}> <TextField required id="numSocio"  variant="outlined" label="Carteira Nº" defaultValue="" /></Grid>
              <Grid item xs={3}  ></Grid>

              <Grid item xs={12} sm={3}></Grid>
              <Grid item xs={12} sm={3}></Grid>
              <Grid item xs={12} sm={4} >
               <Typography variant="h5"> Dependentes</Typography>
              </Grid>
              <Grid item xs={12} sm={1} >
                 <Link href="/addfiliado">
                   <Button color="primary">
                       <GroupAdd />
                       <Typography variant="h6"> dependente</Typography>
                    </Button>
                  </Link>
              </Grid>

              <Grid item xs={12} sm={3}  ></Grid>
              <Grid item xs={12} sm={3}  ></Grid>
              <Grid item xs={12} sm={6}  >   <TabelaDependentes/></Grid>
              <Grid item xs={12} sm={8}  ></Grid>
              <Grid item xs={12} sm={4}  >  
              <Button style={{color:"green"}}>
                       <Save />
                       <Typography variant="h6"> salvar</Typography>
                </Button>          
                </Grid>
              
              
          </Grid>

       

          
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