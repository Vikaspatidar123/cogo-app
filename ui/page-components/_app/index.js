import { Provider } from 'react-redux';

import Layout from './Layout';

import store from '@/packages/store';

function MyApp({ Component, pageProps }) {
	return (
		<Provider store={store}>
			<Layout>
				<Component {...pageProps} />
			</Layout>
		</Provider>
	);
}

export default MyApp;
