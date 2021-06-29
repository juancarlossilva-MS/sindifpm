import React, { useState, Component, useEffect } from 'react';
import { withIronSession } from "next-iron-session";
import { useRouter } from 'next/router';
import {Avatar, makeStyles, Modal, FormControl, FormLabel, Radio, RadioGroup,InputLabel,Collapse,
    AppBar,Toolbar,    Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper,
    IconButton,Icon, Button, CssBaseline, TextField, FormControlLabel, Checkbox ,Grid,Box, Typography,
	CardContent, LinearProgress, ButtonBase, CardActionArea, Card
	} from '@material-ui/core';
import {Label, Input } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TablePagination from '@material-ui/core/TablePagination';

import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

import {Facebook ,DoneAll, Close, GroupAdd, Edit, Save,YouTube,AssignmentInd, Delete, People,KeyboardArrowDown,KeyboardArrowUp,
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
      .ref('filiados').orderByChild("numCart")
      .on("value",(snap) => {
        
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
				  setRows(prev=>[res,...prev]);
				  
				

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
	  backgroundColor: "#fafafa"
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
	  maxWidth: "100%"
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


 
 
function ConfirmarDelete(){

	fire.auth().signInWithEmailAndPassword(user.email, password)
	  .then(async(e) => {
			setRows([]);
			fire.database().ref('filiados/'+cpfToDel).remove().then(function() {
						
					setOpenModal(false);
				  });
			
	  })
	  .catch((error) => {
		var errorCode = error.code;
		var errorMessage = error.message;
		// ..
	  });
}
function CancelarDelete(){	setOpenModal(false);}


const [openModal, setOpenModal] = React.useState(false);
const [cpfToDel, setCpfToDel] = React.useState();
let password = "";


  
  class AbrirModalChangeServer extends Component {
      render(){

          return(
              <div >
                <Modal
                      open={openModal}                     
                    >
                     <div style={modalStyle}  className={classes2.paper}>
                            <h2 id="simple-modal-title">Insira sua senha para confirmar exclusão</h2>
                            
							<Input onChange={event => password = (event.target.value)} type="password" name="password" id="examplePassword" placeholder="Insira sua senha" />
							<br/><br/>
							<Button
								type="submit"
								fullWidth
								variant="contained"
								color="primary"
								className={classes.submit}
								onClick={ConfirmarDelete}
							  >
								CONFIRMAR EXCLUSÃO
							  </Button><br/><br/>
							  <Button
								fullWidth
								variant="contained" style={{backgroundColor:"red",color:"#fafafa"}}
								className={classes.submit}
								onClick={CancelarDelete}
							  >
								Cancelar
							  </Button>
						  </div>
                    </Modal>
              </div>

          )

      }

  }





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
        <TableCell >
		<div style={{display: "flex",flexDirection: "row"}}>
			<Button type="button" onClick={() => {GerarUmaCarteira(row)}}><Print/></Button>
			<Button type="button" onClick={() => {setCpfToDel(row.cpf),setOpenModal(true)}}><Delete/></Button>
			<Button type="button" onClick={() => {router.push({pathname:"/editfiliado", query:{cpf:row.cpf}})}}><Edit/></Button>
		</div>
		</TableCell>
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
const [imgsLoaded, setImgsLoaded] = React.useState('');
function addArrayCarts(event){
   
  let fs = JSON.parse(event.target.value);
  if(cartsCheck[fs.cpf]){
    cartsCheck[fs.cpf] = false;
    
    setArrayCarts(arrayCarts.filter(item => item.cpf !== fs.cpf));
  }else{
     cartsCheck[fs.cpf] = true;
     setArrayCarts(prev=>[...prev,fs]);
  }

  //  let cpf = fs.cpf;
   // setCartsCheck(prev=>[cpf,true])
  

}


async function geraImages(){
	let imgs = "";

var pri = document.getElementById("ifmcontentstoprint").contentWindow;

	
	for(let s=0;s< arrayCarts.length;s++){
	   const input = document.getElementById('divisor'+s); console.log(input);
	   html2canvas(input,{scrollY:(29+(rowsPerPage*3)),scale:4, width:700,height:1000,
	
		}).then((canvas) => {
				   var myImage = canvas.toDataURL('image/jpeg',0.3);
				   pri.document.open();
				   //const img = document.createElement("img");
			   //	img.src = myImage;
				   //img.style = "width:100%"
				   //pri.document.appendChild("<img  style='width:100%' src='"+myImage+"''/>");
   
				   imgs = imgs+"<img  style='width:100%' src='"+myImage+"''/>";
				   
				   if((s+1) == arrayCarts.length){
						pri.document.write(imgs);
						setImgsLoaded(imgs);
					}

	   })
   }
   
}


useEffect(()=>{
	var pri = document.getElementById("ifmcontentstoprint").contentWindow;

	if(imgsLoaded != ""){
			pri.focus();
		pri.print();
	}

},[imgsLoaded])

function GerarCarteiras(){
  //setExibe(true);
  //setOverflow("hidden");
 //setFiltro("blur(5px)");
 // printDocument();
const result = geraImages();

//

 /* setTimeout(function(){

	pri.focus();
			pri.print();
			setArrayCarts([]);

  },1000);*/
}
var popup = null;
function closePrint(){
	if(popup){
		popup.close();
	}
}

function imprimir(){
	var pri = document.getElementById("ifmcontentstoprint").contentWindow;

	pri.focus();
			pri.print();
			setArrayCarts([]);
 	
}


async function GerarUmaCarteira(row){
	
	setFlag(true);
     await setArrayCarts(prev=>[...prev,row])
	 	
}




function printDocument(){
	var pdf = new jsPDF("p", "mm", "a4");

	for(let s=0;s< arrayCarts.length;s++){
		const input = document.getElementById('divisor'+s);
		console.log(input);
		html2canvas(input,{scrollY:0,scale:4, windowWidth:window.innerWidth,width:1600})
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
				//setArrayCarts([]);

			}else{
				pdf.addPage();
			}
		});
	}
	
	
}
const [selAll, setSelAll] = React.useState(true);
	const ref = React.createRef();
	const refBC = React.createRef();

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

