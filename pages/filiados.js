import React, { useState, Component, useEffect } from 'react';
import { withIronSession } from "next-iron-session";
import { useRouter } from 'next/router';
import {Avatar, makeStyles, Modal, FormControl, FormLabel, Radio, RadioGroup,InputLabel,Collapse,
    AppBar,Toolbar,    Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,
    IconButton,Icon, Button, CssBaseline, TextField, FormControlLabel, Checkbox ,Grid,Box, Typography,
	CardContent, LinearProgress, ButtonBase, CardActionArea, Card
	} from '@material-ui/core';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

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
      borderBottom: 'groove',
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
  const classesR = useRowStyles();
//	console.log(row);

	
  return (
    <React.Fragment>
      <TableRow className={classesR.root}>
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
        <TableCell align="right"><Button type="button" onClick={() => {GerarUmaCarteira(row)}}><Print/></Button></TableCell>
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
  setExibe(true);
  setOverflow("hidden");
  setFiltro("blur(5px)");
  printDocument();
  
}


function GerarUmaCarteira(row){
	
	console.log(row);
	
	cartsCheck[row.cpf] = true;
     console.log(cartsCheck);
     setArrayCarts(prev=>[...prev,row]);
	GerarCarteiras();
}


function printDocument(){
	var pdf = new jsPDF("p", "mm", "a4");

	for(let s=0;s< arrayCarts.length;s++){
		const input = document.getElementById('divisor'+s);
		console.log(input);
		html2canvas(input,{scale:4, windowWidth:window.innerWidth,width:1600})
		.then((canvas) => {
			
			const imgData = canvas.toDataURL('image/jpeg',0.3);
			pdf.addImage(imgData, 'JPEG', 0,0,424,123);
			
			if((s+1) == arrayCarts.length){
				let newDate = new Date()

				let date = newDate.getDate()+" "+newDate.getMonth()+" "+newDate.getFullYear();
				
				pdf.save(date+".pdf");
				console.log("fim do salvamento");
				setExibe(false);
				setOverflow("auto");
				setFiltro("");
			}else{
				pdf.addPage();
			}
		});
	}
	
	
}
const [selAll, setSelAll] = React.useState(true);
	const ref = React.createRef();

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

const useStylesCarts = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    maxWidth: 525,
	border: "groove",
    borderWidth: "7px",
    borderColor: "black",
	padding: "5px"
  },
  image: {
    width: 194,
    height: 194,
	marginTop: "-31%",
    marginLeft: "-20%"
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '62%',
    maxHeight: '75%',
  },
 
}));
const classes = useStylesCarts();

function formatar() {
  
  
  var data = new Date();

  var day = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"][data.getDay()];
  var date = data.getDate();
  var month = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"][data.getMonth()];
  var year = data.getFullYear();


  return date + " de "+month+" de "+year;

}


