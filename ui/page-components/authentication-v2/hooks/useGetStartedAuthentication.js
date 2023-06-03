import { useRequest } from '@/packages/request';

const useGetStartedAuthentication = ({ setMode = () => {} }) => {
	const [{ loading: getStartedLoading }, trigger] = useRequest({
		url    : 'create_saas_sign_up_lead_user',
		method : 'post',
	}, { manual: true });

	const onGetStartedApi = (val, e) => {
		e.preventDefault();
		setMode('loading_prompts');
		// try {
		// const payload = {
		// ...val,
		// };
		// const res = await trigger({
		// 	data: {
		// 		...payload,
		// 	},
		// });

		// if (res?.status === 200) {
		// 	const { data } = res || {};
		// 	setMode('otp_form');
		// 	setUserDetails((prev) => ({
		// 		...prev,
		// 		...data,
		// 	}));
		// }

		// } catch (err) {
		// if (err?.response?.data?.email?.length > 0) {
		// 	Toast.error('Email id is already registered. Please Login');
		// } else {
		// 	Toast.error('Something went wrong');
		// }
		// }
	};

	return {
		onGetStartedApi,
		getStartedLoading,
	};
};

export default useGetStartedAuthentication;
