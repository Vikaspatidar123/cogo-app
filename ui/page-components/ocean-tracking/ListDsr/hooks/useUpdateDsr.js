import { useRequest } from '@/packages/request';

const useUpdateDsr = (setDsrs) => {
	const [{ loading }, trigger] = useRequest({
		url    : 'update_saas_dsr',
		method : 'post',
	}, { manual: true });
	const updateDsr = async (dsrId, status) => {
		try {
			const requestData = {
				dsr_id: dsrId,
				status,
			};

			const res = await trigger({ data: requestData });
			const { hasError } = res || {};
			const message = res?.data?.message;
			if (hasError) throw new Error();
			if (message) throw new Error(message);

			setDsrs((dsrs) => dsrs.map((item) => {
				if (item.id === dsrId) {
					return { ...item, status: status ? 'active' : 'inactive' };
				}
				return item;
			}));
		} catch (err) {
			console.log(err);
		}
	};

	return { loading, updateDsr };
};

export default useUpdateDsr;
