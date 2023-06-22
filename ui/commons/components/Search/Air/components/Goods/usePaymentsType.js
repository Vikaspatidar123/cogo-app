/* eslint-disable react-hooks/exhaustive-deps */
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import { useRequest } from '@/packages/request';

const usePaymentType = ({
	inco_term,
	toggleState,
	location,
	setGoodsDetail,
}) => {
	const [options, setOptions] = useState();
	const [{ loading, data }, trigger] = useRequest({
		url    : '/get_air_freight_incoterms',
		method : 'get',
	}, { manual: true });

	const { origin_pincode = {}, destination_pincode = {} } = location || {};

	const pickupRequired = () => {
		if (!isEmpty(origin_pincode)) {
			return true;
		}
		return false;
	};
	const pickup = pickupRequired();

	const deliveryRequired = () => {
		if (!isEmpty(destination_pincode)) {
			return true;
		}
		return false;
	};
	const delivery = deliveryRequired();
	const getAirDomesticIncoterms = async () => {
		await trigger({
			params: {
				payment_type      : 'prepaid',
				pickup_required   : pickup,
				delivery_required : delivery,
				trade_type        : toggleState,
			},
		});
	};
	const setIncoterm = () => {
		const array = [];
		(data || []).forEach((item) => {
			const incotermOptions = { label: item.toUpperCase(), value: item };
			array.push(incotermOptions);
		});

		setOptions(array);

		setGoodsDetail((pv) => ({
			...pv,
			incoterms: inco_term || array?.[0]?.value,
		}));
	};
	useEffect(() => {
		getAirDomesticIncoterms();
	}, [JSON.stringify(location), toggleState]);

	useEffect(() => {
		setIncoterm();
	}, [JSON.stringify(data)]);

	return {
		options,
		data,
		loading,
	};
};

export default usePaymentType;
