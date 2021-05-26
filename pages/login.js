import  Link2 from 'next/link';

import fire from '../config/fire-config';
import { useRouter } from 'next/router';

import React, { useState, useEffect} from 'react';
import {Avatar,Container , Button, CssBaseline, LinearProgress,
  TextField, FormControlLabel, Checkbox,Link ,Grid,Box, Typography} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import {makeStyles}  from '@material-ui/core/styles';
import {Form, FormGroup, Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="#">
        SINDIFPM - SGC
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function Login() {
  const classes = useStyles();
  const router = useRouter();
  const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const handlerSubmit = async (e) => {
  setExibe(true);
  setFiltro("blur(5px)");

  e.preventDefault();
  fire.auth().signInWithEmailAndPassword(email, password)
  .then(async(e) => {

    const response = await fetch("api/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });
    console.log(response);
    if (response.ok) {
      return router.push("/");
    }

  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    // ..
  });
  
}


const onChangeHandler = event => {
  const { name, value } = event.currentTarget;
  if (name === "email") {
    setEmail(value);
  } else if (name === "password") {
    setPassword(value);
  } 
};

const [exibe, setExibe] = useState(false); 
const [filtro, setFiltro] = useState(""); 

  
  
  return (
        <div >

    {exibe &&
      <LinearProgress style={{marginTop: "27%",marginBottom: "-33%"}}/>
      
    }
    <Container component="main" maxWidth="xs" style={{filter:filtro }}>
      <CssBaseline />
      <div className={classes.paper}>
       
           <img className={classes.img} style={{ maxWidth: '62%', minWidth: '62%'}} alt="complex" src="logo.jpg" />

        <Typography component="h1" variant="h5">
          SINDIFPM
        </Typography>
      
          <Form>
			  <FormGroup>
				<Label for="exampleEmail">Email</Label>
				<Input  onChange={event => onChangeHandler(event)} type="email" name="email" id="exampleEmail" placeholder="Insira seu E-mail" />
			  </FormGroup>
			  <FormGroup>
				<Label for="examplePassword">Password</Label>
				<Input  onChange={event => onChangeHandler(event)} type="password" name="password" id="examplePassword" placeholder="Insira sua senha" />
			  </FormGroup>
			  <br/><br/><br/>
			  <Button
				type="submit"
				fullWidth
				variant="contained"
				color="primary"
				className={classes.submit}
				onClick={handlerSubmit}
			  >
				Sign In
			  </Button>
			  <Grid style={{display:"none"}} container>
				<Grid item xs>
				  <Link href="#" variant="body2">
					Esqueceu a Senha?
				  </Link>
				</Grid>
				<Grid item>
				  <Link2 href="/Controle/cadastro" variant="body2">
					{"Ainda não tem conta? Cadastre-se"}
				  </Link2>
				</Grid>
			  </Grid>
        </Form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
     </div>

  );
}

export default Login;