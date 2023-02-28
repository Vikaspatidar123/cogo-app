export { default as profileStore } from './store/profile';

export {
	Provider,
	connect,
	shallowEqual,
	useSelector,
	useDispatch,
	useStore,
} from 'react-redux';

export { default as createWithStore } from './store';

// export default configureStore({
// 	reducer: reducers,
// });
