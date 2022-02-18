import axios from "axios";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom"
import { useEffect, useState } from "react/cjs/react.development";
import {Context} from "../../context/Context";
import "./singlepage.css"

export default function SInglePage() {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const publicFolder = "http://localhost:3030/images/";
    const {user} = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    
    useEffect(()=>{
      const fetchData = async ()=>{
        const {data} = await axios.get("/posts/" + path);
        setPost(data);
        setTitle(data.title);
        setDesc(data.desc);
      }
      fetchData();
    },[path]);

    const handleDelete = async ()=>{
      try{
        await axios.delete("/posts/" + path,{data: {username: user.username}} );
        window.location.replace("/");
      }
      catch(err){
        console.log(err);
      }
      
    };

    const handleUpdate =  async ()=>{
      try{
        await axios.put("/posts/" + path, {username: user.username, title, desc} );
        setUpdateMode(false);
      }
      catch(err){
        console.log(err); 
      }
    }

  return (
    <div className="singlePage">
      <div className="singlePostWrapper">
      {post.photo && (
        <img 
            className="singlePostImg"
            src={publicFolder + post.photo}
            alt=""
         />
      )}

      {updateMode? <input type={"text"} onChange={event=> setTitle(event.target.value) } value={title} className="singlePostTitleInput" autoFocus = {true} /> :
           (
        <h1 className="singlePostTitle">
             
             
            {title}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i className="singlePostIcon far fa-edit" onClick={()=>setUpdateMode(true)}></i>
                <i className="singlePostIcon far fa-trash-alt" onClick={handleDelete}></i>
            </div>
            )}
            
        </h1>
        )}
        <div className="singlePostInfo">
        
            <span className="singlePostAuthor"> Author:
               <Link to={`/?user=${post.username}`} className="link">
                  <b>{post.username}</b>
               </Link>
             </span>
        
            <span className="singlePostAuthor">{new Date(post.createdAt).toDateString()}</span>
        </div>
        {updateMode? <textarea type="text" onChange={event=>setDesc(event.target.value)} value={desc} className="singlePostDescInput"  /> : 
        (
          <p className="singlePostDesc" >{desc}</p>
        )}
        {updateMode && <button type="submit" className="singlePostButton" onClick={handleUpdate}>Update</button>}
        
      </div>
        
    </div>
  )
}