function MoldeCarteira(){

	let k =0;
	const row = [];
	for(k=0;k<arrayCarts.length;k++){
			row.push(
				<Grid container id={"divisor"+k}>
											
								<Grid item xs={3}  >
									<Paper className={classes.paper} style={{maxHeight:"200px", maxWidth:"335px",minHeight:"200px", minWidth:"335px",height:"200px"}}>
									<Grid container spacing={0} style={{maxHeight:"97px",minHeight:"97px"}}>
										<Grid item>
											<ButtonBase className={classes.image}>
											<img className={classes.img} style={{ maxWidth: '62%', minWidth: '62%'}} alt="complex" src="logo.jpg" />
											</ButtonBase>
										</Grid>
										<Grid item xs={12} sm container style={{marginLeft:"-23%",marginRight:"-4%"}}>
											<Grid item xs container direction="column" spacing={0} style={{marginTop:"-6%"}}>
											<Grid item xs>
												<Typography align="center" style={{
													fontWeight: 'bold', fontFamily: '-webkit-body', letterSpacing: '-1px', fontSize: '33px'}}  variant="h5">
												S    I    N   D I F P M
												</Typography>
												<Typography style={{fontSize: "0.8rem", marginTop:"-5%"}} align="center" variant="h6"  >
													<Box lineHeight={1} m={1}>
													Sindicato dos Funcionários Públicos Municipais de Bataguassu - MS
													</Box>
												</Typography>
												
												<Typography align="center" variant="caption" color="" style={{    fontSize: "0.54rem"}}>
													<Box lineHeight={1} m={1} style={{marginRight:"2%",marginLeft:"-1%", marginTop:"-2%"}}>
													Reg. Min. Trabalho e Emprego 46.000.004428/01-11<br/>
													Rua Brasilândia, Nº 495 - Centro <br/>
													Fone: (67) 3541-1065
													</Box>
												</Typography>
											<Typography align="center" variant="body2" style={{fontSize: "0.88rem"}} color="">
												Carteira de Sócio Nº: {(arrayCarts[k].numCart)}
												</Typography>
											</Grid>
											</Grid>
											
										</Grid>
										</Grid>
										<Grid container spacing={1}>
										<Grid item  style={{padding:"2px"}}>
											<Typography align="center" variant="body2" style={{fontSize: "0.88rem"}} color="">
													Nome: {arrayCarts[k].nome + " "+arrayCarts[k].sname}
											</Typography>
										</Grid>
										</Grid>
										<Grid container spacing={1}>
										<Grid item style={{padding:"2px"}}>
											<Typography align="center" variant="body2" style={{fontSize: "0.88rem"}} color="">
												Função: {(arrayCarts[k].funcao)}
											</Typography>
										</Grid>
										</Grid>
										<Grid container spacing={1}>
											<Grid item xs={12} sm={4} style={{padding:"2px"}}>
												<Typography  variant="body2" style={{fontSize: "0.88rem",letterSpacing:"-1px"}} color="">
													Data de Admissão:
												</Typography>
											</Grid>
											<Grid item xs={12} sm={2} style={{padding:"2px",marginLeft:"-3%"}}>
												<Typography  variant="body2" style={{fontSize: "0.88rem"}} color="">
													 {dataNasc(arrayCarts[k].dataAdm)}
												</Typography>
											</Grid>
											<Grid item xs={12} sm={4} style={{padding:"2px",marginLeft:"14%"}}>
												<Typography  variant="body2" style={{fontSize: "0.88rem",letterSpacing:"-1px"}} color="">
													Válida até: 
												</Typography>
											</Grid>
											<Grid item xs={12} sm={2} style={{padding:"2px",marginLeft:"-17%"}}>
												<Typography  variant="body2" style={{fontSize: "0.88rem"}} color="">
													 {dataNasc(arrayCarts[k].dataValid)}
												</Typography>
											</Grid>
										</Grid>
										<Grid container spacing={2} >
										<Grid item xs={12} style={{padding:"6px"}}>
											<Typography align="right" style={{fontSize: "0.68rem"}} variant="body2" color="">
												Bataguassu, {formatar()}
											</Typography>
										</Grid>
										</Grid>
										<Grid container spacing={7}>
										<Grid item xs={12} style={{padding:"31px"}}>
											<Typography align="center" style={{fontSize: "0.68rem"}} variant="body2" color="">
												____________________
												
											</Typography>
											<Typography align="center"  style={{fontSize: "0.48rem"}} variant="body2" color="">
												
												Presidente
											</Typography>
										</Grid>
										</Grid>
									</Paper>
									<Paper className={classes.paper} style={{maxHeight:"200px", maxWidth:"335px",minHeight:"200px", minWidth:"335px",height:"200px"}}>
									<Grid container spacing={0} style={{maxHeight:"97px"}}>
							
							
									
									
										<Grid item xs>
											<Typography align="center" style={{
												fontWeight: 'bold', fontFamily: '-webkit-body', letterSpacing: '-1px', fontSize: '33px'}}  variant="h5">
											FILIAÇÃO
											</Typography>
											
										</Grid>
									
									</Grid>
									<Grid container spacing={1}>
										<Grid item  style={{padding:"2px"}}>
											<Typography align="center" variant="body2" style={{fontSize: "1.2rem"}} color="">
													Pai: {arrayCarts[k].nomePai}
											</Typography>
										</Grid>
										</Grid>
										<Grid container spacing={1}>
											<Grid item  style={{padding:"2px"}}>
												<Typography align="center" variant="body2" style={{fontSize: "1.2rem"}} color="">
														Mãe: {arrayCarts[k].nomeMae}
												</Typography>
											</Grid>
										</Grid>
										<Grid container spacing={1}>
											<Grid item  style={{padding:"2px"}}>
												<Typography align="center" variant="body2" style={{fontSize: "1.2rem"}} color="">
														RG: {arrayCarts[k].rg}
												</Typography>
											</Grid>
										</Grid>
										<Grid container spacing={1}>
											<Grid item  style={{padding:"2px"}}>
												<Typography align="center" variant="body2" style={{fontSize: "1.2rem"}} color="">
														Data de Nacimento: {dataNasc(arrayCarts[k].dataNasc)}
												</Typography>
											</Grid>
										</Grid>
										<Grid container spacing={1}>

											<Grid item  style={{padding:"2px"}}>
												<Typography align="center" variant="body2" style={{fontSize: "1.2rem"}} color="">
														CPF: {arrayCarts[k].cpf}
												</Typography>
											</Grid>
										</Grid>


									

								</Paper>
								</Grid>
					</Grid>		
			);	
			row.push(<br/>);
		
	}
				
		

	return row;


}

function dataNasc(data){
	return data[8]+data[9]+"/"+data[5]+data[6]+"/"+data[0]+data[1]+data[2]+data[3];
}

function OpenCheckBox(){ setOpenmul(!openmul); }
const [exibe, setExibe] = useState(false); 
const [filtro, setFiltro] = useState(""); 
const [overflow, setOverflow] = useState("auto"); 
const [exibeCarts, setExibeCarts] = useState(false); 




  const classesP = useStylesCarts();

    return(
	<div style={{overflow:overflow }}>
	{exibe &&
		<LinearProgress style={{marginTop: "27%",marginBottom: "-33%"}}/>
		
	}
	<div style={{filter:filtro }}>
	 
  
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
                <TableContainer style={{backgroundColor:"unset"}} component={Paper}>
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
		 {arrayCarts.length > 0 && !openmul &&
			<div>
				<br/>
			  <br/>
			  <br/>
			  <br/>
			  <br/>
			  <br/>
			  <br/>
			  <br/>
				<br/>
			  <br/>
			  <br/>
			  <br/>
			  <br/>
			  <br/>
			  <br/>
			  <br/>
				<br/>
			  <br/>
			  <br/>
			  <br/>
			  <br/>
			  <br/>
			  <br/>
			  <br/><br/>
			  <br/>
			  <br/>
			  <br/>
			  <br/>
			  <br/>
			  <br/>
			  <br/>
				<br/>
			  <br/>
			  <br/>
			  <br/>
			  <br/>
			  <br/>
			  <br/>
			  <br/>
				<br/>
			  <br/>
			  <br/>
			  <br/>
			  <br/>
			  <br/>
			  <br/>
			  <br/>
			  	<div ref={ref} id="divToPrint" width={1600} className={classesP.root}>
					<MoldeCarteira/>
				</div>		  
			</div>		  
		  }
		  
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