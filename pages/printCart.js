import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import {Typography, CardContent, ButtonBase, Paper, CardActionArea, Grid, Card, Avatar} from "@material-ui/core";
import fire from '../config/fire-config';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 500,
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default function ComplexGrid() {
  const classes = useStyles();
	const [logo, setLogo] = useState("");

	const storageRef = fire.storage().ref();
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
	});
	
	
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            <ButtonBase className={classes.image}>
              <img className={classes.img} alt="complex" src={logo} />
            </ButtonBase>
          </Grid>
          <Grid item xs={12} sm container>
            <Grid item xs container direction="column" spacing={2}>
              <Grid item xs>
                <Typography gutterBottom variant="subtitle1">
                  SINDFPM
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Full resolution 1920x1080 • JPEG
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ID: 1030114
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2" style={{ cursor: 'pointer' }}>
                  Remove
                </Typography>
              </Grid>
            </Grid>
            <Grid item>
              <Typography variant="subtitle1">$19.00</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}