import { Toast } from '@cogoport/components';

import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateQuotation = ({ query }) => {
	const { organization, id: userId, name, email } = useSelector((s) => s.profile);
	const { id: quoteId } = query || {};

	const [{ loading: createLoading, data: createData }, createTrigger] = useRequestBf({
		method  : 'post',
		url     : '/saas/quote',
		authKey : 'post_saas_quote',
	}, { manual: true });

	const [{ loading: editLoading }, editTrigger] = useRequestBf({
		method  : 'put',
		url     : '/saas/quote',
		authKey : 'put_saas_quote',
	}, { manual: true });

	const [{ loading: draftLoading }, draftTrigger] = useRequestBf({
		method  : 'post',
		url     : '/saas/quote/draft',
		authKey : 'post_saas_quote_draft',
	}, { manual: true });

	const [{ loading: sendLoading, data:sendData }, sendQuoteTrigger] = useRequestBf({
		method  : 'post',
		url     : '/saas/quote/send',
		authKey : 'post_saas_quote_send',
	}, { manual: true });

	const {
		quotationId = '',
		shipmentDetailId = '',
		dealId = '',
	} = createData || {};

	const trigger = quoteId || quotationId !== '' ? editTrigger : createTrigger;

	const createPayload = ({
		data = {},
		sellerAddressDetails = {},
		activeTab,
		otherDetails = {},
		expiryDate,
		shipmentDetails,
		additionalChargesList,
		buyerAddressDetails,
	}) => {
		const { additionalCharges, incotermCharges, ...rest } = data || {};
		const {
			originPortName = '',
			originCountry = '',
			destinationPortName = '',
			destinationCountry = '',
		} = shipmentDetails || {};

		if (query?.id) {
			return {
				...rest,
				additionalChargesList: {
					additionalCharges,
					incotermCharges,
				},
				sellerDetails : sellerAddressDetails,
				transportMode : activeTab,
				exchangeRate  : otherDetails?.exchangeRate,
				userId,
			};
		}
		if (quotationId !== '') {
			return {
				...rest,
				quotationId,
				shipmentDetailId,
				dealId,
				originPortName,
				originCountry,
				destinationPortName,
				destinationCountry,
				additionalChargesList: {
					additionalCharges,
					incotermCharges,
				},
				sellerDetails : sellerAddressDetails,
				transportMode : activeTab,
				exchangeRate  : otherDetails?.exchangeRate,
				userId,
			};
		}

		return {
			expiryDate,
			shipmentDetails,
			createdBy      : userId,
			additionalChargesList,
			sellerAddressDetails,
			buyerAddressDetails,
			organizationId : organization?.id,
			...otherDetails,
		};
	};

	const postQuotation = async () => {
		const payloadData = createPayload();
		try {
			await trigger({
				data: payloadData,
			});
		} catch (err) {
			Toast.error(err?.error?.message || 'Something went wrong');
		}
	};

	const createDraftQuotation = async ({ shipmentDetail, otherDetails, expiryDate }) => {
		try {
			await draftTrigger({
				data: {
					userId,
					data: {
						expiryDate,
						shipmentDetail,
						createdBy : userId,
						updatedBy : userId,
						...otherDetails,
					},
				},
			});
		} catch (err) {
			Toast.error(err?.error?.message || 'Something went wrong');
		}
	};

	const sendQuotation = async (id = null) => {
		try {
			await sendQuoteTrigger.trigger({
				params: {
					quotationId : id,
					performedBy : userId,
					userName    : name,
					userEmail   : email,
				},
			});
		} catch (err) {
			Toast.error(err?.error?.message || 'Something went wrong');
		}
	};

	return {
		postQuotation,
		loading: createLoading || editLoading,
		createDraftQuotation,
		draftLoading,
		sendQuotation,
		sendLoading,
		sendData,
	};
};

export default useCreateQuotation;
