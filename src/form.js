import React,{useState,useEffect} from 'react'
import Select from "react-select";
import csc from "country-state-city";
import validate from "./validation";

const Form = ({}) => {
    const[values,setValues]=useState("")
    const [state, setState] = React.useState({

    });
 
    const handle = (e) => {
        
      e.preventDefault();
      const { name, value } = e.target;
      setState( { ...state, [name]: value });
      const data = validate(name, value);
      setState((previousData) => ({
        ...previousData,
        [name + "Valid"]: data.valid,
        [name + "Error"]: data.error,
      }));
    };
    console.log(state);




//use debouce


  
    const countries = csc.getAllCountries(); 
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
        control: styles => ({ ...styles, backgroundColor: 'white' ,height: '45px',width: "100%",outline: "none !important",border: "2px solid #9b59b6"}),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
       
          return {
            ...styles,
        
            color: 'voilet',
            cursor: isDisabled ? 'not-allowed' : 'default',
           
          }
        },
      
        
      };
    
const handlesubmit=(e)=>{
    e.preventDefault();


}

let {fullnameValid , contactEmailValid ,phoneNumberValid,messageValid,contactEmail,fullname,phoneNumber,message} = state
     
let empty=contactEmail && fullname && phoneNumberValid &&message
 let valid = fullnameValid && contactEmailValid && phoneNumber && messageValid
 
  return (
 
    <div class="container">
    <div class="title">Registration</div>
    <div class="content">
      <form action="#">
        <div class="user-details">
          <div class="input-box">
            <span class="details">Full Name</span>
            <input type="text" name="fullname" onChange={(e) => handle(e)}  placeholder="Enter your name" />
            <span class="text-danger" >    {state.fullnameError ? state.fullnameError : ""}</span>
          </div>
          <div class="input-box">
            <span class="details">Email</span>
            <input type="text"   name="contactEmail" onChange={(e) => handle(e)} placeholder="Enter your email" />
            <span class="text-danger" >  {state.contactEmailError ? state.contactEmailError : ""}</span>
          </div>
          <div class="input-box">
            <span class="details">Phone number</span>
            <input type="text" name="phoneNumber" onChange={(e) => handle(e)} placeholder="Enter your phone number " />
            <span class="text-danger" >      {state.phoneNumberError ? state.phoneNumberError : ""}</span>
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
           
            setValues({ country: value, state: null, city: null }, false);
          }}
          styles={colourStyles}
        />
        {state.country}
          </div>
          <div class="input-box">
            <span class="details">state</span>
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
          </div>
          <div class="input-box">
            <span class="details">city</span>
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
          </div>

       


        </div>
        <div class=" input-box " >
        <span class="details">Message</span> 
       <textarea class="input-box-area" name="message" placeholder="Enter Message" onChange={(e)=>handle(e)} ></textarea>
       <span class="text-danger" >  {state.messageError? state.messageError : ""}</span> 
        </div>
        {
            valid && empty ?
            <div class="button">
          
          <button  onClick={(e)=>{handlesubmit(e)}} value="Register" >click</button>
        </div>
        :"fill"
        }
            <button class="button"  onClick={(e)=>{handlesubmit(e)}} value="Register" >click</button>
      </form>
    </div>
  </div>

  )
}

export default Form