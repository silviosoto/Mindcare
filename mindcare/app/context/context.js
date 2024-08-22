 
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
		setUser(cookieStorage.get("user"));
 	}, [])

	const value = useMemo(() => ({
		user, setUser,
		urlApi, setUrlApi
	}), [user, urlApi]);
	 
	return (
		<ContextStore.Provider value={{user}}>
			{ children }
		</ContextStore.Provider>
	)
}

export const useAppContext = () => {
	const context = useContext(ContextStore);
	return context;
}