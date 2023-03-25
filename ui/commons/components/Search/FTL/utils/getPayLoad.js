import { getFormattedData } from '../SearchForm/Load/utils/getFormattedData';
import { getGrossFormattedData } from '../SearchForm/Load/utils/getGrossFormattedData';

const getPayLoad = (ans, typeOfJourney) => {
	const { values } = ans;
	const { route } = values || {};
	const { location } = route || [];

	const { good: goodsDetail = {}, load: loadData = {} } = values;

	const arr = [];

	const gross_data = getGrossFormattedData(loadData);

	const per_package_data = getFormattedData(loadData);

	if (loadData?.active_tab === 'truck') {
		const truck_details = loadData?.truck_details;

		for (let i = 0; i < truck_details.length; i += 1) {
			const subObj = {
				origin_location_id      : location.origin?.id,
				destination_location_id : location.destination?.id,
				commodity:
					goodsDetail.commodity === 'all' ? null : goodsDetail.commodity,
				cargo_readiness_date : goodsDetail.cargoDate,
				trucks_count         : Number(truck_details[i].trucks_count),
				truck_type           : truck_details[i].truck_type,
				trade_type           : 'domestic',
				trip_type            : typeOfJourney,
				status               : 'active',
				load_selection_type  : 'truck',
				packages             : [],
			};

			arr.push(subObj);
		}

		return arr;
	}

	if (loadData?.sub_active_tab === 'gross') {
		const subObj = {
			origin_location_id      : location.origin?.id,
			destination_location_id : location.destination?.id,
			commodity               : goodsDetail.commodity === 'all' ? null : goodsDetail.commodity,
			cargo_readiness_date    : goodsDetail.cargoDate,
			trip_type               : typeOfJourney,
			trade_type              : 'domestic',
			status                  : 'active',
			load_selection_type     : 'cargo_gross',
			weight                  : Number(gross_data.package_weight),
			volume                  : Number(gross_data.volume),

			packages: [
				{
					packing_type   : gross_data.packing_type,
					packages_count : Number(gross_data.packages_count),
					package_weight : Number(gross_data.package_weight),
					height         : Number(gross_data.dimensions.height),
					length         : Number(gross_data.dimensions.length),
					width          : Number(gross_data.dimensions.width),
					handling_type  : gross_data.handling_type,
				},
			],
		};
		arr.push(subObj);
		return arr;
	}

	if (loadData?.sub_active_tab === 'per_package') {
		const packageArr = [];
		let totalVolume = 0;
		let totalWeight = 0;

		for (let i = 0; i < per_package_data.length; i += 1) {
			totalWeight
				+= Number(per_package_data[i].packages_count)
				* Number(per_package_data[i].package_weight);
			totalVolume
				+= Number(per_package_data[i].dimensions.height)
				* Number(per_package_data[i].dimensions.length)
				* Number(per_package_data[i].dimensions.width);
			const subObj1 = {
				packing_type   : per_package_data[i].packing_type,
				packages_count : Number(per_package_data[i].packages_count),
				package_weight : Number(per_package_data[i].package_weight),
				height         : Number(per_package_data[i].dimensions.height),
				length         : Number(per_package_data[i].dimensions.length),
				width          : Number(per_package_data[i].dimensions.width),
				handling_type  : per_package_data[i].handling_type,
			};

			packageArr.push(subObj1);
		}

		const subObj = {
			origin_location_id      : location.origin?.id,
			destination_location_id : location.destination?.id,
			commodity               : goodsDetail.commodity === 'all' ? null : goodsDetail.commodity,
			cargo_readiness_date    : goodsDetail.cargoDate,
			trip_type               : typeOfJourney,
			trade_type              : 'domestic',
			status                  : 'active',
			load_selection_type     : 'cargo_per_package',
			weight                  : totalWeight,
			volume                  : totalVolume,
			packages                : packageArr,
		};

		arr.push(subObj);
		return arr;
	}

	return arr;
};

export default getPayLoad;
