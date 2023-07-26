import { Carousel } from '@cogoport/components';
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
		<div className={styles.container}>
			<div className={styles.heading}>
				{t('dashboard:onGoingShipments_text_1')}
			</div>
			<Carousel
				slides={carouselData}
				autoScroll
				timeInterval={2000}
				showDots={false}
				showArrow={false}
				size="sm"
				className={styles.carousel}
			/>

			<div
				role="presentation"
				className={styles.bottom}
				onClick={() => push('/shipments', '/shipments')}
			>
				<p className={styles.view_all}>
					{t('dashboard:onGoingShipments_text_1')}
				</p>

				<IcMArrowNext className={styles.arrow} />
			</div>
		</div>

	);
}
export default Shipments;
