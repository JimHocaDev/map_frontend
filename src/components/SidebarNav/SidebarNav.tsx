import { SidebarItem } from "../SidebarItem/SidebarItem";
import cafeIcon from "./../../assets/icons/cafe.svg";
import dotsIcon from "./../../assets/icons/dots.svg";
import findUserIcon from "./../../assets/icons/find-user.svg";
import hospitalIcon from "./../../assets/icons/hospital.svg";
import signIcon from "./../../assets/icons/sign.svg";
import React from "react";
import "./SidebarNav.scss";

export const SidebarNav = () => {
  return (
    <div className="sidebar-nav sidebar-style">
      <div className="sidebar-nav__inner-wrapper">
        <input
          placeholder="Search"
          className="sidebar-nav__search-input"
          type="text"
        />
        <ul className="sidebar-nav__btn-list">
          <SidebarItem itemIcon={findUserIcon} />
          <SidebarItem itemIcon={signIcon} />
          <SidebarItem itemIcon={cafeIcon} />
          <SidebarItem itemIcon={hospitalIcon} />
          <SidebarItem itemIcon={findUserIcon} />
          <SidebarItem itemIcon={signIcon} />
          <SidebarItem itemIcon={cafeIcon} />
          <SidebarItem itemIcon={dotsIcon} />
        </ul>
      </div>
    </div>
  );
};
