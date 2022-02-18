import React, {useState, useEffect} from "react";
import Header from "../../header/Header"
import SideBar from "../../sidebar/SideBar"
import Posts from "../../posts/Posts"
import "./home.css"
import axios from "axios";
import { useLocation } from "react-router-dom";


export default function Home() {
   const [posts, setPosts] = useState([]);
   const {search} = useLocation();
   

   
   useEffect(()=>{
     const fetchPosts = async ()=>{
       const {data} = await axios.get("/posts" + search);
       setPosts(data);
     }
     fetchPosts();
   }, [search]);
   
  return (
    <>
      <Header /> 
      <div className="home">
      <Posts posts = {posts} />
      <SideBar />
    </div>
    </>
    
  )
}
 