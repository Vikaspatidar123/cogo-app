import { Input } from '@cogoport/components';
import { IcMEyeopen, IcMDocument } from '@cogoport/icons-react';

import styles from './styles.module.css';

function DocumentPreview({ getCreditRequestResponse = () => {} }) {
	const { sample_paylater_agreement = '' } = getCreditRequestResponse || {};
	return (

		<div
			className={styles.download}
			onClick={() => window.open(sample_paylater_agreement, '_blank')}
			role="presentation"
		>
			<Input
				suffix={<IcMEyeopen className={styles.icon} />}
				prefix={<IcMDocument />}
				value="Document Preview"
				readonly
				className={styles.download}
			/>
		</div>
	);
}

export default DocumentPreview;
