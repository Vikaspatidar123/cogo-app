import { getFormattedValues } from '@cogo/app-common';
import formatSearch from '@cogo/app-search/utils/format-create-search';
import formatMainServiceData from '@cogo/app-search/utils/format-main-service-data';
import { toast } from '@cogoport/front/components';
import { useRef, useState } from 'react';

const isPackageFormatted = (obj) => {
	const requiredArr = [
		'packing_type',
		'packages_count',
		'length',
		'width',
		'height',
	];
	let check = true;
	const packingArr = [];

	Object.keys(obj || {}).forEach((key) => {
		packingArr.push(key);
	});
	(requiredArr || []).forEach((val) => {
		if (!packingArr.includes(val)) {
			check = false;
		}
	});
	return check;
};

const formattedPackage = (packagesArr) => {
	const check = isPackageFormatted(packagesArr?.[0]);
	if (check) {
		return packagesArr;
	}
	const temp = [];
	(packagesArr || []).forEach((packageObj) => {
		temp.push({
			packing_type: packageObj?.packing_type,
			length:
				packageObj?.dimensions?.length
				|| packageObj?.['dimensions (meters)']?.length,

			width:
				packageObj?.dimensions?.width
				|| packageObj?.['dimensions (meters)']?.width,
			height:
				packageObj?.dimensions?.height
				|| packageObj?.['dimensions (meters)']?.height,
			packages_count: packageObj?.packages_count,
		});
	});
	return temp;
};

const getRawParams = (detail, res) => {
	const mainServiceData = formatMainServiceData(
		detail?.search_type,
		Object.values(detail?.service_details || {}),
	);

	return { ...mainServiceData, ...res?.serviceData };
};

const formatForAlreadyAddedService = (detail, res, service, extraDetails) => {
	let mainData = {};
	const finalObject = {};
	Object.keys(res || {}).forEach((key) => {
		if (key !== 'serviceData') {
			mainData = res[key];
			const { remarks, ...formattedValues } = getFormattedValues(mainData);

			const availableValues = {};
			Object.keys(formattedValues).forEach((valueKey) => {
				if (formattedValues[valueKey]) {
					availableValues[valueKey] = formattedValues[valueKey];
				}
			});
			if (mainData?.negotiation_remarks || remarks) {
				availableValues.negotiation_remarks = [
					remarks || mainData?.negotiation_remarks,
				];
			}
			availableValues.status = 'active';
			availableValues.id = detail?.service_details[key]?.id;
			availableValues.negotiation_status = 'awaiting_responses';
			if (availableValues?.preferred_freight_rate) {
				availableValues.preferred_freight_rate = Number(
					availableValues?.preferred_freight_rate || 0,
				);
			}
			finalObject[`${service?.service}:${service?.trade_type}`] = [
				...(finalObject?.[`${service?.service}:${service?.trade_type}`] || []),
				availableValues,
			];
		}
	});

	const formArr = [];
	Object.keys(res || {}).forEach((key) => {
		if (Object.keys(res[key]).length) {
			const obj = {
				...detail?.service_details[key],
				...res[key],
				preferred_shipping_lines:
					extraDetails?.[key]?.preferred_shipping_line_ids || undefined,
				non_preferred_shipping_lines:
					extraDetails?.[key]?.non_preferred_shipping_line_ids || undefined,
				preferred_airlines:
					extraDetails?.[key]?.preferred_airline_ids || undefined,
			};
			if (obj?.packages) {
				let temp = [];
				temp = formattedPackage(obj?.packages);
				formArr.push({
					...obj,
					packages: temp,
				});
			} else {
				formArr.push(obj);
			}
		}
	});

	return { finalObject, formArr };
};

const formatAddedServices = (payloadData, res, arr, service) => {
	const payload = {};

	payload.service = payloadData?.service;

	Object.keys(payloadData || {}).forEach((key) => {
		if (key !== 'service') {
			payload[key] = payloadData[key];
		}
	});

	let mainData = {};
	Object.keys(res || {}).forEach((key) => {
		mainData = res[key];
	});

	const { remarks, ...formattedValues } = getFormattedValues(
		service?.similar_service_details?.length ? mainData : res?.serviceData,
	);

	const availableValues = {};
	Object.keys(formattedValues).forEach((key) => {
		if (formattedValues[key]) {
			availableValues[key] = formattedValues[key];
		}
	});
	availableValues.negotiation_remarks = [
		remarks || mainData?.negotiation_remarks,
	];
	availableValues.status = 'active';

	const serviceType = payload?.service;

	const arrFinal = [];

	Object.keys(payload || {}).forEach((key) => {
		if (key !== 'service') {
			(payload[key] || []).forEach((obj, ind) => {
				arrFinal.push({
					...obj,
					...arr[ind],
					negotiation_status: 'awaiting_responses',
				});
			});
		}
	});
	const formattedPayloadArr = [];
	(arrFinal || []).forEach((obj) => {
		if (obj?.packages) {
			const temp = formattedPackage(obj?.packages);

			formattedPayloadArr.push({
				...obj,
				cargo_handling_type:
					serviceType === 'trailer_freight'
						? undefined
						: obj?.cargo_handling_type,
				packages: temp || undefined,
			});
		} else {
			formattedPayloadArr.push({
				...obj,
				cargo_handling_type:
					serviceType === 'trailer_freight'
						? undefined
						: obj?.cargo_handling_type,
			});
		}
	});

	return { formattedPayloadArr, serviceType, payload };
};

