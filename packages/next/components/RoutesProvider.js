import { createContext } from 'react';

export const RoutesContext = createContext({});

function RoutesProvider({ config, children }) {
	return (
		<RoutesContext.Provider value={config}>{children}</RoutesContext.Provider>
	);
}

export default RoutesProvider;
