import axios from "axios";
import { useState, useEffect } from "react"
import { Link } from "react-router-dom";

import "./sidebar.css"

export default function SideBar() {
  const [categories, setCategories] = useState([]);

  useEffect(()=>{
    const fetchCategories = async ()=>{
      const {data}=  await axios.get("/categories");
      setCategories(data);
    }
    fetchCategories();
  },[]);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img src="https://thumbs.dreamstime.com/b/young-pretty-girl-black-floral-dress-holds-vase-sunflower-flowers-young-pretty-girl-black-floral-dress-holds-174704280.jpg" alt="aboutme" />
        <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed volutpat
        vulputate purus vitae placerat.
        </p>
      </div>
      <div className="sidebarItem">
       <span className="sidebarTitle">CATEGORY</span>
       <ul className="sidebarList">
         {categories.map((category)=>(
           <Link to={`/?cat=${category.name}`} className="link">
          <li className="sidebarListItem">{category.name}</li>
          </Link>
         ))}
       </ul>
      </div>
      <div className="sidebarItem">
       <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
         <i className="sidebarIcon fab fa-facebook"></i>
         <i className="sidebarIcon fab fa-twitter"></i>
         <i className="sidebarIcon fab fa-pinterest-p"></i>
         <i className="sidebarIcon fab fa-instagram"></i>
        </div>
       </div>
    </div>
  )
}
