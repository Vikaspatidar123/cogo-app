import { startCase } from '@cogoport/utils';
import { useState } from 'react';

import filter_controls from '../Details/Customer/components/Tabs/IEPocAndSop/Poc/PocFilters/filter-control';

import { useForm } from '@/packages/forms';

const usePocFilters = ({
	setShowFilters = () => {},
	isOkam,
	showAll,
	tradeParties,
	tradePartiesHookSetters,
	not_added_final_stakeholders,
}) => {
	const [errors, setErrors] = useState({});

	const service_provider_arr = (not_added_final_stakeholders || []).map(
		(item) => {
			if (item?.value !== 'collection_party') {
				return item?.value;
			}
			return null;
		},
	);

	const filter_cp = (tradeParties || []).filter((item) => {
		if (
			item?.trade_party_type === 'collection_party'
			|| service_provider_arr?.includes(item?.trade_party_type)
		) {
			return item;
		}
		return null;
	});

	const collection_party_filters = (filter_cp || []).map((item) => {
		if (item?.trade_party_type === 'collection_party') {
			return {
				label : `Collection Party (${item?.trade_partner_details?.business_name})`,
				value : item?.id,
			};
		}

		if (item?.trade_party_type) {
			return {
				label : startCase(item?.trade_party_type),
				value : item?.id,
			};
		}

		return null;
	});

	const stakeholder_check_arr = (not_added_final_stakeholders || []).map(
		(item) => item?.value,
	);

	const stakeholder_not_cp = (tradeParties || []).filter((item) => {
		if (
			item?.trade_party_type !== 'collection_party'
			&& stakeholder_check_arr?.includes(item?.trade_party_type)
		) {
			return item;
		}
		return null;
	});

	const stakeholder_filters = (stakeholder_not_cp || []).map((item) => ({
		label : startCase(item?.trade_party_type),
		value : item?.id,
	}));

	const stakeholder_filtered = (stakeholder_filters || []).filter((item) => {
		if (item) {
			return item;
		}
		return null;
	});

	const superadmin_view = (tradeParties || []).map((item) => ({
		label : startCase(item?.trade_party_type),
		value : item?.id,
	}));

	const filter = isOkam
		? [
			{ label: 'Booking Party', value: 'booking_party' },
			{ label: 'Invoicing Parties', value: 'invoicing_parties' },
			...stakeholder_filtered,
		]
		: [...collection_party_filters];

	const filter_options = showAll
		? [
			{ label: 'Booking Party', value: 'booking_party' },
			{ label: 'Invoicing Parties', value: 'invoicing_parties' },
			...superadmin_view,
		]
		: filter;

	const filter_control = filter_controls(filter_options);

	const { fields, handleSubmit, watch, setValue } = useForm(filter_control);

	const filterProps = watch();

	const onError = (err) => {
		setErrors(err);
	};

	const handleFilters = () => {
		setShowFilters(false);
		tradePartiesHookSetters.setFilters({
			...filterProps,
		});
	};

	return {
		fields,
		filter_control,
		onError,
		errors,
		handleFilters,
		handleSubmit,
		filterProps,
		setValue,
		watch,
	};
};

export default usePocFilters;
