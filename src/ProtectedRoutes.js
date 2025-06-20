import React from "react";

import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
	// TODO: Use authentication token
	const sessionStorageToken = sessionStorage.getItem("auth");

	return sessionStorageToken ? 
	<Outlet />   
 : <Navigate to="/login"  replace />;
};

export default ProtectedRoutes;