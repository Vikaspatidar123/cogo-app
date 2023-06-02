import { useRequest } from '@/packages/request';

const useLeadUserDetails = ({ setProfileId = () => {} }) => {
	const [{ loading }, trigger] = useRequest(
		{
			url    : 'create_saas_sign_up_lead_user_profile',
			method : 'post',
		},
		{ manual: true },
	);

	const onLeadUserDetails = async ({ formValues = {}, profileId = '' }) => {
		try {
			const response = await trigger({
				data: {
					profile_id          : profileId || undefined,
					name                : formValues?.name || undefined,
					email               : formValues?.email || undefined,
					mobile_country_code : formValues?.mobile_number?.country_code || undefined,
					mobile_number       : formValues?.mobile_number?.number || undefined,
				},
			});

			const res = response.data || {};
			setProfileId(res?.profile_id);
		} catch (err) {
			console.log(err);
		}
	};

	return { onLeadUserDetails, loading };
};

export default useLeadUserDetails;
