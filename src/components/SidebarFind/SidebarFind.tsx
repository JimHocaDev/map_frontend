import findUserIcon from "./../../assets/icons/find-user.svg";
import "./SidebarFind.scss";
import React from "react";

export const SidebarFind = () => {
  return (
    <div
      style={{ background: "#88FABB" }}
      className=" sidebar-style sidebar-find"
    >
      <div className="sidebar-find__inner-wrapper">
        <div className="sidebar-find__image-wrapper">
          <img
            className="sidebar-find__image"
            width={64}
            height={64}
            src={findUserIcon}
            alt="user logo"
          />
        </div>
        <form className="sidebar-find__form">
          <input
            placeholder="Please enter users ID"
            className="sidebar-find__input"
            type="text"
          />
          <input
            placeholder="Password"
            className="sidebar-find__input"
            type="password"
          />
          <button className="sidebar-find__btn" type="submit">
            Find
          </button>
        </form>
      </div>
    </div>
  );
};
