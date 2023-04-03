import { isEmpty, getByKey } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import {
	arrivalDeparture,
	paymentTerm,
	pricesRange,
	scheduleType,
	shippingLine,
} from '../utils/getHandleFilterFunction';
import {
	basicFreightHighToLow,
	basicFreightLowToHigh,
	detentionFreeLimitHighToLow,
	detentionFreeLimitLowToHigh,
	transitTimeLowToHigh,
	transitTimeHighToLow,
	totalFreightHighToLow,
	totalFreightLowToHigh,
} from '../utils/getHandleSortFunctions';

import getSearch from './useGetSearch';

import showErrorsInToast from '@/ui/commons/utils/showErrorsInToast';

const filteredItem = ({ rateCard, filters }) => {
	const checkerArray = [];
	Object.keys(filters).forEach((key) => {
		checkerArray.push(FILTER_MAPPING[key]({ rateCard, key, filters }));
	});
	if (checkerArray.includes(false)) {
		return false;
	}
	return true;
};

const createOptions = ({ ratesObject = [] }) => {
	const options = [];
	ratesObject.forEach((rateCard) => {
		options.push({
			label : rateCard?.shipping_line?.short_name,
			value : rateCard?.shipping_line?.id,
		});
	});
	return options;
};

const priceMinMax = ({ ratesObject }) => {
	let min = 0;
	let max = 0;
	ratesObject.forEach((rateCard, index) => {
		const a_total_price_discounted = getByKey(
			rateCard,
			'freight_price_discounted',
		);
		if (index === 0) {
			min = a_total_price_discounted;
			max = a_total_price_discounted;
		}
		if (min >= a_total_price_discounted) {
			min = a_total_price_discounted;
		}
		if (max < a_total_price_discounted) {
			max = a_total_price_discounted;
		}
	});

	return { min, max };
};

const HANDLE_SORT_MAPPING = {
	basic_freight_low_to_high          : basicFreightLowToHigh,
	basic_freight_high_to_low          : basicFreightHighToLow,
	transit_time_low_to_high           : transitTimeLowToHigh,
	transit_time_high_to_low           : transitTimeHighToLow,
	detention_free_limit_low_to_high   : detentionFreeLimitLowToHigh,
	detention_free_limit_high_to_low   : detentionFreeLimitHighToLow,
	total_price_discounted_high_to_low : totalFreightHighToLow,
	total_price_discounted_low_to_high : totalFreightLowToHigh,
};

const FILTER_MAPPING = {
	arrival          : arrivalDeparture,
	departure        : arrivalDeparture,
	price_range      : pricesRange,
	shipping_line_id : shippingLine,
	payment_term     : paymentTerm,
	schedule_type    : scheduleType,
};

const getResultsState = (id, extraParams = {}) => {
	const [state, setState] = useState({
		services                     : ['freight'],
		offers                       : [],
		loading                      : true,
		headerData                   : {},
		invoice                      : {},
		views                        : 0,
		error                        : null,
		sort                         : 'basic_freight_low_to_high',
		filters                      : { shipping_line_id: '' },
		lowestRate                   : {},
		currencyConversions          : {},
		rates                        : [],
		possible_subsidiary_services : [],
		ratesOriginalList            : [],
		shippingLineOptions          : [],
		priceRange                   : {},
		response                     : {},
	});

	const handleSort = (list, sortByKey = state.sort) => {
		let sorted_list = list;

		if (sortByKey in HANDLE_SORT_MAPPING) {
			sorted_list = HANDLE_SORT_MAPPING[sortByKey]({ list });
		}

		sorted_list.forEach(
			(item, index) => item.source === 'cogo_assured_rate'
        && sorted_list.unshift(sorted_list.splice(index, 1)[0]),
		);

		return [
			...sorted_list?.filter(
				(item) => item?.source === 'spot_negotiation_rate',
			),
			...sorted_list?.filter(
				(item) => item?.source !== 'spot_negotiation_rate',
			),
		];
	};

	const handleFilter = (list, filters = {}) => {
		const sorted_list = [];
		if (isEmpty(filters)) {
			return list;
		}
		list.forEach((rateCard) => {
			if (filteredItem({ rateCard, filters })) {
				sorted_list.push(rateCard);
			}
		});

		sorted_list.forEach(
			(item, index) => item.source === 'cogo_assured_rate'
        && sorted_list.unshift(sorted_list.splice(index, 1)[0]),
		);

		return [
			...sorted_list?.filter(
				(item) => item?.source === 'spot_negotiation_rate',
			),
			...sorted_list?.filter(
				(item) => item?.source !== 'spot_negotiation_rate',
			),
		];
	};

	const setSort = (sortByKey) => {
		const rates = [...state.rates];

		setState({
			...state,
			sort  : sortByKey,
			rates : handleSort(rates, sortByKey),
		});
	};

	const setFilters = (filters) => {
		const ratesOriginalList = [...state.ratesOriginalList];

		setState({
			...state,
			filters,
			rates: handleFilter(ratesOriginalList, filters),
		});
	};

	const getResults = () => {
		getSearch({ id, intent: 'discovery', ...(extraParams || {}) })
			.then((response) => {
				const data = response.data || {};

				const ratesObject = data.rates || {};

				const packages = handleSort(ratesObject || []);

				const priceRange = priceMinMax({ ratesObject });

				const shippingLineOptions = createOptions({ ratesObject });

				setState({
					error             : null,
					rates             : !isEmpty(packages) ? packages : ratesObject,
					ratesOriginalList : ratesObject,
					possible_subsidiary_services:
            response?.data?.possible_subsidiary_services || [],
					views               : data.views_count,
					services            : (data.detail || {}).services || [],
					lowestRate          : ratesObject.lowest_rate || {},
					currencyConversions : data.currency_conversions || {},
					offers              : data.offers || [],
					invoice             : data.invoice || {},
					loading             : false,
					headerData          : data.detail || {},
					sort                : state.sort,
					searchData          : data,
					shippingLineOptions,
					priceRange,
					response            : response.data,
				});
			})
			.catch((e) => {
				showErrorsInToast(e);
				setState({
					...state,
					loading : false,
					error   : e,
				});
			});
	};

	useEffect(() => {
		getResults();
	}, []);

	const refetch = (isSetLoading = false) => {
		setState((prevState) => ({
			...prevState,
			loading: isSetLoading ? true : prevState.loading,
		}));
		getResults();
	};

	return {
		state,
		...state,
		refetch,
		setSort,
		setState,
		setFilters,
	};
};

export default getResultsState;
