import {
	IcMRequestRate,
	IcMBreakBulkCargoType,
	IcMContractRates,
	IcMTracking,
	IcMCreditRequest,
} from '@cogoport/icons-react';

import CustomLabel from '../common/CustomLabel';

export const fields = [
	{
		label       : 'Name your Quotation',
		name        : 'quotation_name',
		placeholder : 'Type here... ',
		type        : 'text',
		size        : 'md',
		rules       : { required: true },
	},
	{
		name    : 'reason_type',
		type    : 'radio',
		value   : 'comparison',
		options : [
			{
				label: (
					<CustomLabel
						icon={IcMRequestRate}
						title="Rate Comparison"
						subTitle="View and compare multiple rates"
					/>
				),
				value: 'comparison',
			},
			{
				label: (
					<CustomLabel
						icon={IcMBreakBulkCargoType}
						title="Bulk Volume"
						subTitle="Book in volume to get discounts"
					/>
				),
				value: 'bulk_volume',
			},
			{
				label: (
					<CustomLabel
						icon={IcMContractRates}
						title="Long Term Price Stability"
						subTitle="Lock price by creating a contract with us"
					/>
				),
				value: 'long_term',
			},
			{
				label: (
					<CustomLabel
						icon={IcMTracking}
						title="Multi Modal Logistics"
						subTitle="End to End logistics"
					/>
				),
				value: 'multi_modal',
			},
			{
				label: (
					<CustomLabel
						icon={IcMCreditRequest}
						title="Bidding"
						subTitle="Better Rates for Larger Volumes"
					/>
				),
				value: 'bidding',
			},
		],
		rules: { required: 'This field is Required' },
	},
	{
		name    : 'request_type',
		type    : 'radio',
		span    : 12,
		value   : 'manual_entry',
		options : [
			{ label: 'Manual Entry to request', value: 'manual_entry' },
			{ label: 'Upload Excel in cogo format', value: 'cogo_format' },
			{ label: 'Upload Request in any format', value: 'unstructured' },
		],
		rules: { required: 'This field is Required' },
	},
	{
		label   : 'Bidding Date',
		name    : 'bidding_date',
		type    : 'datepicker',
		minDate : new Date(),
		rules   : {
			required: {
				value   : true,
				message : 'Bidding Date is Required',
			},
		},
	},
];
