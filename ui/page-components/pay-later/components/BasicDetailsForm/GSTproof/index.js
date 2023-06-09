import { Button } from '@cogoport/components';
import { IcMFtick, IcMTick } from '@cogoport/icons-react';

import useCreateOrganizationCreditRequest from '../../../hooks/useCreateOrganizationCreditRequest';

import styles from './styles.module.css';

function GSTproof({ item = {}, documentDetails = '', clearDocumentDetails = () => {}, handleSubmit = () => {} }) {
	const { image_url = '' } = documentDetails || {};

	const { createOrganizationCreditRequest = () => {} } = useCreateOrganizationCreditRequest();

	const submit = (values) => {
		createOrganizationCreditRequest({ image_url, values });
	};

	if (item.name === 'gst_proof' && image_url) {
		return 	(
			<div className={styles.file_container}>
				<div className={styles.file}>
					<img
						src={image_url}
						height="100%"
						width="100%"
						alt="proof"
					/>
				</div>
				<div className={styles.details}>
					<div>
						<div className={styles.detail}>
							<IcMFtick fill="#849E4C" width={14} height={14} />
							{' '}
							name
						</div>
						<div className={styles.detail}>
							<IcMFtick fill="#849E4C" width={14} height={14} />
							{' '}
							gst number
						</div>
						<div className={styles.detail}>
							<IcMFtick fill="#849E4C" width={14} height={14} />
							{' '}
							addresss
						</div>
					</div>

					<div className={styles.button_wrapper}>
						<Button
							className={styles.cancel}
							themeType="secondary"
							size="sm"
							onClick={clearDocumentDetails}
						>
							Upload New
						</Button>
						<Button themeType="accent" size="sm" onClick={handleSubmit(submit)}>
							<IcMTick />
							Confirm
						</Button>
					</div>
				</div>
			</div>

		);
	}
	return null;
}

export default GSTproof;
