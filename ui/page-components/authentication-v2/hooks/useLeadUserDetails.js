import { useRequest } from '@/packages/request';

const useLeadUserDetails = ({ setLeadUserId = () => {} }) => {
	const [{ loading }, trigger] = useRequest(
		{
			url    : 'create_saas_sign_up_lead_user',
			method : 'post',
		},
		{ manual: true },
	);

	const onLeadUserDetails = async ({ formValues = {}, leadUserId = '' }) => {
		try {
			const response = await trigger({
				data: {
					lead_user_id        : leadUserId || undefined,
					name                : formValues?.name || undefined,
					email               : formValues?.email || undefined,
					mobile_country_code : formValues?.mobile_number?.country_code || undefined,
					mobile_number       : formValues?.mobile_number?.number || undefined,
				},
			});

			const res = response.data || {};
			setLeadUserId(res?.id);
		} catch (err) {
			console.log(err);
		}
	};

	return { onLeadUserDetails, loading };
};

export default useLeadUserDetails;
