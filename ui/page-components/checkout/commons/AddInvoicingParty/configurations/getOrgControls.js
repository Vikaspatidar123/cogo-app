import { Tooltip } from '@cogoport/components';
import { IcMFileUploader, IcMInfo } from '@cogoport/icons-react';

import styles from '../styles.module.css';
import TradePartyInstructions from '../TradePartyInstructions';
import { getPanHolderStatusOptions } from '../utils/getPanHolderStatus';

const orgControls = [
	{
		label       : 'Country of Registration',
		name        : 'country_id',
		type        : 'async_select',
		asyncKey    : 'locations',
		params      : { filters: { type: ['country'] } },
		initialCall : true,
		rules       : {
			required: 'Country of Registration is Required',
		},
		span: 5.8,
	},
	{
		name      : 'registration_number',
		type      : 'text',
		className : 'uppercase',
		span      : 5.8,
		rules     : {
			required: 'Registration Number is Required',
		},
	},
	{
		name  : 'business_name',
		label : 'Business name',
		type  : 'text',
		span  : 5.8,
		rules : {
			required: 'Business name is Required',
		},
	},
	{
		name        : 'company_type',
		label       : 'Type of Company',
		type        : 'select',
		caret       : true,
		isClearable : true,
		options     : getPanHolderStatusOptions(),
		rules       : { required: 'Type of Company is Required' },
		span        : 5.8,
	},
	{
		name  : 'verification_document',
		label : (
			<div className={styles.div}>
				Trade Party Verification document
				<Tooltip
					content={<TradePartyInstructions />}
					placement="top"
					caret={false}
				>
					<div>
						<IcMInfo className="image" fill="red" />
					</div>
				</Tooltip>
			</div>
		),
		type       : 'file',
		drag       : true,
		uploadIcon : () => <IcMFileUploader height={30} width={30} />,
		span       : 5.8,
		height     : 45,
		rules      : { required: 'Trade Party document is Required' },
	},
];

const additionalOrgControls = [
	// {
	// 	name: 'tds_deduction_type',
	// 	label: 'TDS Type',
	// 	type: 'select',
	// 	caret: true,
	// 	span: 4,
	// 	options: [
	// 		{ value: 'normal', label: 'Normal' },
	// 		{ value: 'no_deduction', label: 'No Deduction' },
	// 		{ value: 'lower_deduction', label: 'Lower Deduction' },
	// 	],
	// 	multiple: false,
	// 	placeholder: 'Select TDS Type',
	// 	rules: { required: true },
	// },
	// {
	// 	name: 'tds_deduction_style',
	// 	label: 'TDS Style',
	// 	type: 'select',
	// 	caret: true,
	// 	span: 4,
	// 	options: [
	// 		{ value: 'gross', label: 'Gross' },
	// 		{ value: 'net', label: 'Net' },
	// 		{ value: 'exempt', label: 'Exempt' },
	// 	],
	// 	multiple: false,
	// 	placeholder: 'Select TDS Style',
	// 	rules: { required: true },
	// },
	// {
	// 	name: 'tds_deduction_rate',
	// 	label: 'TDS Rate (%)',
	// 	span: 4,
	// 	type: 'number',
	// 	placeholder: 0,
	// 	rules: { required: '% is required', min: 0, max: 40 },
	// },
	// {
	// 	name: 'tds_certificate',
	// 	label: 'Tds Certificate',
	// 	type: 'file',
	// 	drag: true,
	// 	span: 12,
	// 	uploadType: 'aws',
	// 	height: 45,
	// 	uploadIcon: () => <UploadIconSvg size={2} />,
	// },
	// {
	// 	name: 'tds_certificate_number',
	// 	label: 'TDS Certificate No.',
	// 	type: 'text',
	// 	span: 4,
	// 	placeholder: 'XXXXXXXXXXX',
	// },
	// {
	// 	name: 'tds_certificate_start_date',
	// 	label: 'TDS Certificate Start Date',
	// 	type: 'datepicker',
	// 	span: 4,
	// },
	// {
	// 	name: 'tds_certificate_end_date',
	// 	label: 'TDS Certificate End Date',
	// 	type: 'datepicker',
	// 	span: 4,
	// },
];
export { orgControls, additionalOrgControls };
