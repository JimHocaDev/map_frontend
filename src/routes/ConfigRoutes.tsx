import React from "react";
import { Route, Routes } from "react-router-dom";
import { ForgotPass } from "../pages/ForgotPass/ForgotPass";
import { Login } from "../pages/Login/Login";
import { Map } from "../pages/Map/Map";
import { NotFound } from "../pages/NotFound/NotFound";
import { Registration } from "../pages/Registration/Registration";

export const ConfigRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Map />} />
      <Route path="/sign-up" element={<Registration />} />
      <Route path="/sign-in" element={<Login />} />
      <Route path="/reset-password" element={<ForgotPass />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};
