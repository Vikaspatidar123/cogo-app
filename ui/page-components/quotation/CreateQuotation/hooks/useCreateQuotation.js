import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import createQuotePayload from '../utils/createQuotePayload';

import { useRouter } from '@/packages/next';
import { useRequestBf } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useCreateQuotation = ({ setConfirmCreateQuotation }) => {
	const { organization, id: userId, name, email } = useSelector((s) => s.profile);
	const { query } = useRouter();
	const { id: quoteId, recentSearch = false } = query || {};

	const [{ loading: createLoading, data: createData }, createTrigger] = useRequestBf({
		method  : 'post',
		url     : '/saas/quote',
		authKey : 'post_saas_quote',
	}, { manual: true });

	const [{ loading: editLoading, data: editQuoteData }, editTrigger] = useRequestBf({
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
		id: quotationId = '',
		shipmentDetailId = '',
		dealId = '',
	} = createData || {};

	const trigger = quoteId || quotationId !== '' ? editTrigger : createTrigger;

	const createPayload = ({ data, exchangeRate, orgCurrency, editData = {} }) => {
		const {
			expiryDate,
			products,
			sellerAddressDetails,
			buyerAddressDetails,
			shipmentDetails,
			additionalChargesList,
			otherDetails,
		} = createQuotePayload({ data, exchangeRate, orgCurrency });

		const {
			shipmentDetailId: editShipmentId, dealId: editDealId, buyerDetails = {},
			saasPartnerId = '',
		} = editData;
		if (query?.id) {
			return {
				...shipmentDetails,
				...otherDetails,
				additionalChargesList,
				quotationId      : quoteId,
				shipmentDetailId : editShipmentId,
				dealId           : editDealId,
				sellerDetails    : sellerAddressDetails,
				buyerDetails,
				expiryDate,
				products,
				saasPartnerId,

			};
		}
		if (quotationId !== '') {
			return {
				products,
				expiryDate,
				quotationId,
				shipmentDetailId,
				dealId,
				additionalChargesList,
				sellerDetails: sellerAddressDetails,
				userId,
				...otherDetails,
				...shipmentDetails,
			};
		}

		return {
			expiryDate,
			products,
			sellerAddressDetails,
			buyerAddressDetails,
			additionalChargesList,
			shipmentDetails,
			...otherDetails,
			createdBy      : userId,
			organizationId : organization?.id,

		};
	};

	const postQuotation = async ({ data, exchangeRate, orgCurrency, editData = {}, flag = false }) => {
		const payloadData = createPayload({ data, exchangeRate, orgCurrency, editData });

		try {
			const resp = await trigger({
				data: payloadData,
			});

			if (recentSearch && typeof window !== 'undefined') {
				localStorage.removeItem('spotSearchResult');
			}
			if (flag && resp?.data) {
				setConfirmCreateQuotation(true);
			}
			return resp?.data;
		} catch (err) {
			Toast.error(err?.error?.message || 'Something went wrong');
			return false;
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
		loading         : createLoading || editLoading,
		createQuoteData : isEmpty(createData) ? editQuoteData : createData,
		createDraftQuotation,
		draftLoading,
		sendQuotation,
		sendLoading,
		sendData,
	};
};

export default useCreateQuotation;
