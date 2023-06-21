import { useState, useEffect, useCallback } from 'react';

import { STATUS_MAPPING } from '../constants';

import { useDebounceQuery } from '@/packages/forms';
import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';

const useGetContractList = ({ filterValue, activeFilter }) => {
	const [pagination, setPagination] = useState(1);
	const { query } = useRouter();
	const { org_id = '', branch_id = '' } = query || {};
	const { query: searchQuery, debounceQuery } = useDebounceQuery();

	const [{ loading, data }, trigger] = useRequest({
		url    : '/list_contracts',
		method : 'get',
	}, { manual: true });

	const {
		contract_reference_id = '',
		trade_type = '',
		source = '',
		service_type = '',
	} = filterValue || {};

	useEffect(() => {
		debounceQuery(contract_reference_id);
	}, [contract_reference_id, debounceQuery]);

	const getContracts = useCallback(async () => {
		try {
			await trigger({
				params: {
					filters: {
						trade_type                  : trade_type || undefined,
						source                      : source || undefined,
						importer_exporter_id        : org_id,
						importer_exporter_branch_id : branch_id,
						service_types               : service_type
							? [`${service_type}`]
							: ['fcl_freight', 'lcl_freight', 'air_freight'],
						movement_type         : ['international'],
						q                     : !Number(contract_reference_id) ? searchQuery : undefined,
						contract_reference_id : Number(contract_reference_id)
							? searchQuery
							: undefined,
						validity_end_greater_than:
							activeFilter === 'expired' ? new Date() : undefined,
						validity_end_less_than:
							activeFilter === 'active' ? new Date() : undefined,
						status: STATUS_MAPPING[activeFilter],
					},
					contract_utilisation_data_required : true,
					services_data_required             : true,
					page                               : pagination,
				},
			});
		} catch (error) {
			console.error(error);
		}
	}, [activeFilter, branch_id, contract_reference_id,
		org_id, pagination, searchQuery, service_type, source, trade_type, trigger]);

	useEffect(() => {
		getContracts();
	}, [pagination, service_type, source, trade_type, searchQuery, activeFilter, getContracts]);

	const { list, ...pageData } = data || {};

	return {
		setPagination,
		loading,
		pageData,
		contractList: list || [],
	};
};
export default useGetContractList;
