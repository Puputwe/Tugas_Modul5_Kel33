import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";


const styles = makeStyles((theme) => ({
  paper: {
    margin: theme.spacing(2),
    justifyContent: "flex-end",
    textAlign: "center",
    paddingBottom: theme.spacing(2),
    backgroundColor: "white",
    ["@media (max-width:600px)"]: {
      flexDirection: "column",
    },
  },
}));

export default function CardInfo(props) {
const classes = styles();
const { title, info, tglPost, author } = props;
return (
<div style={{ marginTop: 20 }}>
                <Grid container md={11} spacing={4} style={{ marginTop:"30px", marginLeft:"auto", marginRight:"auto"}}>
                    <Grid md={5} >
                        <Card className={classes.paper}>
                        <CardActionArea>
                            <CardContent>
                            <Typography gutterBottom variant="h4" color="secondary" component="div">{title}</Typography>
                            <Typography style={{ fontWeight: "bold" }}>Di Posting pada: {tglPost}</Typography>
                            <Typography variant="h6" align="justify" color="text.secondary">{info}</Typography>
                                <table align="center">
                                <tr>
                                <td><Typography  style={{ fontWeight: "bold" }}>- by : {author}</Typography></td>
                                </tr>
                                <tr>
                                <td><Button color="secondary" variant="contained" href="https://shopee.co.id/">Get Promo</Button></td>
                                </tr>
                                </table>    
                        </CardContent>
                        </CardActionArea>
                        </Card>
                        </Grid>
                </Grid>
                </div>
);
}

