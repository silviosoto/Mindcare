export const Routes = [
	{
		name: "home",
		path: "/dashboard",
		roles: []
	},
	{
		name: "user",
		path: "/users",
		roles: ["SuperAdmin", "Admin"]
	},
	{
		name: "profile",
		path: "/profiles",
		roles: ["SuperAdmin"]
	},
	{
		name: "country",
		path: "/countries",
		roles: ["SuperAdmin", "Admin"]
	},
	{
		name: "city",
		path: "/cities",
		roles: ["SuperAdmin", "Admin"]
	},
	{
		name: "client",
		path: "/clients",
		roles: ["SuperAdmin"]
	},
	{
		name: "Lob",
		path: "/Lob",
		roles: ["SuperAdmin", "Admin"]
	},
	{
		name: "URL",
		path: "/URL",
		roles: ["SuperAdmin", "Admin"]
	},
	{
		name: "Reports",
		path: "/Reports",
		roles: ["SuperAdmin", "Admin"]
	},
	{
		name: "Block a Page Section",
		path: "/BlockPageSection",
		roles: ["SuperAdmin", "Admin"]
	},
	{
		name: "Activation Request",
		path: "/ActivationRequest",
		roles: ["SuperAdmin", "Admin"]
	},
	{
		name: "Contact Type",
		path: "/ContactType/contactType",
		roles: ["SuperAdmin", "Admin"]
	},
];