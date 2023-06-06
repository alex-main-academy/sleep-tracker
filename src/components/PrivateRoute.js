import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import React from "react";

export default function PrivateRoute({ children }) {
  const isAuth = useSelector((state) => state.isAuth);

  return isAuth ? children : React.createElement(Navigate, { to: "/" });
}
