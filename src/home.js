import { useContext, useEffect, createContext, useState } from "react";
import axios from "axios";
import ReactModal from "react-modal";
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
    const classes = styles();
    const {user, isdark, amt} = props;
    const [valueTheme] = useState(isdark?themes.dark:themes.light);
    const [suser] = useState(user);
    const [data, setData] = useState([]);
    const [myamt, setAmt] = useState(amt);
    const [isModal, setModal] = useState(false);
    const [result, setResult] = useState([]);    
    //console.log(result);
    console.log(myamt)

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

    const handleModal = (results) => {
        setModal(true);
        setResult(results);
        console.log(result);
    };

    useEffect(() => {
        axios({
            method: "get",
            url: "http://localhost:3001/data",
            headers: {
                accept: "*/*"
            }
        }).then((data)=>{
            setData(data.data);
            console.log(data.data[1]);
            setResult(data.data[1]);
        }).catch((error)=>{console.log(error)})
        
    }, []);

    return(
        <ThemeContext.Provider value={valueTheme}>
            <ReactModal isOpen={isModal}>
                <div>
                <b>Deskripsi produk :</b>
                <p>{isModal&&`${result.desc.cpu}`}</p>
                <p>{isModal&&`${result.desc.ram}` }</p>
                <p>{isModal&&`${result.desc.vga}` }</p>
                <p>{isModal&&`${result.desc.str}` }</p>
                <button onClick={() => setModal(false)}>Tutup</button>
                </div>
            </ReactModal>
            <div className="contentWrapper" style = {{backgroundColor: `${valueTheme.background}`}}>
            <div className="bg-white shadow">
                <div style={{ marginTop: 20 }}>
                <h1>KATALOG LAPTOP</h1>
                <Grid container md={10} spacing={5} style={{ marginTop:"30px", marginLeft:"auto", marginRight:"auto"}}>
                {data.map((datas) => {
                    return(
                    <Grid item key={datas.id} md={3} >
                        <Card className={classes.paper}>
                        <CardActionArea>
                            <CardMedia
                                style={{
                                    height: "150px",
                                    margin: "auto",
                                    paddingTop: "5%",
                                    }}
                                component="img"
                                image={datas.image}
                                alt="Gambar"
                                />
                            <CardContent>
                            <Typography style={{ fontWeight: "bold" }}>
                            {datas.nama}<sup>{`${datas.isads && datas.isads === "True" ? "ads" : ""}`}</sup>
                            </Typography>
                            <Typography variant="h6" color="text.secondary">
                            <NumberFormat value={datas.harga} displayType={'text'} thousandSeparator={"."} decimalSeparator={","} prefix={'Rp'} />
                            </Typography>
                              {myamt.map((damt) => {if(datas.id==damt.id){
                                return(
                                <table align="center">
                                <tr>
                                <td><Button variant="contained" id={damt.id} onClick={() => countDn(damt.id)}>-</Button></td>
                                <td><p ></p>{`${damt.amount}`}</td>
                                <td><Button variant="contained" id={damt.id} onClick={() => countUp(damt.id)}>+</Button></td>
                                </tr>
                                </table>
                              )
                               }})} 
                            <Button color="primary" variant="contained" onClick={() => handleModal(datas)}>Open Modal</Button>
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