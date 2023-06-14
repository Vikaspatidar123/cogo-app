import { isEmpty } from '@cogoport/utils';

import CLASS_MAPPING from '../utils/classMapping';

const getLtlPayload = ({ location, load, goods }) => {
	const { perPackagedata = {}, gross = {} } = load || {};

	let totalWeight = 0;
	let packages = [];
	let volume = 0;
	if (!isEmpty(perPackagedata)) {
		(perPackagedata?.packages || []).forEach((item) => {
			const { weight } = item;
			const { length, width, height } = item;
			let len = length;
			let wid = width;
			let hei = height;
			let wei = weight;

			if (item.weight_unit === 'kg_unit') {
				totalWeight += Number(item.quantity) * Number(wei);
			}
			if (item?.weight_unit === 'kg_total') {
				totalWeight += Number(wei);
			}
			if (item?.weight_unit === 'lb_unit') {
				totalWeight += (Number(item.quantity) * Number(wei)) / 2.205;
				wei /= 2.205;
				wei = Math.round(weight * 1000) / 1000;
			}
			if (item?.weight_unit === 'lb_total') {
				totalWeight += Number(wei) / 2.205;
				wei /= 2.205 * Number(item.quantity);
				wei = Math.round(weight * 1000) / 1000;
			}

			totalWeight = Math.round(totalWeight * 1000000) / 1000000;

			if (item?.dimensions_unit === 'inch') {
				len = length * 2.54;
				wid = width * 2.54;
				hei = height * 2.54;
			}

			volume
				+= (Number(len) * Number(wid) * Number(hei) * Number(item.quantity))
				/ 1000000;

			volume = Math.round(volume * 1000000) / 1000000;

			packages = [
				...packages,
				{
					length         : Number(len),
					width          : Number(wid),
					height         : Number(hei),
					packages_count : Number(item.quantity),
					packing_type   : item.packing_type,
					package_weight : Number(weight),
					handling_type  : item.handling_type || 'non_stackable',
				},
			];
		});
	} else if (!isEmpty(gross)) {
		totalWeight = Number(gross?.total_weight);
		volume = Number(gross?.gross_volume || 0);

		if (gross?.volume_unit === 'cc') {
			volume = Number(gross?.gross_volume) / 1000000;
			volume = Math.round(volume * 1000) / 1000;
		} else if (gross?.volume_unit === 'cft') {
			volume = Number(gross?.gross_volume) / 35.315;
			volume = Math.round(volume * 1000) / 1000;
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
				package_weight : totalWeight,
				height         : 34,
				length         : 44,
				width          : 55,
			},
		];
	}
	const { values: goodsValues = {} } = goods || {};
	const { commodity_class = '' } = goodsValues || {};

	const { commodity = '' } = CLASS_MAPPING?.[commodity_class] || {};

	let ltlCommodity = '';
	if (goods?.commodity === 'general') {
		if (goods?.values?.commodity_subtype === 'machinery') {
			ltlCommodity = 'equipments_plant_machinery';
		} else {
			ltlCommodity = '';
		}
	} else if (
		(goods?.commodity_type || goods?.values?.commodity_type) === 'dangerous'
	) {
		ltlCommodity = commodity;
	} else if (
		(goods?.commodity_type || goods?.values?.commodity_type)
		=== 'temp_controlled'
	) {
		ltlCommodity = 'temp_controlled';
	} else if (
		(goods?.commodity_type || goods?.values?.commodity_type) === 'other_special'
	) {
		ltlCommodity = '';
	}

	if (
		!location?.origin_pincode_checkbox
		&& !location?.destination_pincode_checkbox
	) { return undefined; }
	if (
		!location?.origin_pincode_checkbox
		&& location?.destination_pincode_checkbox
	) {
		return [
			{
				origin_location_id      : location?.destination?.id,
				destination_location_id : location?.destination_pincode?.id,
				weight                  : totalWeight,
				status                  : 'active',
				packages,
				volume,
				trade_type              : 'import',
				load_selection_type     : !isEmpty(perPackagedata)
					? 'cargo_per_package'
					: 'cargo_gross',
				commodity: ltlCommodity,
			},
		];
	}
	if (
		location?.origin_pincode_checkbox
		&& !location?.destination_pincode_checkbox
	) {
		return [
			{
				origin_location_id      : location?.origin_pincode?.id,
				destination_location_id : location?.origin?.id,
				weight                  : totalWeight,
				status                  : 'active',
				packages,
				volume,
				trade_type              : 'export',
				load_selection_type     : !isEmpty(perPackagedata)
					? 'cargo_per_package'
					: 'cargo_gross',
				commodity: ltlCommodity,
			},
		];
	}
	return [
		{
			origin_location_id      : location?.origin_pincode?.id,
			destination_location_id : location?.origin?.id,
			weight                  : totalWeight,
			status                  : 'active',
			packages,
			volume,
			trade_type              : 'export',
			load_selection_type     : !isEmpty(perPackagedata)
				? 'cargo_per_package'
				: 'cargo_gross',
			commodity: ltlCommodity,
		},
		{
			origin_location_id      : location?.destination?.id,
			destination_location_id : location?.destination_pincode?.id,
			weight                  : totalWeight,
			status                  : 'active',
			packages,
			volume,
			trade_type              : 'import',
			load_selection_type     : !isEmpty(perPackagedata)
				? 'cargo_per_package'
				: 'cargo_gross',
			commodity: ltlCommodity,
		},
	];
};

export default getLtlPayload;
