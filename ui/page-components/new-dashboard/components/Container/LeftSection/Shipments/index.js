import { Carousel, cl } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import card from './Card';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Shipments({ list }) {
	const { push } = useRouter();

	const { t } = useTranslation(['dashboard']);

	const carouselData = card({ data: list });

	if (isEmpty(carouselData)) {
		return null;
	}
	return (
		<div>
			<div className={styles.head_box}>
				<div className={styles.heading}>
					{t('dashboard:onGoingShipments_text_1')}
				</div>
				<div
					role="presentation"
					className={cl`${styles.bottom} ${styles.view_all}`}
					onClick={() => push('/shipments', '/shipments')}
				>
					<p>
						{t('dashboard:onGoingShipments_text_1')}
					</p>

					<IcMArrowNext className={styles.arrow} />
				</div>
			</div>
			<Carousel
				slides={carouselData}
				autoScroll
				timeInterval={5000}
				showDots
				showArrow={false}
				size="sm"
				className={styles.carousel}
			/>

		</div>

	);
}
export default Shipments;
