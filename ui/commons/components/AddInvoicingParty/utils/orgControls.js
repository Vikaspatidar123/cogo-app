import { Tooltip } from '@cogoport/components';
import { IcMFileUploader, IcMInfo } from '@cogoport/icons-react';

import styles from '../styles.module.css';

import { getPanHolderStatusOptions } from './getPanHolderStatus';

const translationKey =	'common:components.addInvoicingParty.utils.controls.orgControls';

const tradePartyInstructions = ({ t }) => t(
	'common:components.addInvoicingParty.utils.controls.orgControls.trade_party_instructions',
);

const getControls = ({ t = () => {} }) => [
	{
		label          : t(`${translationKey}.country_id.label`),
		name           : 'country_id',
		type           : 'location-select',
		optionsListKey : 'locations',
		params         : { filters: { type: ['country'] } },
		defaultOptions : true,
		style          : {
			flexBasis: '50%',
		},
		rules: {
			required: true,
		},
	},
	{
		name  : 'registration_number',
		type  : 'text',
		style : {
			flexBasis: '50%',
		},
		className: 'uppercase',
	},
	{
		name  : 'business_name',
		label : t(`${translationKey}.business_name.label`),
		type  : 'text',
		style : {
			flexBasis: '50%',
		},
		themeType : 'small',
		rules     : {
			required: true,
		},
	},
	{
		name  : 'company_type',
		label : t(`${translationKey}.company_type.label`),
		type  : 'select',
		caret : true,
		style : {
			flexBasis: '50%',
		},
		isClearable : true,
		options     : getPanHolderStatusOptions({ t }),
		rules       : { required: true },
	},
	{
		name  : 'verification_document',
		label : (
			<div className={styles.control_label}>
				{t(`${translationKey}.verification_document.label`)}
				<Tooltip
					content={tradePartyInstructions({ t })}
					placement="top"
					caret={false}
				>
					<div className={styles.image}>
						<IcMInfo fill="red" />
					</div>
				</Tooltip>
			</div>
		),
		type       : 'file',
		drag       : true,
		uploadIcon : () => <IcMFileUploader height={30} width={30} />,
		style      : {
			flexBasis: '50%',
		},
		uploadType : 'aws',
		height     : 45,
		rules      : { required: 'Please provide verification document' },
	},
];

const getOrgControls = ({ values = {}, t = () => {} }) => {
	const controls = getControls({ t });
	return controls.map((control) => {
		const { name = '' } = control;

		return { ...control, value: values[name] || '' };
	});
};

export default getOrgControls;
