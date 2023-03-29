import { startCase } from '@cogoport/utils';

export const possibleStakeholders = {
	supply_agent: {
		name  : 'supply_agent_id',
		label : 'Supply Owner',
	},
	booking_agent: {
		name  : 'booking_agent_id',
		label : 'OKAM',
	},
	service_ops1: {
		name  : 'service_ops1_id',
		label : 'Booking Desk',
	},
	service_ops2: {
		name  : 'service_ops2_id',
		label : 'Document Desk',
	},
	service_ops3: {
		name  : 'service_ops3_id',
		label : 'Service Ops 3',
	},
	sales_agent: {
		name  : 'sales_agent_id',
		label : 'Sales Owner',
	},
	entity_manager: {
		name  : 'entity_manager_id',
		label : 'Entity Manager',
	},
	portfolio_manager: {
		name  : 'portfolio_manager_id',
		label : 'Portfolio Manager',
	},
	lastmile_ops: {
		name  : 'lastmile_ops_id',
		label : 'Last Mile Ops',
	},
};

export const controlsForAddingStakeholder = (shipment_data) => [
	{
		label   : 'Stakeholder type',
		name    : 'stakeholder_type',
		type    : 'select',
		span    : 4,
		options : Object.keys(possibleStakeholders).map((key) => ({
			label : possibleStakeholders[key].label,
			value : key,
		})),
		rules: { required: true },
	},
	{
		label   : 'Service',
		name    : 'service_id',
		type    : 'select',
		span    : 4,
		options : (shipment_data?.all_services || []).map((service) => ({
			label: `${startCase(service.service_type)} ${startCase(
				service.trade_type || '',
			)}`,
			value: service.id,
		})),
	},
];

const controls = (user) => [
	{
		label          : 'Stakeholder name',
		name           : 'stakeholder_id',
		type           : 'select',
		optionsListKey : 'partner-users',
		value          : user?.id,
		valueKey       : 'user_id',
		span           : 4,
		placeholder    : 'Search Stakeholders...',
		rules          : { required: true },
	},
];

export default controls;