const [flag, setFlag] = React.useState(false);

function MoldeCarteira(){
	if(flag){
		useEffect(() => {
		GerarCarteiras()
		setFlag(false);

	  }, []); // <-- empty array means 'run once'
	}
	
	let k =0;
	const row = [];
	for(k=0;k<arrayCarts.length;k++){
			row.push(
				<Grid container style={{position: "fixed"}} id={"divisor"+k}>
											
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
													fontWeight: 'bold', fontFamily: '-webkit-body', letterSpacing: '-1px', fontSize: '28px'}}  variant="h5">
												S    I    N   D I F P M
												</Typography>
												<Typography style={{fontSize: "0.68rem", marginTop:"-5%"}} align="center" variant="h6"  >
													<Box lineHeight={1} m={1}>
													Sindicato dos Funcionários Públicos Municipais de Bataguassu - MS
													</Box>
												</Typography>
												
												<Typography align="center" variant="caption" color="" style={{    fontSize: "0.45rem"}}>
													<Box lineHeight={1} m={1} style={{marginRight:"2%",marginLeft:"-1%", marginTop:"-2%"}}>
													Reg. Min. Trabalho e Emprego 46.000.004428/01-11<br/>
													Rua Brasilândia, Nº 495 - Centro <br/>
													Fone: (67) 3541-1065
													</Box>
												</Typography>
											<Typography align="center" variant="body2" style={{fontSize: "0.68rem"}} color="">
												Carteira de Sócio Nº: {(arrayCarts[k].numCart)}
												</Typography>
											</Grid>
											</Grid>
											
										</Grid>
										</Grid>
										<Grid container spacing={1}>
										<Grid item  style={{padding:"2px"}}>
											<Typography align="center" variant="body2" style={{fontSize: "0.68rem"}} color="">
													Nome: {arrayCarts[k].nome + " "+arrayCarts[k].sname}
											</Typography>
										</Grid>
										</Grid>
										<Grid container spacing={1}>
										<Grid item style={{padding:"2px"}}>
											<Typography align="center" variant="body2" style={{fontSize: "0.68rem"}} color="">
												Função: {(arrayCarts[k].funcao)}
											</Typography>
										</Grid>
										</Grid>
										<Grid container spacing={1}>
											<Grid item xs={12} sm={4} style={{padding:"2px"}}>
												<Typography  variant="body2" style={{fontSize: "0.68rem",letterSpacing:"-1px"}} color="">
													Data de Admissão:
												</Typography>
											</Grid>
											<Grid item xs={12} sm={2} style={{padding:"2px",marginLeft:"-3%"}}>
												<Typography  variant="body2" style={{fontSize: "0.68rem"}} color="">
													 {dataNasc(arrayCarts[k].dataAdm)}
												</Typography>
											</Grid>
											<Grid item xs={12} sm={4} style={{padding:"2px",marginLeft:"14%"}}>
												<Typography  variant="body2" style={{fontSize: "0.68rem",letterSpacing:"-1px"}} color="">
													Válida até: 
												</Typography>
											</Grid>
											<Grid item xs={12} sm={2} style={{padding:"2px",marginLeft:"-17%"}}>
												<Typography  variant="body2" style={{fontSize: "0.68rem"}} color="">
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
										<Grid item xs={12} style={{padding:"22px"}}>
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
												fontWeight: 'bold', fontFamily: '-webkit-body', letterSpacing: '-1px', fontSize: '28px'}}  variant="h5">
											DEPENDENTES
											</Typography>
											
										</Grid>
									
									</Grid>
							{arrayCarts[k].dps.map((dep) => (
									<>
									<Grid container spacing={1}>
										<Grid item  style={{padding:"2px"}}>
											<Typography align="center" variant="body2" style={{fontSize: "0.8rem"}} color="">
													Nome: {dep.nomeComp}
											</Typography>
										</Grid>
										</Grid>
										<Grid container spacing={1}>
											<Grid item  style={{padding:"2px"}}>
												<Typography align="left" variant="body2" style={{fontSize: "0.8rem"}} color="">
													Parentesco: {dep.parentesco} | Data de Nasc: {dataNasc(dep.dataNasc)}
												</Typography>
												<Typography align="center" style={{fontSize: "0.68rem",marginTop:"-4%"}} variant="body2" color="">
													_________________________________________________
												</Typography>
											</Grid>
										</Grid>
										</>
									  ))}

									

								</Paper>
								</Grid>
					</Grid>		
			);	
			row.push(<br/>);
		
	}
				
		

	return row;


}

