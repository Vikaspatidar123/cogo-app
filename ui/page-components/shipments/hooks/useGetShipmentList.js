import { useState } from 'react';

import getShipmentList from '../apis/useShipmentList';
import getConfigsShipper from '../configurations/ShipmentList/Shipper/get-config';

import useGetFiniteList from './useGetFiniteList';

import { useSelector } from '@/packages/store';

const useGetShipmentList = (allParams = { isBookingDesk: false }) => {
	const { isBookingDesk, ...params } = allParams || {};
	const { branch_id } = useSelector(({ general }) => ({
		branch_id : general?.query?.branch_id,
		scope     : general?.scope,
	}));
	const [currentTab, setCurrentTab] = useState('ongoing');

	const { getshipment } = getShipmentList();

	const config =	 getConfigsShipper();
	const configFunc = getConfigsShipper;

	const shipperApiFunc = (restFilters, currentPage) => getshipment(
		{
			...restFilters,
			state: isBookingDesk
				? 'confirmed_by_service_provider'
				: restFilters?.state,
			outSideServiceFilters: {
				pending_task: isBookingDesk
					? 'upload_booking_note'
					: restFilters?.task,
				pending_task_status         : isBookingDesk ? 'pending' : undefined,
				importer_exporter_branch_id : branch_id,
			},
			global_state: config.list_states[currentTab],
		},
		{ page: currentPage, ...params },
	);

	const {
		loading,
		page,
		filters,
		list: { data, total, total_page },
		hookSetters,
	} = useGetFiniteList(shipperApiFunc, { params });
	const service_or_shipment = filters?.shipment_type;

	const restFilterControls = service_or_shipment
		? configFunc(service_or_shipment)?.filter_controls || []
		: [];

	const defaultControls = (configFunc(null)?.filter_controls || [])?.map(
		(control) => {
			if (control.name === 'shipment_type' && isBookingDesk) {
				return {
					...control,
					options: control?.options
						?.filter((option) => ['fcl_freight', 'lcl_freight'].includes(option.value)),
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
