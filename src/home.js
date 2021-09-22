import { useContext, useEffect, createContext, useState } from "react";
//import axios from "axios";
import { Modal } from "./component/Modal";
import { makeStyles } from "@material-ui/core/styles";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import NumberFormat from 'react-number-format';
import "./App.css";

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

const themes = {
    light: {
        text: "Terang",
        background: "#DEE4E7"
    },
    dark: {
        text: "Gelap",
        background: "rgb(40,44,52)"
    }
};

const ThemeContext = createContext();

export default function Context(props){
    const [showModal, setShowModal] = useState(false);
    const classes = styles();
    const {user, isdark, amt} = props;
    const [valueTheme] = useState(isdark?themes.dark:themes.light);
    const [suser] = useState(user);
    const [data, setData] = useState([]);
    const [myamt, setAmt] = useState(amt);
    console.log(myamt);

    const countUp = (e) => {
        console.log(e)
        setAmt(myamt.map((x)=>{
            if(x.id===e&&x.amount<9){
                return {
                    ...x, amount: x.amount+1
                }
            }
            return x;
        }))
    };

    const countDn = (e) => {
        console.log(e)
        setAmt(myamt.map((x)=>{
            if(x.id===e&&x.amount>0){
                return {
                    ...x, amount: x.amount-1
                }
            }
            return x;
        }))
    };

    const openModal = () => {
        setShowModal(true);
      };

      const handleChangeUserScore = ( id ) => {
        setAmt((prev) =>
          prev.map((userScore) => {
            if (userScore.id === id) {
              return {
                ...userScore,
                amount: userScore.amount + 1
              };
            } else {
              return userScore;
            }
          })
        );
      };

    useEffect(() => {
        fetch("http://localhost:3001/data")
            .then((Response) => Response.json())
            .then((data) => {
                setData(data);
                console.log(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return(
        <ThemeContext.Provider value={valueTheme}>
            <div className="contentWrapper" style = {{backgroundColor: `${valueTheme.background}`}}>
            <div className="bg-white shadow">
                <div style={{ marginTop: 20 }}>
                <h1>KATALOG LAPTOP</h1>
                <Grid container md={10} spacing={5} style={{ marginTop:"30px", marginLeft:"auto", marginRight:"auto"}}>
                {data.map((data) => {
                    return(
                    <Grid item key={data.id} md={3} >
                        <Card className={classes.paper}>
                        <CardActionArea>
                            <CardMedia
                                style={{
                                    height: "150px",
                                    margin: "auto",
                                    paddingTop: "5%",
                                    }}
                                component="img"
                                image={data.image}
                                alt="Gambar"
                                />
                            <CardContent>
                            <Typography style={{ fontWeight: "bold" }}>
                            {data.nama}<sup>{`${data.isads && data.isads === "True" ? "ads" : ""}`}</sup>
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                            <NumberFormat value={data.harga} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp'} />
                            </Typography>
                              {myamt.map((damt) => {if(data.id==damt.id){
                                return(
                                <table align="center">
                                <tr>
                                <td><button variant="contained" id={damt.id} onClick={() => countDn(damt.id)}>-</button></td>
                                <td><p ></p>{`${damt.amount}`}</td>
                                <td><button variant="contained" id={damt.id} onClick={() => countUp(damt.id)}>+</button></td>
                                </tr>
                                </table>
                              )
                               }})} 
                            <div><Button color="primary" variant="contained" onClick={openModal}>Open Modal</Button>
                                {showModal ? <Modal setShowModal={setShowModal} /> : null}  
                            </div> 
                        </CardContent>
                        </CardActionArea>
                        </Card>
                        </Grid>
                         )
                })}
                </Grid>
                <Content/> 
                </div>
            </div>
        </div>
        </ThemeContext.Provider>
    )
}

function Content(props){
    return(
        <div>
            <Text />
        </div>
    )
}

function Text(props){
    const theme = useContext(ThemeContext);
    console.log("[context value]", theme);
    return (
        <h3 className="titleContext" style = {{backgroundColor: `${theme.background}`, color: `${theme.text}`}}>Menerapkan Tema {theme.text} </h3>
    )
}