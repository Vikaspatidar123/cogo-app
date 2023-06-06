import { Toast } from '@cogoport/components';
import { isEmpty, startCase } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import getConfiguration from '../../discover_rates/common/SearchForm/utils/getConfiguration';
import domesticServiceDetails from '../../discover_rates/configurations/domestic-services.json';
import MAPPING from '../components/Info/icons-services-mapping';
import isServiceTaken from '../helpers/isServiceTaken';

import { useRequest } from '@/packages/request';

// const track = ({
// 	search_type,
// 	requiredPayload,
// 	detail,
// 	additional_services = [],
// } = {}) => {
// 	try {
// 		const search_parameter = `${search_type}_services_attributes`;

// 		const shipment = requiredPayload[search_parameter];
// 		trackEvent(PARTNER_EVENT.enquiry_created_enquiry, {
// 			search_id            : detail?.id,
// 			search_type,
// 			search_origin        : detail?.origin_port?.name,
// 			search_destination   : detail?.destination_port?.name,
// 			company_name         : detail?.importer_exporter?.business_name,
// 			user_name            : detail?.user?.name,
// 			user_email           : detail?.user?.email,
// 			main_service_details : {
// 				service_name: detail?.service_type,
// 				indicative_amount_currency:
// 					shipment?.[0]?.preferred_freight_rate_currency,
// 				indicative_amount: shipment?.[0]?.preferred_freight_rate,
// 			},
// 			additional_services,
// 		});
// 	} catch (err) {
// 		console.log(`Errored Event : ${err.toString()}`);
// 	}
// };

const notToCreateEnquiry = [
	'fcl_freight_local',
	'lcl_freight_local',
	'air_freight_local',
];

const rfqSellingDateServices = ['ftl_freight', 'fcl_freight', 'air_freight'];

