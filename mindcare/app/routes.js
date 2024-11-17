export const Routes = [
	{
		name: "Home",
		path: "/dashboard",
		roles: []
	},
	{
		name: "Perfil",
		path: "/profile",
		roles: ["SuperAdmin", "Admin", "Psicologo"]
	},
	{
		name: "Agenda",
		path: "/agenda",
		roles: ["SuperAdmin", "Admin", "Psicologo"]
	},
	{
		name: "Servicios",
		path: "/psychologyServices",
		roles: ["SuperAdmin", "Admin", "Psicologo"]
	},
	{
		name: "Reportes",
		path: "/reportes",
		roles: ["SuperAdmin", "Admin", "Psicologo"]
	},
];