import { useState, useEffect } from "react";


export function Form() {
 const [form, setFormData] = useState({
   name: "",
   first_appearance: "",
 });




 function handleChange(event) {
   setFormData({
     ...form,
     [event.target.name]: event.target.value,
   });
   console.log(form);
 }


 function handleSubmit(event) {
   event.preventDefault();
   fetch("http://localhost:8080/doctor_who_villains", {
     method: "POST",
     body: JSON.stringify(form),
     headers: {
       "Content-type": "application/json",
     },
   });
 }


 return {(
       <div>
       <form onsubmit={handleSubmit}></form>
       <label>Name of Creature</label>;
       <input name = "name" onchange={handleChange}></input>
       <label>When you first spotted them</label>
       <input name = "first_appearance" onchange={handleChange}></input>


       <button type="submit">Submit</button>
       </div>
   )
}
