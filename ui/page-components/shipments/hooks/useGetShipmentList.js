// import useGetFiniteList from '@cogo/commons/hooks/useGetFiniteList';
// import { useSelector } from '@cogo/store';
// import { useState } from 'react';

// import getShipmentList from '../apis/get-shipment-list';
// import getListShipmentServices from '../apis/get-shipment-list-services';
import { list } from 'postcss';
import { useState } from 'react';

import getShipmentList from '../apis/useShipmentList';
import getListShipmentServices from '../apis/useShipmentlistServices';
import getConfigsShipper from '../configurations/ShipmentList/Shipper/get-config';
import getConfigsSupplier from '../configurations/ShipmentList/Supplier/get-configs';

import useGetFiniteList from './useGetFiniteList';

import { useSelector } from '@/packages/store';

const useGetShipmentList = (viewAs = 'importer_exporter', allParams = { isBookingDesk: false }) => {
	const { isBookingDesk, ...params } = allParams || {};
	const { branch_id, scope } = useSelector(({ general }) => ({
		branch_id : general?.query?.branch_id,
		scope     : general?.scope,
	}));

	const [currentTab, setCurrentTab] = useState('ongoing');

	const config =		viewAs === 'importer_exporter' ? getConfigsShipper() : getConfigsSupplier();
	const configFunc =		viewAs === 'importer_exporter' ? getConfigsShipper : getConfigsSupplier;

	const shipperApiFunc = (restFilters, currentPage) => getShipmentList(
		{
			...restFilters,
			state: isBookingDesk
				? 'confirmed_by_service_provider'
				: restFilters?.state,
			outSideServiceFilters: {
				pending_task: isBookingDesk
					? 'upload_booking_note'
					: restFilters?.task,
				pending_task_status: isBookingDesk ? 'pending' : undefined,
				importer_exporter_branch_id:
						scope === 'app' && viewAs === 'importer_exporter'
							? branch_id
							: undefined,
			},
			global_state: config.list_states[currentTab],
		},
		{ page: currentPage, ...params },
	);
	// const { getshipment } = useListShipmentServices(
	// 	{
	// 		...restFilters,
	// 		global_state: config.list_states[currentTab],
	// 	},
	// 	{ page: currentPage, ...params },
	// );
	const supplierApiFunc = (restFilters, currentPage) => getListShipmentServices(
		{
			...restFilters,
			global_state: config.list_states[currentTab],
		},
		{ page: currentPage, ...params },
	);
	const listApiFunc =		viewAs === 'importer_exporter' ? shipperApiFunc : supplierApiFunc;

	console.log(listApiFunc, 'listApiFunc');

	const {
		loading,
		page,
		filters,
		list: { data, total, total_page },
		hookSetters,
	} = useGetFiniteList(listApiFunc, { params });
	console.log(list, 'data');

	const service_or_shipment =		viewAs === 'importer_exporter'
		? filters?.shipment_type
		: filters?.service_type;

	const restFilterControls = service_or_shipment
		? configFunc(service_or_shipment)?.filter_controls || []
		: [];

	const defaultControls = (configFunc(null)?.filter_controls || []).map(
		(control) => {
			if (control.name === 'shipment_type' && isBookingDesk) {
				return {
					...control,
					options: control?.options?.filter((option) => ['fcl_freight', 'lcl_freight'].includes(option.value)),
				};
			}
			return control;
		},
	);

	return {
		loading,
		page,
		filters,
		list   : { data, total, total_page },
		hookSetters,
		setCurrentTab,
		currentTab,
		config : {
			...config,
			filter_controls: [...defaultControls, ...restFilterControls],
		},
	};
};

export default useGetShipmentList;
