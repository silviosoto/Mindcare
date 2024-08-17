import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";

export const ProtectedRoutesProvider = (props) => {
    const [loading, setLoading] = useState(true);

	const checkTimeOut = useRef(3600000);
	const loadingTimeOut = useRef(500);

	// desctructuring props
	const {
		children
	} = props;
	
	//Handle route
	const {
		pathname
	} = useRouter();

	//Context states
	const {
		user
	} = useAppContext();

	const {
		checkSession
	} = useAuthentication();

	const validateSession = () => {
		user && checkSession();
	}

	useEffect(() => {
		const id = setInterval(() => validateSession() , checkTimeOut.current);

		return () => clearInterval(id);
	});

	useEffect(() => {
		setTimeout(() => setLoading(false) , loadingTimeOut.current);
	}, [])

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