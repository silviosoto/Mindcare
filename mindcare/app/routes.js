export const Routes = [
	{
		name: "home",
		path: "/dashboard",
		roles: []
	},
	{
		name: "user",
		path: "/users",
		roles: ["SuperAdmin", "Admin", "Psicologo"]
	},
	{
		name: "profile",
		path: "/profile",
		roles: ["SuperAdmin", "Admin", "Psicologo"]
	}
];