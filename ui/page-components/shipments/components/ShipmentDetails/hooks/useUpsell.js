import { useContext, useState } from 'react';

import getServiceValues from '../../../helpers/get-service-values';
import formatMainServiceData from '../../../utils/format-main-service-data';
import { ShipmentDetailContext } from '../common/Context';
import serviceWiseControls from '../configurations/upsell/service-wise-controls';

import useCreateSearch from './useCreateSearch';

import { useForm } from '@/packages/forms';
import { useRouter } from '@/packages/next';

const getServiceMappings = (service) => {
	const trade_type = service.type === 'origin' ? 'export' : 'import';
	const transportServices = ['trailer_freight', 'ftl_freight', 'ltl_freight'];
	if (transportServices.includes(service.service)) {
		return `${trade_type}_transportation`;
	}
	return `${trade_type}_${service.service}`;
};

const formatControls = (controls, service) => controls.map((control) => {
	if (control.options) {
		return {
			...control,
			options: control.options.filter(
				(item) => !item.type || item.type === service.type,
			),
		};
	}
	return control;
});

const useUpsell = ({ service, services, extraParams, shipment_data }) => {
	const [errors, setErrors] = useState([]);
	const [loading, setLoading] = useState(false);

	const { push } = useRouter();
	const [{ primary_service }] = useContext(ShipmentDetailContext);
	const shipment_type = shipment_data?.shipment_type;
	const search_type = service?.service;
	const newServices = services.map((item) => ({
		...item,
		service_type: item?.service_type.split('_service')[0],
	}));

	const { createNewSearch } = useCreateSearch({});

	const rawControls = formatControls(
		serviceWiseControls[search_type] || [],
		service,
	);

	const prefilledValues = getServiceValues(service, rawControls, {
		service_details: newServices,
	});

	const controls = rawControls.map((control) => ({
		...control,
		value:
			service?.[control.name] || prefilledValues[control.name] || control.value,
	}));

	const { control, handleSubmit, watch, register, reset, unregister } = useForm();

	const formValues = watch();
	const formProps = {
		control,
		formValues,
		handleSubmit,
		watch,
		register,
		reset,
		unregister,
	};
	const showElements = {};

	const addService = async (values, e) => {
		e.preventDefault();
		setLoading(true);

		if (values === null) {
			setLoading(false);
			return;
		}
		const mainServiceData = formatMainServiceData(shipment_type, newServices);
		const serviceToBeAdded = getServiceMappings(service);

		const serviceValues = {};
		Object.keys(values).forEach((key) => {
			if (
				key === 'cargo_handling_type'
				&& serviceToBeAdded === 'import_fcl_customs'
			) {
				serviceValues.import_transportation_cargo_handling_type = values[key];
			}
			if (
				key === 'cargo_handling_type'
				&& serviceToBeAdded === 'export_fcl_customs'
			) {
				serviceValues.export_transportation_cargo_handling_type = values[key];
			} else {
				serviceValues[`${serviceToBeAdded}_${key}`] = values[key];
			}
		});

		const otherData = newServices.find(
			(serviceItem) => serviceItem.service_type === shipment_type,
		);

		let trade_type;
		if (service?.type === 'origin') {
			trade_type = 'export';
		}
		if (service.type === 'destination') {
			trade_type = 'destination';
		}

		const origin_country_id = mainServiceData?.origin_port?.country?.id
			|| mainServiceData?.origin_airport?.country?.id
			|| mainServiceData?.origin_location?.country?.id
			|| mainServiceData?.origin_country_id
			|| primary_service?.origin_country_id;

		const destination_country_id = mainServiceData?.destination_port?.country?.id
			|| mainServiceData?.destination_airport?.country?.id
			|| mainServiceData?.destination_location?.country?.id
			|| mainServiceData?.destination_country_id
			|| primary_service?.destination_country_id;

		const rawParams = {
			trade_type,
			...otherData,
			...mainServiceData,
			...serviceValues,
			...extraParams,
			origin_country_id,
			destination_country_id,
			source    : 'upsell',
			source_id : shipment_data?.id,
		};
		const postData = await createNewSearch(
			rawParams,
			search_type,
			{
				[serviceToBeAdded]: true,
			},
			'hybrid',
		);

		if (!postData.error) {
			push(
				`${postData.href}/[shipment_id]`,
				`${postData.as}/${shipment_data?.id}`,
			);
		} else {
			setLoading(false);
		}
	};

	const onError = (errs) => {
		setErrors(errs);
	};
	return {
		onError,
		addService,
		showElements,
		loading,
		errors,
		controls,
		formValues,
		formProps,
	};
};
export default useUpsell;
