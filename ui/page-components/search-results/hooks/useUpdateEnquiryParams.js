import { addDays } from '@cogoport/utils';
import { useState, useEffect, useImperativeHandle, useMemo } from 'react';

import getConfiguration from '../../discover_rates/common/SearchForm/utils/getConfiguration';
import referControls from '../../discover_rates/configurations/enquiry/refer.controls';
import formatCreateSearch from '../utils/format-create-search';

import { useForm } from '@/packages/forms';

const useUpdateEnquiryParams = ({
	service,
	location,
	detail,
	prefillDetails,
	index,
	setShowElementExtra,
	setExtraDetails,
	extraDetails,
	serviceKey,
	params,
	ref,
}) => {
	const [errors, setErros] = useState({});

	const { search_type, commodity } = detail;

	const payload = formatCreateSearch(
		params,
		search_type,
		{ [service?.service]: true },
		true,
	);

	let allControls = getConfiguration(
		'enquiry-create-controls',
		service?.similar_service_details?.length
			? service?.service
			: payload?.service,
	);

	if (
		service?.similar_service_details?.[index]?.container_type === 'refer'
		&& service?.service === 'fcl_freight'
	) {
		allControls = [...allControls, ...referControls()];
	}

	let count = 0;

	let prefillData = {};

	if (service?.similar_service_details?.length) {
		prefillData = prefillDetails?.extraDetails?.[serviceKey];
	} else {
		prefillData =			prefillDetails?.extraDetails?.[
			`${service?.service}:${service?.trade_type}`
		]?.[index];
	}

	(allControls || []).forEach((obj) => {
		if (
			[
				'preferred_shipping_line_ids',
				'non_preferred_shipping_line_ids',
				'preferred_airline_ids',
			].includes(obj?.name)
		) {
			allControls[count].value = prefillData?.[obj?.name];
		}
		count += 1;
	});

	const {
		fields,
		handleSubmit,
		setValue,
		watch,
		setValues,
		unregister,
		register,
		reset,
		control,
	} = useForm();

	const showElements = useMemo(
		() => showElementFunc({
			advancedControls : allControls,
			formValues       : service,
			mode             : service?.similar_service_details?.length
				? service?.service
				: payload?.service,
			location,
			services: {
				[service?.similar_service_details?.length
					? service?.service
					: payload?.service]: true,
			},
			unregister,
			register,
			reset,
			setValue,
		}),
		[JSON.stringify(service)],
	);

	useEffect(() => {
		setShowElementExtra(showElements);
	}, [showElements]);

	const controls = allControls
		.filter((obj) => showElements?.[obj?.name])
		.map((item) => {
			if (
				item.name === 'destination_cargo_handling_type'
				&& !['INNSA', 'INMAA'].includes(location?.destination?.port_code)
			) {
				return {
					...item,
					options: item.options.filter(
						(option) => option?.value !== 'direct_port_delivery',
					),
				};
			}
			return item;
		});

	Object.keys(fields || {}).forEach((fieldKey) => {
		if (fieldKey === 'cargo_readiness_date') {
			fields[fieldKey].minDate = addDays(new Date(), 2);
		}

		if (
			fieldKey === 'msds_certificate'
			&& search_type === 'air_freight'
			&& commodity === 'hazardous'
		) {
			fields[fieldKey].rules = { required: 'Document is required1111' };
		}

		if (
			[
				'preferred_shipping_line_ids',
				'non_preferred_shipping_line_ids',
				'preferred_airline_ids',
			].includes(fieldKey)
		) {
			const operatorNames = [];
			fields[fieldKey].handleChange = (val) => {
				(val || []).forEach((operator) => {
					operatorNames.push(operator);
				});

				setExtraDetails({
					...extraDetails,
					[serviceKey]: {
						...extraDetails[serviceKey],
						[fieldKey]: operatorNames,
					},
				});
			};
		}

		if (fieldKey === 'hs_code') {
			let hsCodeObj = {};
			fields[fieldKey].handleChange = (val) => {
				hsCodeObj = val;
				setExtraDetails({
					...extraDetails,
					[`${service?.service}:${service?.trade_type}`]: {
						...extraDetails[serviceKey],
						[fieldKey]: [
							hsCodeObj,
							...(extraDetails?.[
								`${service?.service}:${service?.trade_type}`
							]?.[fieldKey] || []),
						],
					},
				});
			};
		}
	});

	useEffect(() => {
		if (service?.similar_service_details?.length) {
			setValues(prefillDetails?.extraDetails?.[serviceKey]);
		} else {
			setValues(
				prefillDetails?.extraDetails?.[
					`${service?.service}:${service?.trade_type}`
				]?.[index],
			);
		}
	}, [service]);

	const onError = (err) => {
		setErros(err);
		console.log(err);
	};

	useImperativeHandle(ref, () => ({ handleSubmit, onError }));

	const formValues = watch();

	useEffect(() => {
		if (prefillData?.packages) {
			const formatPackageInformation = (prefillData?.packages || []).map(
				(obj) => ({
					packing_type   : obj?.packing_type,
					packages_count : Number(obj?.packages_count),
					dimensions     : {
						length : Number(obj?.dimensions?.length),
						width  : Number(obj?.dimensions?.width),
						height : Number(obj?.dimensions?.height),
					},
				}),
			);
			setValue('packages', formatPackageInformation);
		} else if (service?.packages?.length) {
			const formatPackageInformation = (service?.packages || []).map((obj) => ({
				packing_type   : obj?.packing_type,
				packages_count : obj?.packages_count,
				dimensions     : {
					length : obj?.length,
					width  : obj?.width,
					height : obj?.height,
				},
			}));
			setValue('packages', formatPackageInformation);
		} else {
			const formatPackageInformation = [
				{
					packing_type   : 'pallet',
					packages_count : 1,
					dimensions     : {
						length : 1,
						width  : 1,
						height : 1,
					},
				},
			];
			setValue('packages', formatPackageInformation);
		}
	}, [service]);

	useEffect(() => {
		setValue('remarks', formValues?.remarks);
	}, [formValues?.remarks]);

	return {
		controls,
		control,
		fields,
		errors,
		showElements,
		handleSubmit,
		onError,
	};
};
export default useUpdateEnquiryParams;
