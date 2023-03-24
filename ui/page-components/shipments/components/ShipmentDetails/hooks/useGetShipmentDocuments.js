import { useContext } from 'react';

// import { ShipmentDetailContext } from '../../commons/Context';
import useGetFiniteList from '../../../hooks/useGetFiniteList';
import { ShipmentDetailContext } from '../common/Context';

import { useRequest } from '@/packages/request';
import { useSelector } from '@/packages/store';

const useGetShipmentDocuments = () => {
	const [contextValues] = useContext(ShipmentDetailContext);
	const { id, shipment_data } = contextValues || {};
	const { scope } = useSelector(({ general }) => ({
		scope: general?.scope,
	}));
	const [{ loading: shipmentDocumentsLoading }, trigger] = useRequest({
		url    : 'list_shipment_documents',
		method : 'get',
	}, { manual: true });

	const listApi = (restFilters, currentPage) => trigger({
		params: {
			filters: {
				...(restFilters || {}),
				uploaded_by_org_id:
						scope === 'app'
							? shipment_data?.importer_exporter_id
							: restFilters?.uploaded_by_org_id || undefined,
				shipment_id  : id,
				service_type : restFilters?.service_type || undefined,
			},
			created_by_user_details_required : true,
			page                             : currentPage || 1,
			page_limit                       : 50,
		},
	});

	const {
		filters,
		page,
		list: { total, data },
		hookSetters,
		refetch,
	} = useGetFiniteList(listApi);

	return {
		shipmentFilters              : filters,
		shipmentDocuments            : data,
		shipmentDocumentsTotal       : total,
		shipmentDocumentsPage        : page,
		shipmentDocumentsLoading,
		shipmentDocumentsHookSetters : hookSetters,
		shipmentDocumentsRefetch     : refetch,
	};
};

export default useGetShipmentDocuments;
