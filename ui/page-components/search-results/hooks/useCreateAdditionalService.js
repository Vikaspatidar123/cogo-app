import { useState, useEffect } from 'react';
import { useRequest } from '@cogo/commons/hooks';
import startCase from '@cogo/utils/startCase';
import { toast } from '@cogoport/front/components';
import showErrorsInToast from '@cogo/utils/showErrorsInToast';

const useCreateAdditionalService = ({
	data = {},
	possible_additional_services = [],
	scope = '',
	renderServices = () => {},
	refetch = () => {},
	serviceMappings = {},
	getServiceName = () => {},
	subsidiaryService = '',
	setSubsidiaryService = () => {},
}) => {
	const [query, setQuery] = useState('');
	const [addService, setAddService] = useState(null);
	const [show, setShow] = useState(false);
	const [deleteService, setDeleteService] = useState('');
	const [loading, setLoading] = useState(false);
	const [remainingServicesToAdd, setRemainingServicesToAdd] = useState([]);
	const [addCargoInsurance, setAddCargoInsurance] = useState(false);

	let createSubsidiaryServiceApi = {};
	if (!data?.checkout_id) {
		createSubsidiaryServiceApi = useRequest(
			'post',
			false,
			scope,
		)('/create_spot_search_service');
	} else {
		createSubsidiaryServiceApi = useRequest(
			'post',
			false,
			scope,
		)('/create_checkout_service');
	}

	const {
		service_details,
		search_type = '',
		service_type = '',
		inco_term,
		trade_type = '',
	} = data || {};

	const { services, detail } =
		serviceMappings[search_type] || serviceMappings[service_type] || {};

	let additionalServices = [];
	if (service_type === 'air_freight' && trade_type === 'domestic') {
		additionalServices = services?.air_domestic;
	} else {
		additionalServices =
			services?.[inco_term] || services?.[data?.trade_type] || [];
	}

	const servicesList = Object.values(service_details || {});

	const servicesArr = [];
	(servicesList || []).map((item) => {
		servicesArr.push(getServiceName(item));

		return servicesArr;
	});
	const uniq_services_list = [...new Set(servicesArr)];
	const added_services_count = (uniq_services_list || []).length;

	const servicesToAdd = (additionalServices || []).filter((service) => {
		if (search_type && service !== search_type) {
			return service;
		}
		if (service_type && service !== service_type) {
			return service;
		}
		return null;
	});

	const finalServicesToAdd = renderServices(servicesList, servicesToAdd, data);

	useEffect(() => {
		setRemainingServicesToAdd(finalServicesToAdd);
	}, [added_services_count]);

	const handleAdd = (service) => {
		setAddService(service);
		setRemainingServicesToAdd(finalServicesToAdd);
	};

	const handleClose = () => {
		setAddService(null);
		setRemainingServicesToAdd(finalServicesToAdd);
	};

	const handleSearch = (val) => {
		setQuery(val);

		if (val) {
			const filtered_services = (remainingServicesToAdd || []).filter(
				(item) =>
					(detail[item]?.title || '')
						.toLowerCase()
						.includes(val.toLowerCase()) ||
					item.toLowerCase().includes(val.toLowerCase()),
			);
			setRemainingServicesToAdd(
				filtered_services.length ? filtered_services : finalServicesToAdd,
			);
		} else {
			setRemainingServicesToAdd(finalServicesToAdd);
		}
	};

	const handleSubsidiaryService = async () => {
		const serviceObj = (possible_additional_services || []).filter(
			(item) => item.key === subsidiaryService,
		)?.[0];

		const services_Arr = (servicesList || []).filter(
			(item) =>
				item?.service_type === serviceObj?.service &&
				(item?.trade_type === serviceObj?.trade_type ||
					!item?.trade_type ||
					!serviceObj?.trade_type),
		);

		const subsidiaryServicesArr = [];
		(services_Arr || []).forEach((item) => {
			const service = {
				code: serviceObj?.code,
				service_type: serviceObj?.service,
				service_id: item?.id,
				status: 'active',
			};
			subsidiaryServicesArr.push(service);
		});

		setLoading(true);
		try {
			let payload = {};
			if (!data?.checkout_id) {
				payload = {
					id: data?.spot_search_id,
					service: 'subsidiary',
					subsidiary_services: subsidiaryServicesArr,
				};
			} else {
				payload = {
					id: data?.checkout_id,
					service: 'subsidiary',
					subsidiary_services_attributes: subsidiaryServicesArr,
				};
			}

			const res = await createSubsidiaryServiceApi.trigger({ data: payload });

			if (!res.hasError) {
				toast.success('Service added successfully!');
				setLoading(false);
				setSubsidiaryService('');
				refetch();
			}
		} catch (err) {
			showErrorsInToast(err?.data);
			setLoading(false);
		}
		setLoading(false);
	};

	const subsidiaryServicesList = [];
	(possible_additional_services || []).forEach((item) => {
		let tradeType = '';
		if (item?.trade_type === 'export') {
			tradeType = 'Origin';
		} else if (item?.trade_type === 'import') {
			tradeType = 'Destination';
		}
		const service = {
			label: `${tradeType} ${item?.name}(${startCase(item?.service)})`,
			value: item?.key,
		};
		subsidiaryServicesList.push(service);
	});

	return {
		handleAdd,
		handleClose,
		handleSearch,
		handleSubsidiaryService,
		subsidiaryServicesList,
		remainingServicesToAdd,
		addService,
		query,
		loading,
		setLoading,
		deleteService,
		setDeleteService,
		show,
		setShow,
		uniq_services_list,
		detail,
		search_type,
		service_type,
		servicesList,
		addCargoInsurance,
		setAddCargoInsurance,
	};
};

export default useCreateAdditionalService;
