import React, { useEffect, useState } from "react";
import "./App.css";
import web3 from "./web3";
import scbackend from "./scbackend";
import BookForm from "./components/BookForm";
import GetBookingForm from "./components/GetBookingForm";
import GetAllBookings from "./components/GetAllBookings";


function App() {
  const [message, setMessage] = useState("");
  const [backend, setBackend] = useState("");
  //const [players, setPlayers] = useState([]);
  const [backendBalance, setBalance] = useState("");

  useEffect(() => {
    async function fetchManager() {
      const backend = await scbackend.methods.backend().call();
      //const players = await scbackend.methods.getPlayers().call();
      const balance = await web3.eth.getBalance(scbackend.options.address);
      setBackend(backend);
      //setPlayers(players);
      setBalance(balance);
    }

    fetchManager();
  });

  console.log(backend);
  //console.log(players);

  return (
    <div>
      <h2>Backend Contract</h2>
      <p>This contract is deployed by {backend}</p>
      <p>
                {web3.utils.fromWei(backendBalance, "ether")} ether!
      </p>
      <hr />
      <BookForm setMessage={setMessage} />
      <hr />
      <br></br><p>**********************************************</p><br></br>
      <hr />
      <GetBookingForm setMessage={setMessage} />
      <br></br><p>**********************************************</p><br></br>
      <hr />
      <GetAllBookings setMessage={setMessage} />
      <hr />
      <br></br><p>**********************************************</p><br></br>
      <hr />
      <hr />
      <h3>{message}</h3>
      <hr />
      <hr />
      <br></br><p>**********************************************</p><br></br>
      <hr />
      <h4>by GG AND MM</h4>
    </div>
  );
}

export default App;
