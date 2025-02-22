import DocumentPreview from './DocumentPreview';
import styles from './styles.module.css';

import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function ESignTracking({ getCreditRequestResponse = {} }) {
	const {
		credit_application_data,
		is_sign_mode_digital = false,
	} = getCreditRequestResponse || {};
	console.log(getCreditRequestResponse, 'aaa');

	return (
		<div className={styles.container}>
			<div className={styles.image}>
				<img
					src={GLOBAL_CONSTANTS.image_url.edit_image}
					width={234}
					height={234}
					alt="animation"
				/>
			</div>
			<div>
				{is_sign_mode_digital && (
					<div className={styles.link}>
						<div>
							An e-sign link is sent to “
							{credit_application_data.signing_authority_email || ''}
							“
						</div>
					</div>
				)}
				<div className={styles.description}>
					You will start seeing Export Financing limit allocated to you on the
					finance dashboard once the agreement is signed by all.
				</div>
				<div className={styles.preview}>
					<DocumentPreview getCreditRequestResponse={getCreditRequestResponse} />
				</div>
			</div>
		</div>
	);
}

export default ESignTracking;
