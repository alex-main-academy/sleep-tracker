import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import React from "react";

export default function PublicRoute({ children, restricted = false }) {
  const isAuth = useSelector((state) => state.isAuth);
  const shouldRedirect = isAuth && restricted;

  return shouldRedirect
    ? React.createElement(Navigate, { to: "/sleep" })
    : children;
}
