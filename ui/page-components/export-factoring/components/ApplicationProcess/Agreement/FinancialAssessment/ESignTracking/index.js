import styles from './styles.module.css';

import { Image } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';
import FilePreview from '@/ui/page-components/export-factoring/common/FilePreview';

function ESignTracking({ getCreditRequestResponse = {} }) {
	const {
		credit_application_data: { signing_authority_email = {} },
		is_sign_mode_digital = false,
		sample_exportfactoring_agreement = '',
		documents,
	} = getCreditRequestResponse || {};

	const { offer_letter } = documents || {};

	return (
		<div className={styles.container}>
			<div className={styles.image}>
				<Image
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
							{signing_authority_email}
							“
						</div>
					</div>
				)}
				<div className={styles.description}>
					You will start seeing Export Financing limit allocated to you on the
					finance dashboard once the agreement is signed by all.
				</div>
				<div className={styles.preview}>
					<FilePreview name="Document Preview" url={sample_exportfactoring_agreement} />
					<FilePreview name="Offer Letter Preview" url={offer_letter?.active?.document_url} />
				</div>
			</div>
		</div>
	);
}

export default ESignTracking;
