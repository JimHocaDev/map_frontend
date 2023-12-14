import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.scss";

export const NotFound = () => {
  return (
    <div className="not-found-page">
      <h1 className="not-found-page__title">404 - Page Not Found</h1>
      <p className="not-found-page__message">
        The page you are looking for does not exist.
      </p>
      <Link to="/" className="not-found-page__link">
        Go to Home Page
      </Link>
    </div>
  );
};
