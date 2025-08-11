import { useState, useEffect } from "react";
import { refresh } from "./auth";
const useUser = () => {
	const [user, setUser] = useState();
	useEffect(() => {
		(async () => {
			try {
				let res = await fetch("http://localhost:3000/users/me", {
					method: "GET",
					credentials: "include",
				});

				if (res.status === 401) {
					const refreshResult = await refresh();
					if (refreshResult.status === 401) {
						console.log("ERROR INVALID REFRESH TOKEN");
						setUser();
						return;
					}

					res = await fetch("http://localhost:3000/users/me", {
						method: "GET",
						credentials: "include",
					});
				}

				if (res.status === 200) {
					setUser(await res.json());
				} else {
					setUser();
				}
			} catch (error) {
				console.error(error);

				setUser();
			}
		})();
	}, []);
	return { user, setUser };
};

export default useUser;
