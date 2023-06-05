import { isEmpty } from '@cogoport/utils';
import { useState, useRef } from 'react';

import CLASS_MAPPING from './utils/classMapping';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import showErrorsInToast from '@/ui/commons/utils/showErrorsInToast';

const useAirLocal = ({
	extraParams = {},
	airFreightLocalsData = {},
	onPush = () => {},
}) => {
	const { airport = {}, trade_type = '' } = airFreightLocalsData || {};

	const [location, setLocation] = useState(() => ({
		origin: { ...airport } || {},
	}));

	const [formError, setFormError] = useState({
		goods : false,
		route : {
			origin: false,
		},
	});

	const [selectedTradeType, setSelectedTradeType] = useState(
		trade_type || 'import',
	);

	const router = useRouter();

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/create_spot_search',
			method : 'post',
		},
		{ manual: true },
	);
	const airFormRef = useRef({});

	const getAirFreightServices = ({ airPayloadObj, PackagesArr }) => {
		const completeAirPayload = PackagesArr.map((elem) => {
			let volume = Number(elem.length || 0)
        * Number(elem.width || 0)
        * Number(elem.height || 0)
        * Number(elem.packages_count || 0);
			const weight = Number(elem.package_weight) * Number(elem.packages_count);

			volume /= 1000000;

			return {
				...airPayloadObj,
				packages: [
					{
						...elem,
						package_weight: Number(elem?.package_weight || 0) || undefined,
					},
				],
				packages_count: elem.packages_count,
				weight,
				volume,
			};
		});
		return completeAirPayload;
	};

	const getPayload = (airFormData) => {
		const {
			importer_exporter_branch_id = '',
			importer_exporter_id,
			user_id = '',
		} = extraParams || {};

		const {
			goods = {},
			TradeType = {},
			airline = {},
			terminalHandlingType = {},
		} = airFormData || {};

		const terminalCharge = () => {
			if (
				TradeType.selectedTradeType === 'domestic'
        && terminalHandlingType.selectedHandlingType === 'destination'
			) {
				return 'inbound';
			}
			if (
				TradeType.selectedTradeType === 'domestic'
        && terminalHandlingType.selectedHandlingType === 'origin'
			) {
				return 'outbound';
			}
			return '';
		};

		const {
			commodity_sub_type = '',
			load = {},
			commodity = '',
			commodity_type = '',
		} = goods || {};

		const {
			class_id = '',
			class_description = '',
			subclass_id = '',
			subclass_codes = [],
		} = CLASS_MAPPING?.[commodity_sub_type] || {};

		const { perPackagedata = {} } = load || {};

		let totalWeight = 0;
		let totalQuantity = 0;
		let totalVolume = 0;
		let packages = [];
		if (!isEmpty(perPackagedata)) {
			(perPackagedata?.dimensions || []).forEach((item) => {
				totalWeight += Number(item.quantity) * Number(item.total_weight);
				totalQuantity += Number(item.quantity);
				totalVolume
          += (Number(item.length)
            * Number(item.width)
            * Number(item.height)
            * Number(item.quantity))
          / 1000000;

				packages = [
					...packages,
					{
						length         : Number(item.length),
						width          : Number(item.width),
						height         : Number(item.height),
						packages_count : Number(item.quantity),
						packing_type   : item.package_type,
						handling_type  : item.handling,
						package_weight : item.total_weight,
					},
				];
			});
		}

		let commodity_details = [];

		if (commodity_type === 'dangerous') {
			commodity_details = [
				{
					commodity_type,
					commodity_description : goods?.cargo_description || undefined,
					commodity_class       : {
						class_id,
						class_description,
						subclass_id,
						subclass_codes:
              subclass_codes.length > 0 ? subclass_codes : undefined,
					},
					msds_document:
            'https://cogoport-testing.sgp1.digitaloceanspaces.com/e82569a6e67f3bdb3f73497cc1d8346c/sample.pdf',
				},
			];
		} else if (commodity_type === 'temp_controlled') {
			const commoditySubTypeArray = commodity_sub_type.split('-');
			const [temp_controlled_type, temp_controlled_range] = commoditySubTypeArray || [];

			commodity_details = [
				{
					commodity_type,
					packing_list:
            'https://cogoport-testing.sgp1.digitaloceanspaces.com/843e68957145a8994d3ac3fc09877a3e/sample.pdf',
					temp_controlled_type,
					temp_controlled_range,
					special_instruction: 'dfgh',
				},
			];
		} else if (commodity_type === 'other_special') {
			commodity_details = [
				{
					commodity_type,
					commodity_subtype: commodity_sub_type,
				},
			];
		} else {
			commodity_details = [
				{
					commodity_type: commodity_sub_type,
				},
			];
		}
		const airPayload = {
			airport_id: location?.origin?.id,

			commodity,
			airline_id             : airline.selectedAirline,
			commodity_details,
			packages_count         : totalQuantity,
			weight                 : totalWeight,
			volume                 : totalVolume,
			status                 : 'active',
			trade_type             : TradeType.selectedTradeType,
			terminal_charge_type   : terminalCharge(),
			logistics_service_type : 'express',
		};

		const air_freight_local_services_attributes = getAirFreightServices({
			airPayloadObj : airPayload,
			PackagesArr   : packages,
		});

		return {
			search_type : 'air_freight_local',
			source      : 'platform',
			importer_exporter_branch_id,
			importer_exporter_id,
			user_id,
			air_freight_local_services_attributes,
		};
	};

	const isPayloadValid = () => {
		let hasError = false;

		let errorObject = {
			route: {
				origin: isEmpty(location?.origin),
			},
		};

		hasError = isEmpty(location?.origin);

		Object.keys(airFormRef.current || []).forEach((element) => {
			const err = airFormRef.current[element]?.handleSubmit().hasError;
			hasError = hasError || err;

			errorObject = {
				...errorObject,
				[element]: err,
			};
		});

		setFormError({ ...errorObject });

		return !hasError;
	};

	const getAirFormData = () => {
		let formValues = {};

		Object.keys(airFormRef.current || []).forEach((element) => {
			formValues = {
				...formValues,
				[element]: airFormRef.current[element]?.handleSubmit().values || {},
			};
		});

		return formValues;
	};

	const onClickSearchRates = async () => {
		try {
			const isValid = isPayloadValid();
			if (!isValid) {
				return;
			}

			const airFormData = getAirFormData();

			const payload = getPayload(airFormData);

			const response = await trigger({ data: payload });
			const { data = {} } = response || {};

			const ROUTE_MAPPING = {
				app: {
					href : '/book/[search_id]',
					as   : `/book/${(data || {}).id}`,
				},
			};
			const { href, as } = ROUTE_MAPPING.app;
			router.push(href, as);

			onPush();
		} catch (error) {
			console.log(error, 'error?.data');
			showErrorsInToast(error?.data);
		}
	};

	return {
		location,
		setLocation,
		airFormRef,
		onClickSearchRates,
		loading,
		formError,
		selectedTradeType,
		setSelectedTradeType,
	};
};

export default useAirLocal;
