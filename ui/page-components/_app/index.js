import { Provider } from 'react-redux';

// import Layout from './Layout';

import store from '@/packages/store';
import GlobalLayout from '@/ui/components/Layout';

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<GlobalLayout layout={pageProps.layout || 'authenticated'}>
				<Component {...pageProps} />
			</GlobalLayout>
		</Provider>
	);
}

export default MyApp;
