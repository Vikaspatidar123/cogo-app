import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function ConsignmentValueInfo() {
	return (
		<div style={{ marginLeft: '4px' }}>
			<Tooltip
				animation="shift-away"
				interactive
				content={
					<div>Consignment Value should not be greater than 5 Crores INR.</div>
				}
			>
				<div>
					<IcMInfo />
				</div>
			</Tooltip>
		</div>
	);
}
const controls = [
	{
		label              : 'Commodity',
		name               : 'cargo_insurance_commodity',
		type               : 'async_select',
		asyncKey           : 'commodities_list_insurance',
		initialCall        : true,
		rules              : { required: true },
		style              : { width: '270px' },
		placeholder        : 'Select Commodity',
		getModifiedOptions : (options) => (options || []).map((x) => ({
			...x,
			value : x.id,
			label : (
				<div style={{ fontSize: '13px' }}>
					<div>{x.commodity}</div>
					<div>
						(
						{x.subCommodity}
						)
					</div>
				</div>
			),
		})),
	},
	{
		name        : 'cargo_insurance_commodity_description',
		label       : 'Commodity Description',
		type        : 'text',
		rules       : { required: true },
		style       : { width: '270px' },
		placeholder : 'Enter Commodity Description',

	},
	{
		name        : 'cargo_value_currency',
		label       : 'Currency',
		type        : 'select',
		optionKey   : 'currencies',
		value       : `${GLOBAL_CONSTANTS.currency_code.USD}`,
		validations : [{ type: 'required', message: 'Currency is required' }],
		style       : { width: '270px' },
		placeholder : 'Select Currency',

	},
	{
		name  : 'cargo_value',
		label : (
			<div style={{ display: 'flex', alignItems: 'center' }}>
				<div>Consignment Value </div>
				<ConsignmentValueInfo />
			</div>
		),
		type        : 'number',
		rules       : { required: true },
		style       : { width: '270px' },
		placeholder : 'Enter Consignment Value',

	},
];
export default controls;
