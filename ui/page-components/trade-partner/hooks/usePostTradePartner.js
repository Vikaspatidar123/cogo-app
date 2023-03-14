import { Toast } from '@cogoport/components';

import { useRequestBf } from '@/packages/request';

const usePostTradePartner = ({
	isEdit, tradePartyDetails, getList, setIsEdit,
}) => {
	const { saasOrganizationId, saasUserId, saasAddressId } = tradePartyDetails || {};

	const [{ loading }, postBuyer] = useRequestBf({
		url     : '/saas/organization/buyer',
		authKey : 'post_saas_organization_buyer',
		method  : 'post',
	}, { manual: false });

	const [{ loading:updateLoading }, updateBuyer] = useRequestBf({
		url     : '/saas/organization',
		authKey : 'put_saas_organization',
		method  : 'put',
	}, { manual: false });

	const updateRest = (data) => ({
		pocEmail       : data?.email,
		pocPhoneCode   : data?.phoneNumber?.country_code,
		pocPhoneNumber : data?.phoneNumber?.number,
		address        : data?.addLine,
		countryId      : data?.country,
		...data,
	});
	const api = isEdit ? updateBuyer : postBuyer;
	const postTradePartner = async ({
		userData, profile, handleCloseModal, data,
	}) => {
		const {
			partnerOrganizationType,
			partnerOrganizationId,
			organizationId,
			organizationName,
			...rest
		} = userData || {};
		try {
			const newRest = isEdit
				? updateRest(data)
				: { saasOrganizationDetails: { ...rest } };
			const response = await api({
				data: {
					saasOrganizationId,
					saasUserId,
					saasAddressId,
					performedBy: profile.id,
					organizationId,
					partnerOrganizationId,
					partnerOrganizationType,
					organizationName,
					...newRest,
				},
			});
			if (response?.data) {
				Toast.success(isEdit ? 'Updated Sucessfully' : 'Created Sucessfully', {
					autoClose : 2000,
					style     : { color: 'black' },
				});
				setIsEdit(false);
				getList({});
				handleCloseModal(false);
			}
		} catch (error) {
			Toast.error(error?.message, { style: { color: 'white' } });
		}
	};

	return {
		postTradePartner,
		loading,
		updateLoading,
	};
};

export default usePostTradePartner;
