import { Tooltip } from '@cogoport/components';
import { IcMFileUploader, IcMInfo } from '@cogoport/icons-react';

import styles from '../styles.module.css';
import TradePartyInstructions from '../TradePartyInstructions';

const documentsControls = [
	{
		name       : 'company_existence_proof',
		label      : 'Company Existence Proof',
		type       : 'file',
		drag       : true,
		uploadIcon : () => <IcMFileUploader />,
		span       : 6,
		uploadType : 'aws',
		height     : 45,
		rules      : { required: true },
	},
	{
		name       : 'indemnification',
		label      : 'Indemnification',
		type       : 'file',
		drag       : true,
		uploadIcon : () => <IcMFileUploader />,
		span       : 6,
		uploadType : 'aws',
		height     : 45,
		rules      : { required: true },
	},
	{
		name  : 'verification_document',
		label : (
			<div className={styles.flex}>
				Trade Party Verification document
				<Tooltip
					content={<TradePartyInstructions />}
					placement="top"
					caret={false}
				>
					<div className={styles.image_container}>
						<IcMInfo fill="red" />
					</div>
				</Tooltip>
			</div>
		),
		type       : 'file',
		drag       : true,
		uploadIcon : () => <IcMFileUploader height={30} width={30} />,
		span       : 6,
		uploadType : 'aws',
		height     : 45,
		rules      : { required: true },
	},
];

export default documentsControls;
