import React, { useState } from "react";
import web3 from "../web3";
import scbackend from "../scbackend";

function BookForm({ setMessage }) {
  const [add, setAdd] = useState("");
  const [startDate, setStartDate] = useState(0);
  const [endDate, setEndDate] = useState(0);
  const [city, setCity] = useState("");
  const [payment, setPayment] = useState(0);
  const onSubmit = async (event) => {
    event.preventDefault();

    try {

      const accounts = await web3.eth.getAccounts();
      console.log(accounts);

      setMessage("Waiting on transaction success...");

      await scbackend.methods.book(add,startDate,endDate,city,payment).send({
        from: accounts[0],
        gas: '1000000'
    });
/*
      await scbackend.methods.book().send({
        from: accounts[0],
        value: web3.utils.toWei(enterValue, "ether"),
      });*/

      setMessage("You have booked my friend!");
      setAdd("");
      setStartDate(0);
      setEndDate(0);
      setCity("");
      setPayment(0);
    } catch (err) {
      console.log(err)
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h4>Want to book my frieeeeend?</h4>
      <div>
        <label htmlFor="enter-value">Insert your Ethereum Address:</label>
        <input
          id="add-value"
          value={add}
          onChange={(event) => setAdd(event.target.value)}
        /><br></br>
        <label htmlFor="enter-value">Insert the start date:</label>
        <input
          id="startDate-value"
          value={startDate}
          onChange={(event) => setStartDate(event.target.value)}
        /><br></br>
        <label htmlFor="enter-value">Insert the end date:</label>
        <input
          id="endDate-value"
          value={endDate}
          onChange={(event) => setEndDate(event.target.value)}
        /><br></br>
        <label htmlFor="enter-value">Insert the city:</label>
        <input
          id="city-value"
          value={city}
          onChange={(event) => setCity(event.target.value)}
        /><br></br>
        <label htmlFor="enter-value">Insert the payment (CASHHH$$$$):</label>
        <input
          id="payment-value"
          value={payment}
          onChange={(event) => setPayment(event.target.value)}
        /><br></br><br></br>
      </div>
      <br></br>
      <button class="button" type="submit">Enter</button>
    </form>
  );
}

export default BookForm;