const incoTermMapping = {
	cif : 'export',
	cfr : 'export',
	cpt : 'export',
	cip : 'export',
	dat : 'export',
	dap : 'export',
	ddp : 'export',
	fob : 'import',
	exw : 'import',
	fca : 'import',
	fas : 'import',
};
const useEnquiry = ({
	detail,
	refetch = () => {},
	payLoad,
	datePickerValue,
	apiData,
	addedServiceEnquiry,
	setAddedServiceEnquiry,
	setApiData,
	setFormData,
	formData,
	results_type,
}) => {
	const [{ loading }, createEnquiryApi] = useRequest(
		{
			url    : 'update_spot_search',
			method : 'post',
		},
		{ manual: true },
	);

	const [{ loading: createLoading }, createEnquiries] = useRequest(
		{
			url    : 'create_spot_search_negotiation',
			method : 'post',
		},
		{ manual: true },
	);

	const [isLoading, setIsLoading] = useState(false);
	const [negoServices, setNegoServices] = useState({});
	const [selectedService, setSelectedService] = useState(null);
	const { search_type, inco_term, service_details, service_type } = detail;
	const domesticService = domesticServiceDetails.includes(search_type);
	const serviceDetails = getConfiguration('service-details', search_type) || {};
	const rawConfig = getConfiguration('services', search_type);
	const location = { origin: null, destination: null };
	if (search_type === 'fcl_freight' || search_type === 'lcl_freight') {
		location.origin = detail.origin_port;
		location.destination = detail.destination_port;
	} else if (search_type === 'air_freight' || search_type === 'lcl_freight') {
		location.origin = detail.origin_airport;
		location.destination = detail.destination_airport;
	}

	const clubbingSimilarNegoServices = {};

	const negotiationServiceIds =		(detail?.negotiation_services || []).map((obj) => obj?.service_id) || [];

	const negoServicesArr = (detail?.negotiation_services || []).map((obj) => obj?.service);

	Object.keys(detail?.service_details || {}).forEach((key) => {
		// eslint-disable-next-line no-undef
		const trade_type =			detail?.service_details[key]?.trade_type
			// eslint-disable-next-line no-undef
			|| incoTermMapping[detail?.service_details[key]?.inco_term];
		if (negotiationServiceIds.includes(key)) {
			clubbingSimilarNegoServices[
				`${detail?.service_details[key]?.service_type}:${trade_type}`
			] = [
				...(clubbingSimilarNegoServices?.[
					`${detail?.service_details[key]?.service_type}:${trade_type}`
				] || []),
				detail?.service_details[key],
			];
		}
	});

	const handleDeletion = (service) => {
		const tempForApiData = {};
		const tempForFormData = {};

		Object.keys(apiData || {}).forEach((key) => {
			let serviceType = '';
			if (service?.similar_service_details?.length) {
				serviceType = service?.service;
			} else {
				serviceType =					addedServiceEnquiry[
					`${service?.service}:${service?.trade_type}`
				]?.[0];
			}
			if (key !== `${serviceType}:${service?.trade_type}`) {
				tempForApiData[key] = apiData[key];
			}
		});

		Object.keys(formData || {}).forEach((key) => {
			if (
				!(
					key === `${service?.service}:${service?.trade_type}`
					|| key === service?.id
				)
			) {
				tempForFormData[key] = formData[key];
			}
		});

		setAddedServiceEnquiry({
			...addedServiceEnquiry,
			[`${service?.service}:${service?.trade_type}`]: [],
		});

		setFormData(tempForFormData);
		setApiData(tempForApiData);

		Toast.success('Service excluded from enquiry creation');
	};

	const config = domesticService
		? rawConfig || []
		: (rawConfig || {})[inco_term] || [];

	const notTakenServices = config.filter(
		(serviceItem) => !isServiceTaken(serviceItem, detail),
	);

	const serviceForEnquiry = Object.values(service_details || {})
		.filter((item) => !notToCreateEnquiry.includes(item?.service_type))
		.map((service) => ({
			...service,
			// eslint-disable-next-line no-undef
			trade_type: service?.trade_type || incoTermMapping[service?.inco_term],
		}));

	const clubbingSameService = {};
	(serviceForEnquiry || []).forEach((obj) => {
		// eslint-disable-next-line no-undef
		const trade_type = obj?.trade_type || incoTermMapping[obj?.inco_term];
		clubbingSameService[`${obj?.service_type}:${trade_type}`] = [
			...(clubbingSameService[`${obj?.service_type}:${trade_type}`] || []),
			obj,
		];
	});

	const groupingServiceForEnquiry = {};

	Object.keys(clubbingSameService || {}).forEach((key) => {
		groupingServiceForEnquiry[key] = clubbingSameService[key];
	});

	const allPossibleServices = Object.keys(groupingServiceForEnquiry || {}).map(
		(key) => ({
			...(groupingServiceForEnquiry?.[key]?.[0] || {}),
			service    : groupingServiceForEnquiry?.[key]?.[0]?.service_type,
			service_id : groupingServiceForEnquiry?.[key]?.[0]?.service_type,
			title      : startCase(groupingServiceForEnquiry?.[key]?.[0]?.service_type),
			isMain:
					groupingServiceForEnquiry?.[key]?.[0]?.service_type === search_type,
			isOrigin:
					groupingServiceForEnquiry?.[key]?.[0]?.trade_type === 'export',
			similar_service_details : groupingServiceForEnquiry?.[key],
			trade_type              : groupingServiceForEnquiry?.[key]?.[0]?.trade_type,
			container_size          : undefined,
		}),
	);

	const serviceForRfq = (serviceForEnquiry || [])
		.filter((service) => service?.service_type === search_type)
		.map((serviceObj) => ({
			...serviceObj,
			isMain  : serviceObj?.service_type === search_type,
			service : serviceObj?.service_type,
			title   : startCase(serviceObj?.service_type),
		}));

	const mappingCargoDate = {
		ftl_freight : 'expected_cargo_pick_up_date',
		fcl_freight : 'cargo_readiness_date',
		air_freight : 'cargo_clearance_date',
	};

	notTakenServices?.forEach((service) => {
		const serviceObj = {
			id               : service,
			service,
			title            : serviceDetails[service]?.title || startCase(service),
			isEnquiryCreated : false,
			isDetailsAdded   : false,
			isOrigin         : service.includes('export'),
			trade_type       : service.includes('export') ? 'export' : 'import',
			isMain           : service === search_type,
		};

		if (service === 'export_haulage_freight') {
			if (location?.origin?.is_icd) {
				allPossibleServices.push(serviceObj);
			}
		} else if (service === 'import_haulage_freight') {
			if (location?.destination?.is_icd) {
				allPossibleServices.push(serviceObj);
			}
		} else allPossibleServices.push(serviceObj);
	});

	const [allServices, setAllServices] = useState(
		results_type !== 'rfq' ? allPossibleServices : serviceForRfq,
	);

	const originServices = allServices.filter(
		(service) => service.isOrigin && !service.isMain,
	);

	const destinationServices = allServices.filter(
		(service) => !service.isOrigin && !service.isMain,
	);

	const mainServices = [
		...(results_type !== 'rfq' ? allServices : serviceForRfq),
	].filter((service) => service?.isMain);

	useEffect(() => {
		if (!isEmpty(mainServices)) {
			setSelectedService((mainServices || [])[0] || {});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [notSelectedServices, setNotSelectedServices] = useState([
		...(mainServices || []),
		...(originServices || []),
		...(destinationServices || []),
	]);

	const [val, setVal] = useState(null);

	const handleQuerySearch = (value) => {
		setVal(value);

		const newServices = [];

		(
			[...mainServices, ...originServices, ...destinationServices] || []
		).forEach((service) => {
			const mapped = MAPPING[service.service];

			const heading = mainServices.includes(service?.service_type)
				? `${startCase(mapped.tag)}`
				: `${service?.isOrigin ? 'origin' : 'destination'} ${startCase(
					mapped.tag,
				)}`;
			if (
				service?.service?.includes(value.toLowerCase())
				|| heading.toLowerCase().includes(value.toLowerCase())
			) {
				newServices.push(service);
			}
		});
		setNotSelectedServices(newServices);
	};

	const handleChange = (newService) => {
		setNegoServices({
			...negoServices,
			[newService.id]: {
				service    : newService.service_type,
				service_id : newService.id,
				remarks    : newService.remarks,
			},
		});
	};
	const createEnquiry = async () => {
		setIsLoading(true);
		let check = false;

		Object.keys(apiData || {}).forEach((key) => {
			if (key.includes(':')) {
				check = true;
			}
		});
		const formattedApiData = {};
		Object.keys(apiData || {}).forEach((key) => {
			const newKey = key.split(':')[0];
			formattedApiData[`${newKey}_services_attributes`] = [
				...(formattedApiData[`${newKey}_services_attributes`] || []),
				...apiData[key],
			];
		});
		if (!check) {
			Toast.error('Please select atleast one service !');
			setIsLoading(false);
			return;
		}
		const requiredPayload = {
			negotiation_status : 'awaiting_responses',
			id                 : detail?.spot_search_id,
			...formattedApiData,
		};
		const array = [];
		Object.keys(requiredPayload || {}).forEach((key) => {
			const newKey = key.split(':')[0];
			if (
				newKey !== 'id'
				&& newKey !== 'negotiation_status'
				&& newKey !== `${search_type}_services_attributes`
			) {
				const service_name = newKey.split('_services_attributes')[0];
				array.push(service_name);
			}
		});

		if (
			search_type === 'air_freight'
			&& requiredPayload.air_freight_services_attributes
		) {
			requiredPayload.air_freight_services_attributes[0] = {
				...requiredPayload.air_freight_services_attributes[0],
				cargo_clearance_date : detail?.cargo_clearance_date,
				commodity            : detail?.commodity,
				packages             : detail?.packages,
				commodity_description:
					detail?.commodity_details?.[0]?.commodity_description
					|| 'replace later',
			};
		}

		const testArr = [];
		detail.packages.forEach((item) => {
			const obj = {
				packing_type   : item.packing_type,
				packages_count : item.packages_count,
				height         : item.height,
				width          : item.width,
				length         : item.length,
			};
			testArr.push(obj);
		});

		if (
			search_type === 'air_freight'
			&& requiredPayload.ltl_freight_services_attributes
		) {
			requiredPayload.ltl_freight_services_attributes[0] = {
				...requiredPayload.ltl_freight_services_attributes[0],
				// cargo_clearance_date: detail?.cargo_clearance_date,
				// commodity: detail?.commodity,
				packages: testArr,
				// commodity_description:
				// 	detail?.commodity_details[0]?.commodity_description ||
				// 	'replace later',
			};
		}

		// track({
		// 	search_type,
		// 	requiredPayload,
		// 	detail,
		// 	additional_services: array,
		// });
		try {
			const res = await createEnquiries.trigger({ data: requiredPayload });
			if (!res?.hasError) {
				setIsLoading(false);
				Toast.success('Enquiry Created Successfully !');
				refetch();
			} else {
				Toast.error('Something went wrong !');
				setIsLoading(false);
			}
		} catch (err) {
			setIsLoading(false);
			// eslint-disable-next-line no-console
			if (err?.data) {
				Toast.error(JSON.stringify(err?.data));
			} else {
				Toast.error(err?.message);
			}
		}
	};

	const rfqSaveHandle = async () => {
		if (
			!datePickerValue
			&& rfqSellingDateServices.includes(detail?.search_type)
		) {
			Toast.error('Sailing date is required!');
			return;
		}
		const expectedDateName = mappingCargoDate[service_type];
		const serviceAttributeDAta = (mainServices || []).map((item) => {
			const tempData = {
				id                 : item?.id,
				[expectedDateName] : datePickerValue,
			};
			return tempData;
		});
		setIsLoading(true);
		try {
			const keyName = `${service_type}_services_attributes`;
			const payloadRfq = {
				id                   : detail?.spot_search_id,
				negotiation_services : payLoad,
				negotiation_status   : 'awaiting_responses',
				[keyName]            : serviceAttributeDAta,
			};
			const res = await createEnquiryApi.trigger({ data: payloadRfq });
			setIsLoading(false);
			if (!res.hasError) {
				Toast.success('Created Enquiry');
				refetch();
			}
		} catch (err) {
			setIsLoading(false);
			Toast.error(err.data);
		}
	};
	return {
		handleChange,
		mainServices,
		originServices,
		destinationServices,
		createEnquiry,
		isLoading,
		setIsLoading,
		location,
		negoServices,
		rfqSaveHandle,
		selectedService,
		setSelectedService,
		val,
		setVal,
		handleQuerySearch,
		notSelectedServices,
		setAllServices,
		negotiationServiceIds,
		clubbingSimilarNegoServices,
		handleDeletion,
		negoServicesArr,
		loading,
		createLoading,
	};
};

export default useEnquiry;
