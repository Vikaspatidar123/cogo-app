import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect, useRef } from 'react';

import CLASS_MAPPING from '../utils/classMapping';

import getAirFormData from './useGetAirFormData';
import getLtlPayload from './useGetLtlPayload';

import { useRouter } from '@/packages/next';
import { useRequest } from '@/packages/request';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import getCountryDetails from '@/ui/commons/utils/getCountryDetails';
import getCountryId from '@/ui/commons/utils/getCountryId';

const INDIA_COUNTRY_ID = getCountryId(GLOBAL_CONSTANTS.country_code.IN);
const INCHCUBE_TO_CBM = 61020;

const INDIA_COUNTRY_DETAILS = getCountryDetails({
	country_id: INDIA_COUNTRY_ID,
});

const INDIA_COUNTRY_CODE = INDIA_COUNTRY_DETAILS?.country_code;

const useAir = ({
	extraParams = {},
	airFreightData = {},
	serviceDetails = {},
	detail = {},
	onPush = () => {},
}) => {
	const router = useRouter();

	const { destination_airport = {}, origin_airport = {} } = airFreightData || {};
	const filterArray = Object.values(serviceDetails || {}).filter((element) => (
		['ltl_freight', 'ftl_freight'].includes(element.service_type)));

	let isOriginPincodeChecked = false;
	let isDestinationPincodeChecked = false;
	let origin_pincode = {};
	let destination_pincode = {};
	(filterArray || []).forEach((element) => {
		if (origin_airport?.id === element?.destination_location?.id) {
			isOriginPincodeChecked = true;
			origin_pincode = { ...element?.origin_location };
		}
		if (destination_airport?.id === element?.origin_location?.id) {
			isDestinationPincodeChecked = true;
			destination_pincode = { ...element?.destination_location };
		}
	});

	const [serviceType, setServiceType] = useState('air_international');
	const [onServiceTypeClick, setOnServiceTypeClick] = useState(false);
	const [location, setLocation] = useState(() => ({
		origin                       : { ...origin_airport } || {},
		destination                  : { ...destination_airport } || {},
		origin_pincode               : origin_pincode || {},
		destination_pincode          : destination_pincode || {},
		origin_pincode_checkbox      : isOriginPincodeChecked,
		destination_pincode_checkbox : isDestinationPincodeChecked,
	}));

	const [toggleState, setToggleState] = useState(detail.trade_type || 'export');

	const [formError, setFormError] = useState({
		goods : false,
		load  : false,
		route : {
			origin              : false,
			destination         : false,
			origin_pincode      : false,
			destination_pincode : false,
		},
	});

	const [{ loading }, trigger] = useRequest(
		{
			url    : '/create_spot_search',
			method : 'post',
		},
		{ manual: true },
	);

	const originCountry = location?.origin?.country_code;
	const destinationCountry = location?.destination?.country_code;
	const airFormRef = useRef({});

	useEffect(() => {
		if (isEmpty(location?.origin) && isEmpty(location?.destination)) {
			return;
		}

		if (
			originCountry === INDIA_COUNTRY_CODE
      && destinationCountry === INDIA_COUNTRY_CODE
		) {
			setServiceType('air_domestic');
		} else {
			setServiceType('air_international');
		}

		let object = location;
		if (
			!location?.destination_pincode_checkbox
      && !isEmpty(location?.destination_pincode)
		) {
			object = { ...object, destination_pincode: {} };
		}
		if (
			!location?.origin_pincode_checkbox
      && !isEmpty(location?.origin_pincode)
		) {
			object = { ...object, origin_pincode: {} };
		}
		setLocation({ ...object });
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [JSON.stringify(location)]);

	const getPayload = (airFormData) => {
		const {
			importer_exporter_branch_id = '',
			importer_exporter_id,
			user_id = '',
		} = extraParams || {};

		const { goods = {}, load = {} } = airFormData || {};

		const { values: goodsValues = {} } = goods || {};
		const { commodity_subtype = '' } = goodsValues || {};

		const { incoterms = '', service_name = '' } = goods || {};

		const { perPackagedata = {}, gross = {} } = load || {};

		const {
			class_id = '',
			class_description = '',
			subclass_id = '',
			subclass_codes = [],
		} = CLASS_MAPPING?.[commodity_subtype] || {};

		let totalWeight = 0;
		let totalQuantity = 0;
		let totalVolume = 0;
		let packages = [];

		if (!isEmpty(perPackagedata)) {
			(perPackagedata?.packages || []).forEach((item) => {
				let { length, width, height, weight } = item;
				totalQuantity += Number(item.quantity);

				if (item.weight_unit === 'kg_unit') {
					totalWeight += Number(item.quantity) * Number(item.weight);
				}
				if (item.weight_unit === 'kg_total') {
					totalWeight += Number(item.weight);
					weight /= Number(item?.quantity);
				}
				if (item.weight_unit === 'lb_unit') {
					totalWeight += (Number(item.quantity) * Number(item.weight)) / 2.205;
					weight /= 2.205;
					weight = Math.round(weight * 1000000) / 1000000;
				}
				if (item.weight_unit === 'lb_total') {
					totalWeight += Number(item.weight) / 2.205;
					weight /= 2.205;
					weight = Math.round(weight * 1000000) / 1000000;
					weight /= Number(item?.quantity);
				}

				if (item.dimensions_unit === 'cm') {
					totalVolume
            += (Number(item.length)
              * Number(item.width)
              * Number(item.height)
              * Number(item.quantity))
            / 1000000;
				}

				if (item.dimensions_unit === 'inch') {
					totalVolume
            += (Number(item.length)
              * Number(item.width)
              * Number(item.height)
              * Number(item.quantity))
            / INCHCUBE_TO_CBM;

					length *= 2.54;
					width *= 2.54;
					height *= 2.54;
				}
				if (!item?.weight_unit && !item?.volume_unit) {
					totalWeight += Number(item.weight) * Number(item.quantity);
					totalVolume
            += (Number(item.length)
              * Number(item.width)
              * Number(item.height)
              * Number(item.quantity))
            / 1000000;
				}

				packages = [
					...packages,
					{
						length,
						width,
						height,
						packages_count : Number(item.quantity),
						packing_type   : item.packing_type,
						handling_type  : item.handling_type || 'non_stackable',
						package_weight : weight,
					},
				];
			});
		} else if (!isEmpty(gross)) {
			totalWeight = Number(gross?.total_weight);
			totalQuantity = Number(gross?.total_quantity);
			totalVolume = Number(gross?.gross_volume);

			if (gross?.volume_unit === 'cc') {
				totalVolume = Number(gross?.gross_volume) / 1000000;
				totalVolume = Math.round(totalVolume * 1000) / 1000;
			} else if (gross?.volume_unit === 'cft') {
				totalVolume = Number(gross?.gross_volume) / 35.315;
				totalVolume = Math.round(totalVolume * 1000) / 1000;
			}

			if (gross?.weight_unit === 'lb') {
				totalWeight = Number(gross?.total_weight) / 2.205;
				totalWeight = Math.round(totalWeight * 1000) / 1000;
			}

			packages = [
				{
					packages_count : Number(gross?.total_quantity),
					packing_type   : gross?.package_type,
					handling_type  : gross?.stackability || 'non_stackable',
				},
			];
		}

		const generalCargoTypeValue = serviceType === 'air_domestic' ? 'others' : 'all';

		let commodity_details = [];
		if (goods?.commodity === 'general') {
			commodity_details = [
				{
					commodity_type:
            goods?.values?.commodity_subtype || generalCargoTypeValue,
					packing_list: gross?.packing_list || undefined,
				},
			];
		} else if (
			(goods?.values?.commodity_type || goods?.commodity_type) === 'temp_controlled'
		) {
			const commoditySubTypeArray = goods?.values?.commodity_subtype.split('-');
			const [temp_controlled_type, temp_controlled_range] = commoditySubTypeArray || [];

			commodity_details = [
				{
					commodity_type : goods?.values?.commodity_type || goods?.commodity_type,
					temp_controlled_type,
					temp_controlled_range,
					packing_list   : gross?.packing_list || undefined,
				},
			];
		} else if (
			(goods?.values?.commodity_type || goods?.commodity_type) === 'dangerous'
		) {
			commodity_details = [
				{
					commodity_type  : goods?.values?.commodity_type || goods?.commodity_type,
					commodity_class : {
						class_id,
						class_description,
						subclass_id,
						subclass_codes: subclass_codes.length > 0 ? subclass_codes : undefined,
					},
					packing_list: gross?.packing_list || undefined,
				},
			];
		} else if (
			(goods?.values?.commodity_type || goods?.commodity_type) === 'other_special'
		) {
			commodity_details = [
				{
					commodity_type    : goods?.values?.commodity_type || goods?.commodity_type,
					commodity_subtype : goods?.values?.commodity_subtype,
					packing_list      : gross?.packing_list || undefined,
				},
			];
		}

		const ltl_freight_services_attributes = getLtlPayload({
			location,
			load,
			goods,
		});

		const airPayload = {
			origin_airport_id      : location?.origin?.id,
			destination_airport_id : location?.destination?.id,
			cargo_clearance_date   : goods?.cargoDate,
			commodity              : goods?.commodity,
			commodity_details,
			inco_term              : incoterms || undefined,
			packages,
			packages_count         : totalQuantity,
			weight                 : Math.round(totalWeight * 1000000) / 1000000,
			volume                 : Math.round(totalVolume * 1000000) / 1000000,
			status                 : 'active',
			payment_type           : 'prepaid',
			dry_ice_required       : !isEmpty(goods?.dry_ice_required),
			logistics_service_type : service_name || undefined,
			load_selection_type    : !isEmpty(perPackagedata)
				? 'cargo_per_package'
				: 'cargo_gross',
		};

		return {
			search_type                     : 'air_freight',
			source                          : 'platform',
			importer_exporter_branch_id,
			importer_exporter_id,
			user_id,
			air_freight_services_attributes : [airPayload],
			ltl_freight_services_attributes,
		};
	};

	const isPayloadValid = () => {
		let hasError = false;

		let errorObject = {
			route: {
				origin      : isEmpty(location?.origin),
				destination : isEmpty(location?.destination),
				origin_pincode:
          location?.origin_pincode_checkbox
          && isEmpty(location?.origin_pincode),
				destination_pincode:
          location?.destination_pincode_checkbox
          && isEmpty(location?.destination_pincode),
			},
		};

		hasError = isEmpty(location?.destination)
      || isEmpty(location?.origin)
      || (location?.origin_pincode_checkbox
        && isEmpty(location?.origin_pincode))
      || (location?.destination_pincode_checkbox
        && isEmpty(location?.destination_pincode));

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

	const onClickSearchRates = async () => {
		if (location.origin_pincode_checkbox) {
			if (
				location.origin.country_id !== location.origin_pincode.country_id
				&& !isEmpty(location.origin_pincode.country_id)
			) {
				Toast('origin and pickup location should be in same country');
				return;
			}
		}
		if (location.destination_pincode_checkbox) {
			if (
				location.destination.country_id !== location.destination_pincode.country_id
				&& !isEmpty(location.destination_pincode.country_id)
			) {
				Toast('destination and delivery location should be in same country');
				return;
			}
		}
		if (location.origin.country_code !== INDIA_COUNTRY_CODE
			&& location.destination.country_code !== INDIA_COUNTRY_CODE
		) {
			if (isEmpty(location.origin) && isEmpty(location.destination)
			&& location.origin.country_code === location.destination.country_code
			) {
				Toast(
					'destination airport cannot be in the same country as origin airport',
				);
				return;
			}
		}

		if (location.origin.id === location.destination.id) {
			Toast('Origin and destination cannot be same');
			return;
		}

		try {
			const isValid = isPayloadValid();
			if (!isValid) {
				return;
			}

			const airFormData = getAirFormData({ airFormRef });
			const payload = getPayload(airFormData);

			const response = await trigger({ data: payload });
			const { data = {} } = response || {};

			router.push('/book/[search_id]', `/book/${(data || {}).id}`);

			onPush();
		} catch (error) {
			Toast(error?.data);
		}
	};

	return {
		toggleState,
		setToggleState,
		serviceType,
		setServiceType,
		location,
		setLocation,
		airFormRef,
		onClickSearchRates,
		loading,
		onServiceTypeClick,
		setOnServiceTypeClick,
		formError,
		isOriginPincodeChecked,
		isDestinationPincodeChecked,
	};
};

export default useAir;
