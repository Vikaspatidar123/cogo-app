import { useRequest } from '@/packages/request';

const useLeadUserDetails = () => {
	const [{ loading }, trigger] = useRequest(
		{
			url    : 'create_saas_sign_up_lead_user',
			method : 'post',
		},
		{ manual: true },
	);

	const onLeadUserDetails = async ({ formValues = {} }) => {
		console.log('Lead Details:: ', formValues);
		// try {
		// 	const {
		// 		profile_id = '',
		// 		name = '',
		// 		email = '',
		// 		mobile_country_code = '',
		// 		mobile_number = '',
		// 	} = leadDetails || {};

		// 	const response = await trigger({
		// 		data: {
		// 			profile_id          : profile_id || undefined,
		// 			name                : name || undefined,
		// 			email               : email || undefined,
		// 			mobile_country_code : mobile_country_code || undefined,
		// 			mobile_number       : mobile_number || undefined,
		// 		},
		// 	});

		// 	const res = response.data || {};
		// 	setLeadDetails((prevData) => ({
		// 		...prevData,
		// 		profile_id: res?.profile_id,
		// 	}));
		// } catch (err) {
		// 	console.log(err);
		// }
	};

	return { onLeadUserDetails, loading };
};

export default useLeadUserDetails;
