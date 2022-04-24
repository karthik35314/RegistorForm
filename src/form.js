import React, { useState, useEffect } from "react";
import Select from "react-select";
import csc from "country-state-city";
import validate from "./validation";

const Form = ({}) => {
  const [values, setValues] = useState("");
  const [states, setState] = React.useState({});

  const handle = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setState({ ...states, [name]: value });
    const data = validate(name, value);
    setState((previousData) => ({
      ...previousData,
      [name + "Valid"]: data.valid,
      [name + "Error"]: data.error,
    }));
  };

  

  const countries = csc.getAllCountries();
  const updatedCountries = countries.map((country) => ({
    label: country.name,
    value: country.id,
    ...country,
  }));
  const updatedStates = (countryId) =>
    csc
      .getStatesOfCountry(countryId)
      .map((state) => ({ label: state.name, value: state.id, ...state }));
  const updatedCities = (stateId) =>
    csc
      .getCitiesOfState(stateId)
      .map((city) => ({ label: city.name, value: city.id, ...city }));

  useEffect(() => {}, [values]);
  console.log(values);
  const colourStyles = {
    control: (styles) => ({
      ...styles,
      backgroundColor: "white",
      height: "45px",
      width: "100%",
      outline: "none !important",
      border: "2px solid #9b59b6",
    }),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      return {
        ...styles,

        color: "voilet",
        cursor: isDisabled ? "not-allowed" : "default",
      };
    },
  };

 
  let { country, state, city } = values;
 
  let {
    fullnameValid,
    contactEmailValid,
    phoneNumberValid,
    messageValid,
    contactEmail,
    fullname,
    phoneNumber,
  
  } = states;

  let empty =
    contactEmail &&
    fullname &&
    phoneNumberValid &&
    messageValid &&
    country !== undefined &&
    state !== null &&
    city !== null;
  let valid = fullnameValid && contactEmailValid && phoneNumber && messageValid;
  const handlesubmit = (e, ) => {
   
    e.preventDefault();
    alert( JSON.stringify(states,values)
     )
    
  };
 
  return (
    <div class="container">
      <div class="title">Registration</div>
      <div class="content">
        <form action="#">
          <div class="user-details">
            <div class="input-box">
              <span class="details">Full Name</span>
              <input
                type="text"
                name="fullname"
                onChange={(e) => handle(e)}
                placeholder="Enter your name"
              />
              <span class="details text-danger">
                {" "}
                {states.fullnameError ? states.fullnameError : ""}
              </span>
            </div>
            <div class="input-box">
              <span class="details">Email</span>
              <input
                type="text"
                name="contactEmail"
                onChange={(e) => handle(e)}
                placeholder="Enter your email"
              />
              <span class="details text-danger">
                {" "}
                {states.contactEmailError ? states.contactEmailError : ""}
              </span>
            </div>
            <div class="input-box">
              <span class="details">Phone number</span>
              <input
                type="text"
                name="phoneNumber"
                onChange={(e) => handle(e)}
                placeholder="Enter your phone number "
              />
              <span class=" details text-danger">
                {" "}
                {states.phoneNumberError ? states.phoneNumberError : ""}
              </span>
            </div>
            <div class="input-box ">
              <span class="details">Country</span>
              <Select
                id="country"
                name="country"
                label="country"
                options={updatedCountries}
                value={values.country}
                onChange={(value) => {
                  setValues(
                    { ...values, country: value, state: null, city: null },
                    false
                  );
                }}
                styles={colourStyles}
              />
              {states.country}
            </div>
            <div class="input-box">
              <span class="details">state</span>
              <Select
                id="state"
                name="state"
                options={updatedStates(
                  values.country ? values.country.value : null
                )}
                value={values.state}
                onChange={(value) => {
               
                  setValues({ ...values, state: value, city: null }, false);
                }}
                styles={colourStyles}
              />
            </div>
            <div class="input-box">
              <span class="details">city</span>
              <Select
                id="city"
                name="city"
                options={updatedCities(
                  values.state ? values.state.value : null
                )}
                value={values.city}
                onChange={(value) => {
                  setValues({ ...values, city: value }, false);
                }}
                styles={colourStyles}
              />
            </div>
          </div>
          <div class=" input-box ">
            <span class="details">Message</span>
            <textarea
              class="input-box-area"
              name="message"
              placeholder="Enter Message"
              onChange={(e) => handle(e)}
            ></textarea>
            <span class="details text-danger">
              {" "}
              {states.messageError ? states.messageError : ""}
            </span>
          </div>
          {valid && empty ? (
            <button
              class="btn btn-success"
              type="submit"
              onClick={(e) => {
                handlesubmit(e);
              }}
            >
              Register{" "}
            </button>
          ) : (
            <button  disabled class="btn btn-secondary" type="submit">
              Register{" "}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;
