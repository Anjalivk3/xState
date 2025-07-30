import React, { useState, useEffect } from "react";
import styles from "./SelectComponent.module.css";
const SelectComponent = () => {
    const [countryData, setCountryData] = useState([]); 
    const [stateData, setStateData] = useState([]);        
    const [cityData, setCityData] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedState, setSelectedState] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    const countryDataFetch = async () => {
      try {
        const apiRes = await fetch("https://crio-location-selector.onrender.com/countries");
        const actualData = await apiRes.json();        
        setCountryData(actualData);
        setSelectedCountry("");
        setSelectedState("");
        setStateData([]);
        console.log("Country Data" + actualData + "close country data");    
      } catch (error) {
        console.error("Error during fetching: ", error);
      }
    }

    
    const stateDataFetch = async () => {
      if(selectedCountry){
          try {        
        const apiRes = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/states`);
        const actualData = await apiRes.json(); 
        console.log("States Data" + actualData);       
        setStateData(actualData);  
        setSelectedState("");
        setSelectedCity("");  
        setCityData([]);
      } catch (error) {
          console.error("Error during fetching:", error);
      }
      }      
    }   
    
    const cityDataFetch  = async () => {
      if(selectedCountry && selectedState){
        try {        
        const apiRes = await fetch(`https://crio-location-selector.onrender.com/country=${selectedCountry}/state=${selectedState}/cities`);
        const actualData = await apiRes.json(); 
        console.log("Cities Data" + actualData);       
        setCityData(actualData);        
      } catch (error) {
          console.error("Error during fetching:", error);
      }
      }      
    }   

    useEffect(()=> { 
        countryDataFetch();   
     }, []);

    useEffect(()=> { 
        stateDataFetch();
    }, [selectedCountry]); 

    useEffect(()=>{
        cityDataFetch();
    }, [selectedCountry, selectedState]);

    return (
      <>
      <div className={styles.selectWrapper}>
         <h1>Select Location</h1>     
        <select className={styles.dropdowncss} onChange={(e)=>{setSelectedCountry(e.target.value)}} value={selectedCountry}>
          <option value="" disabled>
            Select Country
          </option>          
          { 
            countryData.map((country) => (
              <option key={country} value={country}>{country}</option>
            ))
          }         
         </select>


        <select className={styles.dropdowncss} onChange={(e)=>{setSelectedState(e.target.value)}} value={selectedState} disabled={!selectedCountry}>
          <option value="" disabled>
            Select State
          </option>          
          { 
            stateData.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))
          }         
         </select>     
         
         <select className={styles.dropdowncss} onChange={(e)=> { setSelectedCity(e.target.value) }} value={selectedCity} disabled={!selectedState}>
          <option value="" disabled>
            Select City
          </option>          
          { 
            cityData.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))
          }         
         </select>
               
      </div>
      { selectedCity &&
          <h2>You selected <span className={styles.highlight}>{selectedCity}</span>,
          <span className={styles.blur}>{" "} {selectedState},  {selectedCountry}</span>
          </h2>     
    }
      </>
    )
}
export default SelectComponent;