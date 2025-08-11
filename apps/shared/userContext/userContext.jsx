import { createContext, useContext } from "react";
import useUser from "../useUser/useUser";
const userContext = createContext();

const UserProvider = ({ children }) => {
	const { user, setUser } = useUser();

	return (
		<userContext.Provider value={{ user, setUser }}>
			{children}
		</userContext.Provider>
	);
};

export const useUserContext = () => {
	return useContext(userContext);
};

export default UserProvider;
