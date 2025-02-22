import { useRequest } from '@/packages/request';

export const useUpdateCredit = () => {
	const [{ data, loading }, trigger] = useRequest({
		method: 'post', url: '/update_credit',
	}, { manual: true, autoCancel: false });

	const updateCredit = async (values) => {
		try {
			const resp = await trigger({
				data: { ...values },
			});
			if (resp) {
				return true;
			}
			return false;
		} catch (e) {
			console.error(e);
			return false;
		}
	};
	return { updateCredit, data, loading };
};
