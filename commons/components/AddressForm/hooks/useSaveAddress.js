import useRequest from '@/utils/request/useRequest';
import { useSelector } from '@cogoport/front/store';
import { isEmpty } from '@cogoport/front/utils';
import config from '../configurations/config.json';
import getChangedObjectValues from '../utils/getChangedObjectValues';
import getValue from '../utils/getValue';

const createPreviousSavedPayload = ({ data, showSavedPOC }) => {
	if (isEmpty(data)) {
		return {};
	}

	let pocDetails = [];
	if (showSavedPOC) {
		pocDetails = getValue(data, 'organization_pocs', []).map((poc) => {
			return {
				name: getValue(poc, 'name'),
				email: getValue(poc, 'email'),
				mobile_country_code: getValue(poc, 'mobile_country_code'),
				mobile_number: getValue(poc, 'mobile_number'),
				alternate_mobile_country_code: getValue(
					poc,
					'alternate_mobile_country_code',
				),
				alternate_mobile_number: getValue(poc, 'alternate_mobile_number'),
			};
		});
	}

	return {
		...data,
		poc_details: pocDetails,
	};
};

/**
 * @typedef  {Object} 		[props]
 * @property {string} 		[organizationId]
 * @property {string} 		[tradePartyId]
 * @property {Object} 		[addressData]
 * @property {string} 		[addressType]
 * @property {string} 		[action]
 * @property {function} 	[onSuccess]
 * @property {function}		[onFailure]
 * @property {boolean}		[showSavedPOC]
 */
const useSaveAddress = (props) => {
	const {
		organizationId,
		tradePartyId,
		addressData,
		addressType,
		action,
		onSuccess: onSuccessCallback,
		onFailure: onFailureCallback,
		showSavedPOC,
	} = props;

	const {
		general: { scope = '' },
	} = useSelector((state) => state);

	const { apiEndpoints } = config[addressType] || {};
	const apiEndpoint = apiEndpoints[action];
	const api = useRequest('post', false, scope)(`/${apiEndpoint}`);

	const getPayload = ({ values }) => {
		const {
			organization_trade_party_id: valuesTradePartyId,
			isAddressRegisteredUnderGst,
			poc_details: valuesPocDetails,
			...valuesAddress
		} = values;

		const previousSavedPayload = createPreviousSavedPayload({
			data: addressData,
			showSavedPOC,
		});

		const newPayload = getChangedObjectValues({
			values: {
				...valuesAddress,
				organization_pocs: valuesPocDetails,
			},
			previousValues: previousSavedPayload,
		});

		const { organization_pocs: pocDetailsPayload, ...addressPayload } =
			newPayload;

		const id = getValue(addressData, 'id');

		let obj = {};
		if (!id) {
			obj = {
				organization_id: organizationId,
				organization_trade_party_id: valuesTradePartyId || tradePartyId,
			};
		}

		return {
			id,
			...obj,
			...addressPayload,
			poc_details: isEmpty(pocDetailsPayload) ? [] : pocDetailsPayload,
		};
	};

	const saveAddress = async ({ values }) => {
		try {
			const payload = getPayload({ values });

			const response = await api.trigger({ data: payload });

			onSuccessCallback({ response: response.data });
		} catch (error) {
			onFailureCallback({ error });
		}
	};

	return {
		loading: api.loading,
		saveAddress,
	};
};

export default useSaveAddress;
