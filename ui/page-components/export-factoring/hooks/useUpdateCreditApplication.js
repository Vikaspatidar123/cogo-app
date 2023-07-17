import { useRequest } from '@/packages/request';

const useUpdateCreditApplication = () => {
	const [{ data, loading }, trigger] = useRequest({
		method: 'post', url: '/update_credit_application',
	}, { manual: true, autoCancel: false });

	const updateCreditApplication = async (values) => {
		try {
			const response = await trigger({
				data: {
					...values,
				},
			});
			if (response) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	};

	return { updateCreditApplication, data, loading };
};

export default useUpdateCreditApplication;
