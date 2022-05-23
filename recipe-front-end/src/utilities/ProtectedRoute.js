import React from 'react'
import {Navigate, Outlet} from 'react-router-dom'
import { store } from './global-constants';


const useAuth=(typeOfVerification)=>{
	const user = JSON.parse(localStorage.getItem("user"));
	const roles = user?.roles;

	if(typeOfVerification == "IS_USER_NOT_CONNECTED")
		if(!roles)
			return true;


	if(typeOfVerification == "IS_USER_CONNECTED")
		return roles.includes("ROLE_USER");
	else if(typeOfVerification == "IS_ADMIN_CONNECTED")
		return roles.includes("ROLE_ADMIN");
	else
		return false;

}
	

export const ProtectedRoute = (props) =>{

	let { typeOfVerification } = props;

	const auth = useAuth(typeOfVerification)

  	return auth ? <Outlet/> : <Navigate to="/"/>
}
	