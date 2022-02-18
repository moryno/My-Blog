import SideBar from "../../sidebar/SideBar";
import SinglePage from "../../singlePage/SinglePage";
import "./single.css";

export default function Single() {
  return (
    <div className="single">
      <SinglePage />
      <SideBar />
    </div>
  )
}
