'use client';
import { useEffect, useRef, useState } from "react";
import { Routes } from "../routes";
import { usePathname  } from "next/navigation";
import { ContextProvider } from "../context/context";
import { useAppContext } from "../context/context";
import { Loading } from "../../app/components/loading.component";
import { Layout } from "../../app/layouts/layout.layout";

export const ProtectedRoutesProvider = (props) => {
	const [loading, setLoading] = useState(true);

	const {
		children
	} = props;

	const checkTimeOut = useRef(3600000);
	const loadingTimeOut = useRef(500);

	const pathname = usePathname();
	useEffect(() => {
		setTimeout(() => setLoading(false) , loadingTimeOut.current);
	}, [])

	//Context states
	const  user  = useAppContext();

	const render = (content) => {	 
		if (pathname === "/_error") return <NotFound />
		let _path = pathname;
		if (pathname.includes("[") && pathname.includes("]")) _path = pathname.slice(0, pathname.indexOf("[") - 1);
		
		const currentRoute = Routes.find(route => {
			let _routePath = route.path;
			if (route.path.includes(":")) _routePath = route.path.slice(0, route.path.indexOf(":") - 1);
			return _routePath === _path
		});

		if (currentRoute && currentRoute.authorize !== false) {
			if (!user) return <Unauthorize />;
			else if (currentRoute.roles?.length !== 0 && !currentRoute.roles?.includes(user?.role)) return <Forbidden />;
		}

		let useLayout;
		if (!currentRoute) useLayout = false;
		else useLayout = currentRoute.layout ?? true;

		let navRoutes;
		if (user) navRoutes = Routes.filter(route => route.authorize === false || route.roles.length === 0 || route.roles.includes(user.role))

			return (
				<Layout
					use={useLayout}
					navRoutes={navRoutes} >
					{ content }
				</Layout>
			)
	} 

	return loading ? <Loading /> : render(children)
}