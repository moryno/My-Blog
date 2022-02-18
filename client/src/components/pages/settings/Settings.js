import "./settings.css";
import Sidebar from "../../sidebar/SideBar";
import { useContext, useState } from "react";
import {Context} from "../../../context/Context";
import axios from "axios";


export default function Settings() {
  const [file,setFile] = useState(null);
 const [username, setUsername] = useState("");
 const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
 const [success, setSuccess] = useState(false);
 const publicFolder = "http://localhost:3030/images/";

 const {user, dispatch} = useContext(Context);

 const handleUpdate = async (event)=>{
   event.preventDefault();
   dispatch({type:"UPDATE_START"});
   const updateUser = {
     userId: user._id, 
     username, 
     email, 
     password
   };
   if(file){
     const data = new FormData();
     const filename =  Date.now() + file.name;
     data.append("name", filename);
     data.append("file", file);
     updateUser.profilePic = filename;

     try{
      await axios.post("/upload", data);
    }
    catch(err){console.log(err)}
  }
  try{
    const {data} = await axios.put("/users/" + user._id, updateUser);
    setSuccess(true);
    dispatch({type:"UPDATE_SUCCESS", payload:data});
  }
  catch(err){
    dispatch({type:"UPDATE_FAILURE"});
  }

   };

   const handleDelete =  async ()=>{
     try{
       await axios.delete("/users/" + user._id, {data: {userId: user._id}});
       window.location.replace("/register");
     }
     catch(err){
       console.log(err);
     }
   };

   
  return (
    <div className="settings">
      <div className="settingsWrapper">
          <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update Your Account</span>
            <span className="settingsDeleteTitle" onClick={handleDelete}>Delete Account</span>
          </div>
          <form className="settingForm" autoComplete="off" onSubmit={handleUpdate}  >
          
            <label>Profile Picture</label>
            <div className="settingsPP">
              <img 
                src={ file? URL.createObjectURL(file) : publicFolder + user.profilePic}
                alt=""
              />
              <label htmlFor="fileInput">
               <i className="settingsPPIcon far fa-user-circle"></i>
              </label>
              <input
               type={"file"}
                id="fileInput"
                 style={{display:"none"}}
                 onChange={(event)=> setFile(event.target.files[0])} 

                 />
            </div>
            <label>Username</label>
            <input
               type={"text"}
                placeholder={user.username}
                 onChange={event=> setUsername(event.target.value)}
                  />
            <label>Email</label>
            <input
              type={"email"}
               placeholder={user.email}
                autoComplete="off"
                onChange={event=> setEmail(event.target.value)}
                  />
            <label>Password</label>
            <input
             type={"password"}
              autoComplete="off"
              onChange={event=> setPassword(event.target.value)}
                />
            <button className="settingsSubmit" type="submit">Update</button>
            {success && <span style={{color: "green", textAlign: "center", marginTop:"20px"}}>Profile updated successfully...</span>}
          </form>
          
      </div>
      <Sidebar />
    </div>
  )
}
