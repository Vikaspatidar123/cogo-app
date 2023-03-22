import { useState, useEffect } from 'react';
import useRequest from '@cogo/commons/hooks/useRequest';
import { getApiErrorString } from '@cogoport/front/utils';
import { toast } from '@cogoport/front/components';
import { useScope } from '@cogo/commons/hooks';
import { useRouter } from '@cogo/next';
import useSearchQuery from '@cogo/commons/hooks/useSearchQuery';
import { STATUS_MAPPING } from '../constants';

const useGetContractList = ({ filterValue, activeFilter }) => {
	const [pagination, setPagination] = useState(1);
	const { scope } = useScope();
	const { query } = useRouter();
	const { org_id = '', branch_id = '' } = query || {};
	const { query: searchQuery, debounceQuery } = useSearchQuery();

	const { trigger, data, loading } = useRequest('get', false, scope, {
		autoCancel: false,
	})('/list_contracts');

	const {
		contract_reference_id = '',
		trade_type = '',
		source = '',
		service_type = '',
	} = filterValue || {};

	useEffect(() => {
		debounceQuery(contract_reference_id);
	}, [contract_reference_id]);

	const getContracts = async () => {
		try {
			await trigger({
				params: {
					filters: {
						trade_type: trade_type || undefined,
						source: source || undefined,
						importer_exporter_id: org_id,
						importer_exporter_branch_id: branch_id,
						service_types: service_type
							? [`${service_type}`]
							: ['fcl_freight', 'lcl_freight', 'air_freight'],
						movement_type: ['international'],
						q: !Number(contract_reference_id) ? searchQuery : undefined,
						contract_reference_id: Number(contract_reference_id)
							? searchQuery
							: undefined,
						validity_end_greater_than:
							activeFilter === 'expired' ? new Date() : undefined,
						validity_end_less_than:
							activeFilter === 'active' ? new Date() : undefined,
						status: STATUS_MAPPING[activeFilter],
					},
					contract_utilisation_data_required: true,
					services_data_required: true,
					page: pagination,
				},
			});
		} catch (error) {
			toast.error(getApiErrorString(error));
		}
	};

	useEffect(() => {
		getContracts();
	}, [pagination, service_type, source, trade_type, searchQuery, activeFilter]);

	const { list, ...pageData } = data || {};

	return {
		setPagination,
		loading,
		pageData,
		contractList: list || [],
	};
};
export default useGetContractList;
