import React from "react";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line no-unused-vars
import { UserAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => { 
	const {user} = UserAuth()

   // eslint-disable-next-line no-undef
	if (!user) {
		return <Navigate to="/" />;
	} else {
		return children;
	}
};

export default ProtectedRoute;
