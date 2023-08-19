import { createContext, useContext, useEffect, useState } from 'react';

import getUserLocationContent from './getUserLocationContent';

const UserLocationContentContext = createContext();

function UserLocationContentContextProvider({ children }) {
	const [content, setContent] = useState({});

	useEffect(() => {
		(async () => {
			const value = await getUserLocationContent();
			setContent(value);
		})();
	}, []);

	// eslint-disable-next-line react/jsx-no-constructed-context-values
	return <UserLocationContentContext.Provider value={{ ...content }}>{children}</UserLocationContentContext.Provider>;
}

const useGetUserLocationContent = () => {
	const content = useContext(UserLocationContentContext);

	return content;
};

export { UserLocationContentContextProvider, useGetUserLocationContent };
