import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SideBarItem from "./sidebar-item";
import "./styles.css";
import LogoutIcon from "../../assets/icons/logout.svg";
import { useNavigate } from "react-router-dom";

function SideBar({ menu }) {
  const location = useLocation();

  const navigate = useNavigate();

  const [active, setActive] = useState(1);

  useEffect(() => {
    menu.forEach((element) => {
      if (location.pathname === element.path) {
        setActive(element.id);
      }
    });
  }, [location.pathname]);

  const __navigate = (id) => {
    setActive(id);
  };

  const __logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <nav className="sidebar">
      <div className="sidebar-container">
        <div className="sidebar-container">
          <h1>Quản lý app phim</h1>
          <div className="sidebar-items">
            {menu.map((item, index) => (
              <div key={index} onClick={() => __navigate(item.id)}>
                <SideBarItem active={item.id === active} item={item} />
              </div>
            ))}
          </div>
          <div className="sidebar-footer" onClick={__logOut}>
            <span className="sidebar-item-label">Đăng Xuất</span>
            <img
              src={LogoutIcon}
              alt="icon-logout"
              className="sidebar-item-icon"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default SideBar;
