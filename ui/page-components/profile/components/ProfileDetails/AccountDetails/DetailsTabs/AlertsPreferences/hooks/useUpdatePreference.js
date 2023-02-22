import { Toast } from '@cogoport/components';

import { useRequest } from '@/packages/request';

const useUpdatePreference = ({ getPreferences, userId, isAllSelected }) => {
	const [{ loading }, trigger] = useRequest({
		url    : '/update_user_alert_preference',
		method : 'post',
	}, { manual: true });

	const handleStatus = (val) => (val ? 'active' : 'inactive');

	const updatePreference = async ({
		offers_discounts,
		subscriber_special,
		new_product_service_launches_and_updates,
		product_service_explainers,
		newsletter,
		general_news,
		reason,
		otherReason,
		setShowModal = () => {},
		check = undefined,
	}) => {
		const preferences = {
			offers_discounts                         : handleStatus(offers_discounts),
			subscriber_special                       : handleStatus(subscriber_special),
			new_product_service_launches_and_updates : handleStatus(
				new_product_service_launches_and_updates,
			),
			product_service_explainers : handleStatus(product_service_explainers),
			newsletter                 : handleStatus(newsletter),
			general_news               : handleStatus(general_news),
		};
		if (check === undefined || check === false) {
			if (!reason && !isAllSelected) {
				Toast.error('Please select reason');
				return;
			}
		}
		if (reason === 'others' && !otherReason && !isAllSelected) {
			Toast.error('Please enter your reason');
			return;
		}
		try {
			await trigger({
				data: {
					user_id : userId,
					preferences,
					reason  : reason === 'others' ? otherReason : reason,
				},
			});
			await getPreferences();
			Toast.success('Successfully Updated');

			setShowModal(false);
		} catch (error) {
			Toast.error('error');
		}
	};

	return {
		loading,
		updatePreference,
	};
};
export default useUpdatePreference;
