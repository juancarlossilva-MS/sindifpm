import React, {useState, Component, PropTypes} from "react";
import { createMuiTheme, makeStyles } from "@material-ui/core/styles";
import {Typography, CardContent, ButtonBase, Paper, Box, CardActionArea, Grid, Card, Avatar} from "@material-ui/core";
import fire from '../config/fire-config';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';


const useStyles = makeStyles((theme) => ({
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


const theme = createMuiTheme();
theme.typography.body2 = {
  fontSize: '1.2rem'
}
	
	
function Carteira (){
  const classes = useStyles();
	const [logo, setLogo] = useState("");

	/*const storageRef = fire.storage().ref();
	storageRef.child('logo.jpg').getDownloadURL().then(function(url) {
	  // `url` is the download URL for 'images/stars.jpg'

	  // This can be downloaded directly:
	  var xhr = new XMLHttpRequest();
	  xhr.responseType = 'blob';
	  xhr.onload = function(event) {
		var blob = xhr.response;
	  };
	  xhr.open('GET', url);
	  xhr.send();
		setLogo(url);
	}).catch(function(error) {
	  // Handle any errors
	});*/
	
	const ref = React.createRef();
	
function	printDocument() {
	const input = document.getElementById('divToPrint');
	html2canvas(input)
	.then((canvas) => {
	const imgData = canvas.toDataURL('image/png');
	const pdf = new jsPDF();
	pdf.addImage(imgData, 'JPEG', 0, 0);
	// pdf.output('dataurlnewwindow');
	pdf.save("download.pdf");
	})
	;
}
	
return(
   <div>

    <div ref={ref} id="divToPrint" className={classes.root}>
	
      <Paper className={classes.paper} style={{maxHeight:"200px", maxWidth:"335px"}}>
        <Grid container spacing={0} style={{maxHeight:"97px"}}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} style={{ maxWidth: '62%'}} alt="complex" src="logo.jpg" />
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
               <Typography align="center" variant="body2" style={{fontSize: "0.68rem"}} color="">
                 Carteira de Sócio Nº: 
                </Typography>
              </Grid>
            </Grid>
            
          </Grid>
        </Grid>
		<Grid container spacing={1}>
		<Grid item  style={{padding:"2px"}}>
			 <Typography align="center" variant="body2" style={{fontSize: "0.68rem"}} color="">
					Nome: 
              </Typography>
		  </Grid>
		</Grid>
		<Grid container spacing={1}>
          <Grid item style={{padding:"2px"}}>
			 <Typography align="center" variant="body2" style={{fontSize: "0.68rem"}} color="">
                 Função: 
              </Typography>
		  </Grid>
		</Grid>
		<Grid container spacing={1}>
          <Grid item xs={12} sm={6} style={{padding:"2px"}}>
			 <Typography  variant="body2" style={{fontSize: "0.68rem"}} color="">
                 Data de Admissão: 
              </Typography>
		  </Grid>
		  <Grid item xs={12} sm={6} style={{padding:"2px"}}>
			 <Typography  variant="body2" style={{fontSize: "0.68rem"}} color="">
                 Válida até: 
              </Typography>
		  </Grid>
		</Grid>
		<Grid container spacing={2} >
          <Grid item xs={12} style={{padding:"6px"}}>
			 <Typography align="right" style={{fontSize: "0.68rem"}} variant="body2" color="">
                 Bataguassu 12 de Outubro de 2020
              </Typography>
		  </Grid>
		</Grid>
		<Grid container spacing={7}>
          <Grid item xs={12} style={{padding:"22px"}}>
			 <Typography align="center" style={{fontSize: "0.68rem"}} variant="body2" color="">
                 ____________________
				 
              </Typography>
			  <Typography align="center"  style={{fontSize: "0.68rem"}} variant="body2" color="">
                 
				 Presidente
              </Typography>
		  </Grid>
		</Grid>
      </Paper>
    </div>
	<button onClick={printDocument}>Print</button>
	</div>
	  
);


};
	

export default Carteira;







