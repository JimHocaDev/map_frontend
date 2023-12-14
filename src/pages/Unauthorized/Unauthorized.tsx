import React from "react";
import "./Unauthorized.scss";
import { Link } from "react-router-dom";

export const Unauthorized: React.FC = () => {
  return (
    <div className="unauthorized-page">
      <h1>Unauthorized Access</h1>
      <p>You do not have permission to access this page.</p>
      <Link to="/sign-in">Click here to login</Link>
    </div>
  );
};
