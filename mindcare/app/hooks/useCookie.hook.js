// import { isJson } from "@/helpers/isJson.helper";
// import crypto from "@/helpers/crypto.helper";
import Cookies from "js-cookie";

export const useCookie = () => {
	const set = (name, value, expireDays = 1) => {
		if (value === null || value === undefined) return;
		Cookies.remove(name);
		if (typeof value !== "string") value = JSON.stringify(value);
		Cookies.set(name, value, { expires: expireDays, path: "/", SameSite: "strinct" });
		// Cookies.set(name, crypto.encript(value), { expires: expireDays, path: "/", SameSite: "strinct" });
	}

	const get = name => {
		if (Cookies.get(name)) {
			// const value = crypto.decript(Cookies.get(name))
			// if (isJson(value)) return JSON.parse(value);
			console.log(name)
			return Cookies.get(name);
		}

		return null;
	}

	const remove = name => Cookies.remove(name);

	return {
		set,
		get,
		remove
	}
}