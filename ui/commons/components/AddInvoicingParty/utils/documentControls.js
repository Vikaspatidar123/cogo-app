import { Tooltip } from '@cogoport/components';
import {
	IcMCloudUpload,
	IcMFileUploader,
	IcMInfo,
} from '@cogoport/icons-react';
import styles from '../styles.module.css';

const translationKey =
	'common:components.addInvoicingParty.utils.controls.documentControls';

const tradePartyInstructions = ({ t }) => {
	return t(
		`common:components.addInvoicingParty.utils.controls.documentControls.trade_party_instructions`,
	);
};

const getControls = ({ t }) => {
	return [
		{
			name: 'company_existence_proof',
			label: t(`${translationKey}.company_existence_proof.label`),
			type: 'file',
			drag: true,
			uploadIcon: () => <IcMCloudUpload width={24} height={24} />,
			style: {
				flexBasis: '100%',
			},
			uploadType: 'aws',
			height: 45,
			rules: { required: true },
		},
		{
			name: 'indemnification',
			label: t(`${translationKey}.indemnification.label`),
			type: 'file',
			drag: true,
			uploadIcon: () => <IcMCloudUpload width={24} height={24} />,
			style: {
				flexBasis: '100%',
			},
			uploadType: 'aws',
			height: 45,
			rules: { required: true },
		},
		{
			name: 'verification_document',
			label: (
				<div className={styles.flex_container}>
					{t(`${translationKey}.verification_document.label`)}
					<Tooltip
						content={tradePartyInstructions({ t })}
						placement="top"
						caret={false}
					>
						<div className={styles.image_container}>
							<IcMInfo fill="red" />
						</div>
					</Tooltip>
				</div>
			),
			type: 'file',
			drag: true,
			uploadIcon: () => <IcMFileUploader height={30} width={30} />,
			style: {
				flexBasis: '100%',
			},
			uploadType: 'aws',
			height: 45,
			rules: { required: true },
		},
	];
};

const getDocumentControls = ({ values = {}, t = () => {} }) => {
	const controls = getControls({ t });
	return controls.map((control) => {
		return { ...control, value: values[control.name] || '' };
	});
};

export default getDocumentControls;
