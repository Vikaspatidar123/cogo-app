export { default as profileStore } from './store/profile';
export { default as searchStore } from './store/enquiry';
export { default as webflowStore } from './store/webflow';

export {
	Provider,
	connect,
	shallowEqual,
	useSelector,
	useDispatch,
	useStore,
} from 'react-redux';

export { default as createWithStore } from './store';

export * from './store/enquiry/actions';
export * from './store/webflow/actions';
// export default configureStore({
// 	reducer: reducers,
// });
