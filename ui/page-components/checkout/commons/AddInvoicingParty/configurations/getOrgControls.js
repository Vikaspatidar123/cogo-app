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

export default orgControls;
