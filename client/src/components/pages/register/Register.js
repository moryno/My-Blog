import { useState } from "react"
import { Link } from "react-router-dom"
import "./register.css"
import axios from "axios";


export default function Register() {
  const [profile, setProfile] =useState({
    username:"",
    email:"",
    password: ""
  });
  
  const [error, setError] = useState(false);


   const handleChange = event =>{
     const {name, value} = event.target;
     setProfile(prevValue=>{
     return { ...prevValue,
       [name]: value
     };
     });
   };

   const handleSubmit = async event => {
     event.preventDefault();
     setError(false);
     try{
      const {data} = await axios.post("/auth/register", profile);
      data && window.location.replace("/login");
     }
     catch(err){
       setError(true);
     }
     
   }

  return (
    <div className="register">
     <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={handleSubmit}>
          <label >Username</label>
          <input
           className="registerInput"
            type={"text"}
            name="username"
             placeholder="Enter your username..." 
              onChange={handleChange} 
              value={profile.username}
             />
          <label >Email</label>
          <input
           className="registerInput"
            type={"email"}
            name="email"
             placeholder="Enter your email..."
             onChange={handleChange} 
             value={profile.email}
             />
          <label >Password</label>
          <input
           className="registerInput"
            type={"password"}
            name="password"
             placeholder="Enter your password..."
              autoComplete="new-password"
              onChange={handleChange} 
              value={profile.password}
              />
          <button
           className="registerButton"
           type="submit"
           >
           Register
           </button>
           {error && <span style={{color: "red", marginTop:"10px"}}>Something went wrong!</span>}
      </form>
      <button className="registerLoginButton">
      <Link className="link" to={"/login"}>Login</Link> 
      </button>
    </div>
  )
}
