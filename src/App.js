//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Link, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from "react";
import Home from "./home";
import CardNews from "./component/CardNews"

function App() {
  const [user, setUser] = useState("");
  const [DarkTheme, setTheme] = useState(false);
  const [welcome, setWelcome]=useState(false)
  const [show, setShow] = useState(false);
  var amount = [
    {    id: 0,
        amount: 0
    },
    {
        id: 1,
        amount: 0
    },
    {
        id: 2,
        amount: 0
    },
    {
        id: 3,
        amount: 0
    },
    {
        id: 4,
        amount: 0
    },
    {
        id: 5,
        amount: 0
    },
    {
        id: 6,
        amount: 0
    },
    {
        id: 7,
        amount: 0
    },
]

    useEffect(() => {
        if (user==="") {
          var input = prompt("Masukan nama anda!");
          setUser(input)
          if (input!==""){
            setWelcome(true)
          }
        }
    }, []);

    useEffect(() => {
      if(welcome){
        if(user!==""){
          alert("Selamat Datang "+user+"!")
        }
        setWelcome(false)
      }
    }, [user]);

    const togglemode = () => !DarkTheme?setTheme(true):setTheme(false);
    const greet = () =>{
      if(user!==""){
        alert("Selamat Datang "+user+"!")
      }
    }
  return (
    <BrowserRouter>
      <header>
        <div className="title">
         Kelompok 33
        </div>
        <nav>
          <Link className="text" to="/" >
            Home
          </Link>
          <Link className="text navtext2" to="/component/CardNews">
            News
          </Link>
          <button className="Button" onClick={()=>togglemode()}>
            {DarkTheme?"Dark":"Light"}
          </button>
        </nav>
      </header>
      <div className="container">
            {
                show && (
                    <>
                    <div className="titleWrapper">
                        <p className="title">Change Username</p>
                    </div>
                    <div className="inputWrapper">
                        <div>
                            <input placeholder="name"
                            size="50"
                            value={user}
                            onChange={(event) => setUser(event.target.value)}
                            />
                            <button className="Button" onClick={()=>greet()}>Greet</button>
                        </div>
                    </div>
                    </>
                )
            }
            <button className="Button" onClick={()=>setShow(!show)}>
                {show?"hide":"show"}
            </button>
            </div>
      <Switch>
        <Route path="/" exact component={() => <Home user={user} isdark={DarkTheme} amt={amount}/>}/>
        <Route path="/component/CardNews" component={() => 
        <CardNews title="Promo 9.9 Harga Super MURAH"
          tglPost="1 September 2021"
          info="Cermati brosur kami ya dan bandingkan harganya, promo yang kami berikan benar benar termurah di Salatiga, 
          tidak percaya ? Silakan datang langsung ke Sultan Copm Store di RUKO Pancasila No 8, atau kunjungi Olshop kami di Shoppe : SultanCompStore33 dan dapatkan Extra Cashback hingga 98%"
          author="Admin"/>}/>
      </Switch>
    </BrowserRouter>
  );
}

export default App;