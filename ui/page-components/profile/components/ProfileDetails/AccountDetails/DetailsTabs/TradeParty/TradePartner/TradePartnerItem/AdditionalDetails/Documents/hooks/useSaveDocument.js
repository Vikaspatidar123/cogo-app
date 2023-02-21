import { Toast } from '@cogoport/components';
import { get, isEmpty } from '@cogoport/utils';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

/**
 * @typedef  {Object} 	[props]
 * @property {Object} 	[orgResponse]
 * @property {string} 	[tradePartyId]
 * @property {function} [getOrganizationDocuments]
 * @property {Object} 	[data]
 * @property {function}	[onCloseModal]
 */
const useSaveDocument = (props) => {
	const {
		orgResponse,
		tradePartyId,
		getOrganizationDocuments,
		data,
		onCloseModal,
	} = props;
	const {
		id: organizationId,
		organization_trade_party_id: organizationTradePartyId,
	} = orgResponse;

	const {
		general: { scope },
	} = useSelector((state) => state);

	const action = isEmpty(data) ? 'create' : 'edit';

	const apiEndpoint =		action === 'create'
		? 'create_organization_document'
		: 'update_organization_document';

	const api = useRequest('post', false, scope)(`/${apiEndpoint}`);

	const getPayload = ({ values }) => ({
		id                          : get(data, 'id'),
		organization_id             : organizationId,
		organization_trade_party_id : tradePartyId || organizationTradePartyId,
		...(values || {}),
	});

	const onSuccess = () => {
		getOrganizationDocuments();
		onCloseModal();
	};

	const onFailure = ({ error }) => {
		Toast.error(error.data);
	};

	const saveDocument = async ({ values }) => {
		try {
			const payload = getPayload({ values });

			await api.trigger({ data: payload });

			onSuccess();
		} catch (error) {
			onFailure({ error });
		}
	};

	return {
		loading: api.loading,
		saveDocument,
	};
};

export default useSaveDocument;