const useEnquiryModalForm = ({
	detail,
	service,
	formData = {},
	setFormData = () => {},
	apiData,
	setApiData,
	addedServiceEnquiry,
	setPrefillDetails,
	prefillDetails,
	setAddedServiceEnquiry,
	setSelectedService,
}) => {
	const serviceRef = useRef({});

	const [loading, setLoading] = useState(false);
	const [extraDetails, setExtraDetails] = useState({});
	const [noOfServiceForms, setNoOfServiceForms] = useState([]);
	const [showElementExtra, setShowElementExtra] = useState({});
	const [showElementAdd, setShowElementAdd] = useState({});
	const [locationObj, setLocationObj] = useState({});
	const [hsCode, setHsCode] = useState({});
	const [params, setParams] = useState({});

	const handleAddServiceEnquiry = async () => {
		const promisesArr = [];
		let allValues = {};
		Object.keys(serviceRef?.current || {}).forEach((key) => {
			if (serviceRef?.current?.[key]) {
				const { handleSubmit, onError } = serviceRef?.current?.[key];
				promisesArr.push(
					handleSubmit(
						(values) => {
							const formattedValues = {};
							if (key === 'serviceData') {
								Object.keys(values || {}).forEach((valueKey) => {
									if (showElementAdd?.[valueKey] && values[valueKey]) {
										formattedValues[valueKey] = values[valueKey];
									}
								});
								allValues[key] = formattedValues;
							} else {
								Object.keys(values || {}).forEach((valueKey) => {
									if (showElementExtra?.[valueKey] && values[valueKey]) {
										formattedValues[valueKey] = values[valueKey];
									}
								});
								allValues[key] = formattedValues;
							}
						},
						(err) => {
							onError(err);
							allValues = { ...allValues, error: true };
						},
					)(),
				);
			}
		});
		await Promise.all(promisesArr);
		return allValues;
	};

	const handleAddService = async () => {
		setLoading(true);
		const res = await handleAddServiceEnquiry();

		setLoading(false);

		if (!res?.error) {
			const objectForPrefill = {};
			const objectForExtra = {};
			Object.keys(res || {}).forEach((key) => {
				if (key === 'serviceData') {
					objectForPrefill[key] = res?.[key];
				} else {
					objectForExtra[key] = res?.[key];
				}
			});

			if (service?.similar_service_details?.length) {
				setPrefillDetails({
					...(prefillDetails || {}),
					addServiceDetails: {
						...(prefillDetails.addServiceDetails || {}),
						...objectForPrefill,
					},
					extraDetails: {
						...(prefillDetails.extraDetails || {}),
						...objectForExtra,
					},
				});
			} else {
				const extraDataArr = [];
				Object.keys(res || {}).forEach((key) => {
					if (key !== 'serviceData') {
						extraDataArr.push(res[key]);
					}
				});
				setPrefillDetails({
					...(prefillDetails || {}),
					addServiceDetails: {
						...(prefillDetails.addServiceDetails || {}),
						[`${service?.service}:${service?.trade_type}`]: res?.serviceData,
					},
					extraDetails: {
						...(prefillDetails.extraDetails || {}),
						[`${service?.service}:${service?.trade_type}`]: extraDataArr,
					},
				});
			}

			const serviceResponseArr = [];
			Object.keys(res || {}).forEach((key) => {
				if (key !== 'error' && key !== 'serviceData') {
					serviceResponseArr.push(res[key]);
				}
			});

			const rawParams = getRawParams(detail, res);

			const payloadData = formatSearch(
				rawParams,
				detail?.search_type,
				{ [service?.service]: true },
				true,
			);

			if (service?.similar_service_details?.length) {
				const { finalObject, formArr } = formatForAlreadyAddedService(
					detail,
					res,
					service,
					extraDetails,
				);

				setApiData({
					...apiData,
					...(finalObject || {}),
					[`${service?.service}:${service?.trade_type}`]: [
						...(finalObject[`${service?.service}:${service?.trade_type}`]
							|| []),
					],
				});
				setFormData({
					...formData,
					[`${service?.service}:${service?.trade_type}`]: formArr,
				});
				setAddedServiceEnquiry({
					...addedServiceEnquiry,
					[`${service?.service}:${service?.trade_type}`]: [
						`${service?.service}:${service?.trade_type}`,
					],
				});
				toast.success('Service information saved successfully !');
			} else {
				const { formattedPayloadArr, serviceType, payload } =					formatAddedServices(payloadData, res, serviceResponseArr, service);

				setApiData({
					...apiData,
					[`${serviceType}:${service?.trade_type}`]: [
						...(formattedPayloadArr || []),
					],
				});
				setFormData({
					...formData,
					[`${service?.service}:${service?.trade_type}`]:
						formattedPayloadArr.map((obj, index) => ({
							...obj,
							service_name: payload?.service,
							origin_location_id:
									locationObj.export_transportation_location_id || undefined,
							destination_location_id:
									locationObj.import_transportation_location_id || undefined,
							hs_code:
									extraDetails?.[`${service?.service}:${service?.trade_type}`]
										?.hs_code?.[index]?.label,
						})),
				});

				setAddedServiceEnquiry({
					...addedServiceEnquiry,
					[`${service?.service}:${service?.trade_type}`]: [payload?.service],
				});
				toast.success('Service information saved successfully !');
			}
			setSelectedService({});
		} else {
			toast.error('Please fill required values !');
		}
	};

	return {
		handleAddService,
		loading,
		extraDetails,
		noOfServiceForms,
		setNoOfServiceForms,
		setShowElementAdd,
		setShowElementExtra,
		setLocationObj,
		serviceRef,
		setExtraDetails,
		setHsCode,
		hsCode,
		params,
		setParams,
	};
};

export default useEnquiryModalForm;
