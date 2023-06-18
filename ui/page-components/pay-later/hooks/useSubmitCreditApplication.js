import { useRequest } from '@/packages/request';

const useSubmitCreditApplication = ({ getCreditRequestResponse = {}, refetch = () => { } }) => {
	const [{ loading, data }, trigger] = useRequest({
		method: 'post',
		url: '/submit_credit_application_for_agreement_flow',
	}, { manual: true, autoCancel: false });

	const submitCreditApplication = async () => {
		try {
			await trigger({
				data: {
					credit_request_id: getCreditRequestResponse?.id,
				},
			});
			refetch();
		} catch (e) {
			console.log(e);
		}
	};

	return { submitCreditApplication, loading, data };
};

export default useSubmitCreditApplication;
