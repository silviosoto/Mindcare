 'use client';
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useCookie } from "../hooks/useCookie.hook";
export const ContextStore = createContext();

export const ContextProvider = (props) => {
	const {
		children
	} = props;
	
	const [user, setUser] = useState();
	const [urlApi, setUrlApi] = useState();
	const cookieStorage = useCookie()

	useEffect(() => {
		setUser(
			{
				userid : cookieStorage.get("userid"),
				user : cookieStorage.get("username"),
				profile: cookieStorage.get("profile")
			}
		);
 	}, [])
	// console.log("ContextProvider",cookieStorage );
	const value = useMemo(() => ({
		user, setUser,
		urlApi, setUrlApi
	}), [user, urlApi]);
	
	return (
		<ContextStore.Provider value={value}>
			{ children }
		</ContextStore.Provider>
	)
}

export const useAppContext = () => {
	const context = useContext(ContextStore);
	return context;
}