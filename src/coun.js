import React, { useEffect, useState } from "react";
import Select from "react-select";
import csc from "country-state-city";

export default function Coun() {
  const[values,setValues]=useState("")
  
  const countries = csc.getAllCountries(); 



  console.log(countries);

  const updatedCountries = countries.map((country) => ({
    label: country.name,
    value: country.id,
    ...country
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

  const colourStyles = {
    control: styles => ({ ...styles, backgroundColor: 'white' ,outline: "none !important",border: "2px solid #9b59b6"}),
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      // const color = chroma(data.color);
      return {
        ...styles,
    
        color: 'voilet',
        cursor: isDisabled ? 'not-allowed' : 'default',
       
      }
    },
    
  };


  return (
    <div className="App">
      <form >
        <Select
          id="country"
          name="country"
          label="country"
          options={updatedCountries}
          value={values.country}
          onChange={(value) => {
            setValues({ country: value, state: null, city: null }, false);
          }}
          styles={colourStyles}
        />
        <Select
          id="state"
          name="state"
          options={updatedStates(values.country ? values.country.value : null)}
          value={values.state}
          onChange={(value) => {
            setValues({ state: value, city: null }, false);
          }}
          styles={colourStyles}
        />
        <Select
          id="city"
          name="city"
          options={updatedCities(values.state ? values.state.value : null)}
          value={values.city}
          onChange={(value) => {
            setValues({  city: value}, false);
          }}
          styles={colourStyles}
         
        />
        <button type="submit">Submit</button>
     
      </form>
    </div>
  );
}
