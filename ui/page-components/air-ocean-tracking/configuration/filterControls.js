import { isEmpty } from '@cogoport/utils';

import { getOperatorOptions, getOptions } from '../utils/getOperatorOptions';

const TITLE = {
	ocean : 'Shipping Line',
	air   : 'Cargo Carrier',
};

const getFilterControls = ({
	operatorHash = {}, shippersList = [],
	consigneesList = [], booked_with_cogoport = [], activeTab = 'ocean',
}) => [
	{
		name        : 'operatorId',
		type        : 'multi_select',
		placeholder : `Select ${TITLE[activeTab]}`,
		label       : TITLE[activeTab],
		options     : getOperatorOptions({ operatorHash }),
		show        : !isEmpty(operatorHash),
		size        : 'sm',
		isClearable : true,
	},
	{
		name        : 'shipperId',
		type        : 'multi_select',
		placeholder : 'Select Shipper Name',
		label       : 'Shipper Name',
		options     : getOptions(shippersList),
		show        : !isEmpty(shippersList),
		size        : 'sm',
		isClearable : true,
	},
	{
		name        : 'consigneeId',
		type        : 'multi_select',
		placeholder : 'Select Consignee Name',
		label       : 'Consignee Name',
		options     : getOptions(consigneesList),
		show        : !isEmpty(consigneesList),
		size        : 'sm',
		isClearable : true,
	},
	{
		name    : 'bookWithCogo',
		type    : 'chips',
		label   : 'Shipment Booked',
		options : [{
			key      : 'bookWithCogo',
			children : 'Booked With Cogoport',
		}],
		show: !isEmpty(booked_with_cogoport),
	},
];

export default getFilterControls;
