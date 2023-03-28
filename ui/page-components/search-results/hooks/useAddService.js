import showElementsFunc from '@cogo/app-search/common/SearchForm/utils/show-elements';
import airControls from '@cogo/app-search/configurations/search/air/form.controls.advanced';
import airLocalsControls from '@cogo/app-search/configurations/search/domestic/air-locals/form-controls.advanced';
import fclCustomsControls from '@cogo/app-search/configurations/search/domestic/fcl-customs/form-controls.advanced';
import fclLocalsControls from '@cogo/app-search/configurations/search/domestic/fcl-locals/form-controls.advanced';
import lclLocalsControls from '@cogo/app-search/configurations/search/domestic/lcl-locals/form-controls.advanced';
import fclControls from '@cogo/app-search/configurations/search/fcl/form-controls.advanced';
import lclControls from '@cogo/app-search/configurations/search/lcl/form.controls.advanced';
import formatSearch from '@cogo/app-search/utils/format-create-search';
import formatMainServiceData from '@cogo/app-search/utils/format-main-service-data';
import { trackEvent, APP_EVENT } from '@cogo/commons/analytics';
import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';
import isEmpty from '@cogo/utils/isEmpty';
import { toast } from '@cogoport/front/components';
import { useState, useMemo, useImperativeHandle, useEffect } from 'react';

import getServiceValues from '../helpers/get-service-values';

import { useForm } from '@/packages/forms';

const controlsMapping = {
	fcl_freight       : fclControls(),
	lcl_freight       : lclControls(),
	air_freight       : airControls(),
	fcl_customs       : fclCustomsControls(),
	lcl_customs       : lclControls(),
	air_customs       : airControls(),
	fcl_freight_local : fclLocalsControls(),
	lcl_freight_local : lclLocalsControls(),
	air_freight_local : airLocalsControls(),
};

