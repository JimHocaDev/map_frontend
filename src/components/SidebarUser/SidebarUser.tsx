import "./SidebarUser.scss"
import profileImg from "./../../assets/images/image1.jpg"
import eyeNot from "../../assets/icons/eye-not.svg"
import phoneIcon from "../../assets/icons/phone.svg"
import circleIcon from "../../assets/icons/circle.svg"
import React from "react";

export const SidebarUser = () => {
  return (
    <div style={{background: "#88fabb"}}  className="sidebar-user sidebar-style">
        <div className="sidebar-user__inner-wrapper">
            <img width={121} height={121} className="sidebar-user__profile-img" src={profileImg} alt="profile image" />
            <div className="sidebar-user__profile-info-wrapper">
            <p className="sidebar-user__profile-name">David Smith</p><span className="sidebar-user__profile-age">22 y.o.</span>
            </div>
            <div className="">
            <ul className="sidebar-user__profile-list">
              <li className="custom-flex sidebar-user__profile-item">
                <img width={15} height={15} src={eyeNot} alt="not visible" />
                <span className="sidebar-user__profile-visability-text">not have the ability to see </span>
              </li>
              <li className="sidebar-user__profile-item">
                <img width={15} height={15}  src={phoneIcon} alt="phone number" />
                <span className="sidebar-user__profile-item-text">+81 3679 7839 </span>
              </li>
              <li className="sidebar-user__profile-item">
               <img width={15} height={15} src={circleIcon} >
               </img>
               <span className="sidebar-user__profile-span-1">
               on the Station Road
               </span>
               <span className="sidebar-user__profile-span-1 sidebar-user__profile-span-2">
               10 km from there 
               </span>
               <span className="sidebar-user__profile-span-1 sidebar-user__profile-span-3">
               13:54 pm
               </span>
              </li>
            </ul>
            </div>
          
        
        </div>
      </div>
  )
}
