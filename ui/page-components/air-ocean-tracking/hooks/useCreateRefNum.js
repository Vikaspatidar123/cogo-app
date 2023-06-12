const { useRequest } = require('@/packages/request');

const useCreateRefNum = ({ shipmentId = '', refetchTrackerList, closeHandler }) => {
	const [{ loading }, trigger] = useRequest({
		method : 'post',
		url    : 'create_saas_ref',
	}, { manual: true });

	const createRefNumFn = async ({ data }) => {
		try {
			await trigger({
				data: {
					saas_container_subscription_id : shipmentId,
					reference_no                   : data.referenceNo,
				},
			});
			refetchTrackerList();
			closeHandler();
		} catch (err) {
			console.log(err);
		}
	};

	const onSubmitHandler = (data) => {
		createRefNumFn({ data });
	};
	return {
		onSubmitHandler, loading,
	};
};

export default useCreateRefNum;
