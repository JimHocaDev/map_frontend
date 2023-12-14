import "./SidebarItem.scss"
import React from "react";

type PropsType = {
  itemIcon: string
}

export const SidebarItem = ({itemIcon}: PropsType) => {
  return (
    <li className="sidebar-item">
          <button className="sidebar-item__btn">
            <img className="sidebar-item__img" src={itemIcon} alt="find user icon" />
          </button>
            <span className="sidebar-item__text">Find user</span>
        </li>
  )
}

