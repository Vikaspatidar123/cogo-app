import { useState, useRef } from 'react';

import StakeholderOptions from '../../../utils/stakeholdersOptions';

import useGetServiceProviders from './useGetserviceProviders';

import { useSelector } from '@/packages/store';
import getGeoConstants from '@/ui/commons/constants/geo';

const geo = getGeoConstants();

const showAllRoles = [geo.uuid.super_admin_id, geo.uuid.admin_id];

const useGetPocData = ({ tradeParties, shipment_data, scope, shipment_id }) => {
	const { partner } = useSelector(({ profile }) => ({
		partner: profile?.partner,
	}));

	const [utilities, setUtilities] = useState({
		roleCheck       : '',
		businessName    : '',
		servProvId      : '',
		addPocModal     : false,
		addCompanyModal : false,
		trade_party_id  : '',
	});

	let showAll = false;
	(partner?.user_role_ids || []).forEach((id) => {
		if (showAllRoles?.includes(id)) {
			showAll = true;
		}
	});

	let isOkam = false;
	(shipment_data?.stakeholder_types || []).forEach((item) => {
		if (item === 'booking_agent') {
			isOkam = true;
		}
	});
	if (scope === 'app') {
		isOkam = true;
	}

	const formRef = useRef(null);

	const onClose = () => {
		setUtilities({
			roleCheck       : '',
			businessName    : '',
			servProvId      : '',
			addPocModal     : false,
			addCompanyModal : false,
			trade_party_id  : '',
		});
	};

	const {
		filterCPServices,
		service_prov_ids,
		service_providers,
		not_added_service_providers,
		listServiceRefetch,
		serviceListLoading,
		services,
	} = useGetServiceProviders({ utilities, shipment_id });

	const { superadmin, stakeholders } = StakeholderOptions(isOkam);

	const stakeholder_types = superadmin;

	const so_view_stakeholders = (services || []).map((item) => {
		if (
			(item?.service_type === 'air_customs_service'
				|| item?.service_type === 'fcl_customs_service'
				|| item?.service_type === 'lcl_customs_service')
			&& item?.trade_type === 'export'
		) {
			return stakeholders.origin_cha;
		}

		if (
			(item?.service_type === 'air_customs_service'
				|| item?.service_type === 'fcl_customs_service'
				|| item?.service_type === 'lcl_customs_service')
			&& item?.trade_type === 'import'
		) {
			return stakeholders.destination_cha;
		}

		if (
			item?.service_type === 'ftl_freight_service'
			&& item?.trade_type === 'export'
		) {
			return stakeholders.origin_transporter;
		}

		if (
			item?.service_type === 'ftl_freight_service'
			&& item?.trade_type === 'import'
		) {
			return stakeholders.destination_transporter;
		}

		return null;
	});

	const clean_so_view_stakeholders = (so_view_stakeholders || []).filter(
		(item) => item,
	);

	const okam_check_arr = (clean_so_view_stakeholders || []).map((item) => item?.value);

	const okam_stakeholders = (stakeholder_types || []).filter((item) => {
		if (!okam_check_arr?.includes(item?.value)) {
			return item;
		}

		return null;
	});

	const view_final_stakeholders = isOkam
		? okam_stakeholders
		: [
			...clean_so_view_stakeholders,
			{ label: 'Collection Party', value: 'collection_party' },
		  ];

	const not_added_final_stakeholders = showAll
		? superadmin
		: view_final_stakeholders;

	let final_stakeholders = [];
	let arr1 = [];
	if (tradeParties.length === 0) {
		final_stakeholders = not_added_final_stakeholders;
	} else {
		arr1 = (tradeParties || []).map((item) => item?.trade_party_type);

		final_stakeholders = not_added_final_stakeholders.filter((party) => {
			if (party?.value === 'collection_party') {
				return { label: 'Collection Party', value: 'collection_party' };
			}

			if (arr1.includes('self') && party?.value === 'booking_party') {
				return null;
			}
			if (!arr1.includes(party?.value)) {
				return party;
			}

			return null;
		});
	}

	return {
		showAll,
		isOkam,
		final_stakeholders,
		formRef,
		onClose,
		setUtilities,
		utilities,
		filterCPServices,
		service_prov_ids,
		service_providers,
		not_added_service_providers,
		listServiceRefetch,
		serviceListLoading,
		not_added_final_stakeholders,
	};
};

export default useGetPocData;
