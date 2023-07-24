import { useRequest } from '@/packages/request';

const getFormattedPayload = (props) => {
	const { formValues = {}, leadUserId = '', is_whatsapp_number = false } = props;
	const { name, email, mobile_number } = formValues;

	return {
		lead_user_id        : leadUserId || undefined,
		name                : name || undefined,
		email               : email || undefined,
		mobile_country_code : mobile_number?.country_code || undefined,
		mobile_number       : mobile_number?.number || undefined,
		is_whatsapp_number,
	};
};
const useLeadUserDetails = ({ setLeadUserId = () => {} }) => {
	const [{ loading }, trigger] = useRequest(
		{
			url    : '/create_saas_sign_up_lead_user',
			method : 'post',
		},
		{ manual: true },
	);

	const onLeadUserDetails = async (props) => {
		try {
			const payload = getFormattedPayload(props);

			const response = await trigger({
				data: payload,
			});

			const res = response.data || {};

			setLeadUserId(res?.id);
		} catch (err) {
			console.error(err);

			setLeadUserId('');
		}
	};

	return { onLeadUserDetails, loading };
};

export default useLeadUserDetails;
