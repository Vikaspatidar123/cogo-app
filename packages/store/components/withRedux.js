import { shape } from 'prop-types';
import React from 'react';

const isServer = typeof window === 'undefined';

const withRedux = (initializeStore, config) => {
	const { storeKey = '__NEXT_REDUX_STORE__' } = config;

	const getOrCreateStore = (initialState) => {
		if (isServer) {
			return initializeStore(initialState);
		}

		if (!window[storeKey]) {
			window[storeKey] = initializeStore(initialState);
		}
		return window[storeKey];
	};

	return (App) => {
		class AppWithRedux extends React.Component {
			static async getInitialProps(appContext) {
				const store = getOrCreateStore();

				appContext.ctx.store = store;

				let appProps = {};
				if (typeof App.getInitialProps === 'function') {
					appProps = await App.getInitialProps(appContext);
				}

				return { ...appProps, initialStore: store.getState() };
			}

			constructor(props) {
				super(props);
				this.store = getOrCreateStore(props.initialStore);
			}

			render() {
				return <App {...this.props} store={this.store} />;
			}
		}

		AppWithRedux.propTypes = {
			initialStore: shape({}).isRequired,
		};

		return AppWithRedux;
	};
};

export default withRedux;
