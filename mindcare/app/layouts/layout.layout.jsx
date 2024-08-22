import { Container } from "@mui/material"
import { useState } from "react"
import { NavBar } from "./NavBar.layout"
import { SideBar } from "./sideBar.layout"
import Head from "next/head"

export const Layout = (props) => {
	const {
		use = false,
		children,
		navRoutes
	} = props;

	const [open, setOpen] = useState(false);

	const toggleDrawer = () => setOpen(!open);

	return (
		<>
			<Head>
				<title>{ process.env.PROJECT_NAME }</title>
			</Head>

			<main>
				{
					use &&
					<>
						<NavBar />

						<SideBar
							toggleDrawer={toggleDrawer}
							navRoutes={navRoutes}
							open={open} />

						<Container
							maxWidth={false}
							className="container-main" >
							<div className={`${open ? "content-open" : "content-close"}`} >
								{ children }
							</div>
						</Container>
					</>
				}

				{
					!use && children
				}
			</main>
		</>
	)
}