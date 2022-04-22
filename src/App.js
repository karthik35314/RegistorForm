import React from "react";
import "./App.css";
import Form from "./form";
import validate from "./validation";


function App() {
  const [state, setState] = React.useState({});
 
  const handle = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setState((previousData) => ({ ...previousData, [name]: value }));
    const data = validate(name, value);
    setState((previousData) => ({
      ...previousData,
      [name + "Valid"]: data.valid,
      [name + "Error"]: data.error,
    }));
  };
  console.log(state);
  return (
    <div>
      {/* <input type="text" name="contactEmail" onChange={(e) => handle(e)} />

      {state.contactEmailError ? state.contactEmailError : ""}
      <br />
      <input type="text" name="phoneNumber" onChange={(e) => handle(e)} />
      {state.phoneNumberError ? state.phoneNumberError : ""}
      <br />
      <input type="text" name="fullname" onChange={(e) => handle(e)} />
      {state.fullnameError ? state.fullnameError : ""} */}

      <Form />

    </div>
  );
}

export default App;
