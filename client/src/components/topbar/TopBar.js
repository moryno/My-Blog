import { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";
import "./topbar.css"

export default function TopBar() {
  const { user, dispatch } = useContext(Context);
  const publicFolder = "http://localhost:3030/images/";

  const handleLogOut = ()=>{
    dispatch({type: "LOGOUT"});
    window.location.replace("/login");
  }

  return (
    <div className="top">
      <div className="topLeft">
         <i className="topIcon fab fa-facebook"></i>
         <i className="topIcon fab fa-twitter"></i>
         <i className="topIcon fab fa-pinterest-p"></i>
         <i className="topIcon fab fa-instagram"></i>
      </div>
      <div className="topCenter">
          <ul className="topList">
              <li className="topListItem">
                <Link className="link" to={"/"}>HOME</Link>
              </li>
              <li className="topListItem">
                <Link className="link" to={"/about"}>ABOUT</Link>
              </li>
              <li className="topListItem">
                <Link className="link" to={"/contact"}>CONTACT</Link>
              </li>
              <li className="topListItem">
                <Link className="link" to={"/compose"}>COMPOSE</Link>
              </li>
              <li className="topListItem" onClick={handleLogOut}>{user && "LOGOUT"}</li>

          </ul>
      </div>
      <div className="topRight">
        {user? (
          <Link to={"/settings"}>
          <img 
            className="topImg"
            src={publicFolder + user.profilePic}
            alt="profilePic"
            />
          </Link>
        ):
        (
          <ul className="topList">
             <li className="topListItem">
               <Link className="link" to={"/login"}>LOGIN</Link> 
             </li>
            <li className="topListItem">
              <Link className="link" to={"/register"}>REGISTER</Link> 
            </li>
            
          </ul>
        )
        }
        <i className="topSearchIcon fas fa-search"></i>
      </div>
    </div>
  )
}