function dataNasc(data){
	
	if(!data){
		return "";
	}else{
		return data[8]+data[9]+"/"+data[5]+data[6]+"/"+data[0]+data[1]+data[2]+data[3];
	}
}

function OpenCheckBox(){ setOpenmul(!openmul); }
const [exibe, setExibe] = useState(false); 
const [filtro, setFiltro] = useState(""); 
const [overflow, setOverflow] = useState("auto"); 
const [exibeCarts, setExibeCarts] = useState(false); 

const handleChangePage = (event, newPage) => {
	console.log("aqui")
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
	  
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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


              <Grid item xs={10} style={{maxWidth:"100%"}}>
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
							<TableCell align="right" key="numCart" sortDirection="desc">Nº Cart. Sócio</TableCell>
							<TableCell align="right">Data de Valid.</TableCell>
							<TableCell >Ações</TableCell>

						  </TableRow>
						</TableHead>
						<TableBody>
						  {rows2.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => (
							<Row key={row.cpf} row={row} />
						  ))}
						</TableBody>
					  </Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={rows2.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
						/>
              </Grid>



          </Grid>
		  <Button ref={refBC} onClick={GerarCarteiras}></Button>
		
          </div>
		  <AbrirModalChangeServer/>
		  {arrayCarts.length > 0 &&
			
			
				<MoldeCarteira/>
			 
			}
		
			<iframe id="ifmcontentstoprint" style={{height: "0px", width: "0px", position: "absolute"}}></iframe>

		  
		 
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