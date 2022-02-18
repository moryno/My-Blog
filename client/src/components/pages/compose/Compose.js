import "./compose.css";
import {useContext, useState} from "react";
import axios from "axios";
import {Context} from "../../../context/Context";

export default function Write() {
  const [title, setTitle] =  useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const {user} = useContext(Context)

  const handleSubmit = async (event)=>{
    event.preventDefault();
    
    const newPost = {
      username: user.username, 
      title,
      desc
    };
    if(file){
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("name", filename);
      data.append("file", file);
      newPost.photo = filename;

      try{
        await axios.post("/upload", data);
      }
      catch(err){
        console.log(err)
      }
    }
    try{
      const {data} = await axios.post("/posts", newPost);
      window.location.replace("/post/" + data._id);
    }
    catch(err){
      console.log(err);
    }
  };
  return (
    <div className="write">
    {file && (
      <img 
            className="writeImg"
            src= {URL.createObjectURL(file)} 
            alt=""
         />
    )}
      
      <form className="writeForm" onSubmit={handleSubmit}>
          <div className="writeFormGroup">
              <label htmlFor="fileInput">
              <i className="writeFormIcon fas fa-plus"></i>
              </label>
              <input
               type={"file"}
                id="fileInput"
                 style={{display: "none"}}
                 onChange={(event)=> setFile(event.target.files[0])}
                  />
              <input
               type={"text"}
                className="writeInput"
                 placeholder="Title"
                  autoFocus={true}
                  onChange={(event)=>setTitle(event.target.value)}
                   />
          </div>
          <div className="writeFormGroup">
              <textarea
               className="writeInput writeText"
                placeholder="Write your story..."
                onChange={(event)=>setDesc(event.target.value)}
                ></textarea>
          </div>
          <button className="writeSubmit" type="submit">Publish</button>
      </form>
    </div>
  )
}
