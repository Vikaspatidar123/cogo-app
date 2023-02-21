import { getByKey } from '@cogoport/utils';
import { useEffect, useState } from 'react';

import getConfig from '../config';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

let isInit = false;

/**
 * @typedef  {Object} 	[props]
 * @property {Object} 	[orgResponse]
 * @property {Object} 	[tradePartyType]
 * @property {Object} 	[tradePartyData]
 * @property {string} 	[documentType]
 */
const useGetDocuments = (props) => {
	const { orgResponse, tradePartyData, documentType } = props;
	const { id: organizationId } = orgResponse;

	const {
		general: { scope = '' },
	} = useSelector((state) => state);

	const [pagination, setPagination] = useState({
		page       : 1,
		page_limit : 10,
	});

	const config = getConfig();

	const apiEndpoint = getByKey(config, `[${documentType}].api.endpoint`);
	const documentTypeFilter = getByKey(
		config,
		`[${documentType}].api.filters.documentType`,
	);

	const params = {
		...pagination,
		filters: {
			organization_id             : organizationId,
			document_type               : documentTypeFilter,
			organization_trade_party_id : (tradePartyData || {}).id,
		},
	};

	// const api = useRequest('get', true, scope)(`/${apiEndpoint}`, { params });
	const [{ loading, data }, trigger] = useRequest({
		url    : `/${apiEndpoint}`,
		method : 'get',
	}, { manual: true });

	const getOrganizationDocuments = () => {
		trigger({ params });
	};

	useEffect(() => {
		if (isInit) {
			getOrganizationDocuments();
		}

		isInit = true;
	}, [pagination.page]);

	return {
		loading,
		data: data || {},
		getOrganizationDocuments,
		pagination,
		setPagination,
	};
};

export default useGetDocuments;
