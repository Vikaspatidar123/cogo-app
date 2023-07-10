import { IcMEmail, IcMEyeopen } from '@cogoport/icons-react';
import React from 'react';

import styles from './styles.module.css';

function FilePreview({ name = '', url = '' }) {
	return (
		<div className={styles.container}>
			<div className={styles.offer_pdf_view}>
				<div className={styles.email_text_wrapper}>
					<IcMEmail />
					{name}
				</div>
				<IcMEyeopen onClick={() => window.open(url)} />
			</div>

		</div>
	);
}

export default FilePreview;
