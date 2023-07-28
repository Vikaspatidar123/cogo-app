import { IcMArrowNext } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';

import styles from './styles.module.css';

import { Image, useRouter } from '@/packages/next';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals';

function CreateShipment() {
	const { push } = useRouter();

	const { t } = useTranslation(['dashboard']);

	return (
		<div
			role="presentation"
			className={styles.container}
			onClick={() => push('/book')}
		>
			<div className={styles.head_box}>
				<div className={styles.heading}>
					{t('dashboard:shipment_create_title_text')}
				</div>
				<IcMArrowNext className={styles.arrow} />

			</div>
			<Image
				src={GLOBAL_CONSTANTS.image_url.ocean_empty_state}
				alt="shipment"
				width={400}
				height={260}
			/>
		</div>
	);
}
export default CreateShipment;
