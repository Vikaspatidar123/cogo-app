import CLASS_MAPPING from '../configurations/SearchFormControls/air-class-mapping';
import COMMODITY_SUBTYPE_CODE_MAPPING from '../configurations/SearchFormControls/air-commodity-subtype-mapping';

const getCommodityMapping = ({
	commodity_type,
	commodity_subtype,
	packing_list = '',
}) => {
	const commodity =		commodity_type === 'general' ? 'general' : 'special_consideration';

	const {
		class_id = '',
		class_description = '',
		subclass_id = '',
		subclass_codes = [],
	} = CLASS_MAPPING?.[commodity_subtype] || {};

	let commodity_details = [];
	if (commodity === 'general') {
		commodity_details = [
			{
				commodity_type : commodity_subtype || commodity,
				packing_list   : packing_list || undefined,
			},
		];
	} else if (commodity_type === 'temp_controlled') {
		const commoditySubTypeArray = commodity_subtype.split('-');
		const [temp_controlled_type, temp_controlled_range] =			commoditySubTypeArray || [];

		commodity_details = [
			{
				commodity_type,
				temp_controlled_type,
				temp_controlled_range,
			},
		];
	} else if (commodity_type === 'dangerous') {
		commodity_details = [
			{
				commodity_type,
				commodity_class: {
					class_id,
					class_description,
					subclass_id,
					subclass_codes:
						subclass_codes.length > 0 ? subclass_codes : undefined,
				},
			},
		];
	} else if (commodity_type === 'other_special') {
		commodity_details = [
			{
				commodity_type,
				commodity_subtype,
				commodity_subtype_code:
					COMMODITY_SUBTYPE_CODE_MAPPING?.[commodity_subtype],
			},
		];
	}

	return { commodity, commodity_details };
};

export default getCommodityMapping;