const useAddService = ({
	service,
	search_type,
	services,
	ref,
	setNoOfServiceForms = () => {},
	addedServiceEnquiry,
	prefillDetails,
	setShowElementAdd = () => {},
	setLocationObj = () => {},
	setLoading = () => {},
	onAdd = () => {},
	setParams = () => {},
	params = {},
	data = {},
}) => {
	const [errors, setErrors] = useState([]);

	const prefilledValues = getServiceValues(
		service,
		controlsMapping[search_type] || [],
		{ service_details: services },
	);

	const { scope, query } = useSelector(({ general }) => ({
		scope : general?.scope,
		query : (general || {}).query || {},
	}));
	const { search_id, checkout_id } = query;

	const controls = (controlsMapping[search_type] || []).map((control) => ({
		...control,
		value:
			service?.[control.name] || prefilledValues[control.name] || control.value,
		disabled: !!(
			addedServiceEnquiry?.[`${service?.service}:${service?.trade_type}`]
				?.length
			|| addedServiceEnquiry?.[`${service?.service}:${service?.trade_type}`]
				?.length
		),
	}));

	(controls || []).forEach((obj, index) => {
		if (
			obj?.name === 'import_transportation_location_id'
			|| obj?.name === 'export_transportation_location_id'
		) {
			controls[index].value =				prefillDetails?.addServiceDetails?.[
				`${service?.service}:${service?.trade_type}`
			]?.[obj?.name];
		}
	});

	const {
		fields,
		handleSubmit,
		watch,
		register,
		reset,
		unregister,
		setValues,
		setValue,
		control,
	} = useForm();

	Object.keys(fields || {}).forEach((key) => {
		if (
			key === 'import_transportation_location_id'
			|| key === 'export_transportation_location_id'
		) {
			fields[key].handleChange = (val) => {
				setLocationObj({ [key]: val });
			};
		}
	});

	const onError = (errs) => {
		setErrors(errs);
	};

	let CreateAdditionalService = {};
	if (!data?.checkout_id) {
		CreateAdditionalService = useRequest(
			'post',
			false,
			scope,
		)('/create_spot_search_service');
	} else {
		CreateAdditionalService = useRequest(
			'post',
			false,
			scope,
		)('/create_checkout_service');
	}

	useImperativeHandle(ref, () => ({ handleSubmit, onError }));
	const formValues = watch();

	const serviceRenderingControl = () => {
		const mainServiceData = formatMainServiceData(search_type, services);

		const rawParams = { ...mainServiceData, ...(formValues || {}) };

		setParams(rawParams);

		const payload = formatSearch(
			rawParams,
			search_type,
			{ [service?.service]: true },
			true,
		);

		if (payload?.service) {
			Object.keys(payload || {}).forEach((key) => {
				if (key !== 'service') {
					const tempArr = [];
					payload[key].forEach((obj) => {
						tempArr.push({ ...obj, service: payload.service });
					});
					setNoOfServiceForms(tempArr);
				}
			});
		}
	};

	useEffect(() => {
		serviceRenderingControl();
	}, [JSON.stringify(formValues)]);

	useEffect(() => {
		setValues(
			prefillDetails?.addServiceDetails?.[
				`${service?.service}:${service?.trade_type}`
			],
		);
	}, []);

	const formProps = {
		fields,
		formValues,
		handleSubmit,
		watch,
		register,
		reset,
		unregister,
	};
	const showElements = useMemo(
		() => showElementsFunc({
			...formProps,
			advancedControls : controls,
			mode             : search_type,
			location         : {},
			services         : { [service?.service]: true },
		}),
		[JSON.stringify(formValues)],
	);

	const addService = async (values) => {
		setErrors({});
		setLoading(true);
		try {
			const mainServiceData = formatMainServiceData(search_type, services);

			const airFreightData = (services || []).filter(
				(element) => element.service_type === 'air_freight',
			);

			let packages;
			let packages_count;
			let volume;
			let weight;

			if (search_type === 'air_freight' && !isEmpty(airFreightData)) {
				packages = [];
				packages_count = 0;
				volume = 0;
				weight = 0;
				airFreightData.forEach((element) => {
					packages = [...packages, ...element?.packages];
					packages_count += element?.packages_count;
					volume += element?.volume;
					weight += element?.weight;
				});
			}

			if (search_type === 'lcl_freight') {
				packages_count = mainServiceData?.packages_count;
				volume = mainServiceData?.volume;
				weight = mainServiceData?.weight;
			}

			const rawParams = {
				...mainServiceData,
				...values,
				packages       : packages || undefined,
				packages_count : packages_count || undefined,
				volume         : volume || undefined,
				weight         : weight || undefined,
			};

			const payload = formatSearch(
				rawParams,
				search_type,
				{ [service?.service]: true },
				true,
			);
			const payloadToSend = {
				...payload,
				id: data?.checkout_id ? checkout_id : search_id,
			};
			if (scope === 'app') {
				trackEvent(APP_EVENT.search_added_additional_service, {
					service_name: payload.service,
				});
			}
			const res = await CreateAdditionalService.trigger({
				data: payloadToSend,
			});
			if (!res.hasError) {
				toast.success('Service added succesfully');
				onAdd();
			} else {
				toast.error(res?.message);
			}
			setLoading(false);
		} catch (err) {
			console.log(err);
			toast.error(err?.data);
			setLoading(false);
		}
	};

	useEffect(() => {
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

		if (showElements?.import_transportation_packages) {
			const package_values = formValues?.import_transportation_packages;

			if (package_values?.length === 0) {
				setValue('import_transportation_packages', formatPackageInformation);
			}
		}
		if (showElements?.export_transportation_packages) {
			const package_values = formValues?.export_transportation_packages;

			if (package_values?.length === 0) {
				setValue('export_transportation_packages', formatPackageInformation);
			}
		}
	}, [params]);

	useEffect(() => {
		setShowElementAdd(showElements);
	}, [showElements]);

	return {
		onError,
		showElements,
		errors,
		controls,
		formValues,
		formProps,
		addService,
		control,
	};
};
export default useAddService;
