import { Carousel, cl, Button } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import card from './Card';
import CreateShipment from './CreateShipment';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Shipments({ list }) {
	const { push } = useRouter();

	const { t } = useTranslation(['dashboard']);

	const carouselData = card({ data: list });

	if (isEmpty(carouselData)) {
		return <CreateShipment />;
	}
	return (
		<div className={styles.container}>
			<div className={styles.head_box}>
				<div className={styles.heading}>
					{t('dashboard:onGoingShipments_text_1')}
				</div>

				<Button
					className={cl`${styles.bottom} ${styles.view_all}`}
					onClick={() => push('/shipments', '/shipments')}
					size="md"
					themeType="linkUi"
					type="button"
				>
					{t('dashboard:onGoingShipments_text_1')}
					<IcMArrowNext className={styles.arrow} />
				</Button>

			</div>
			<Carousel
				slides={carouselData}
				autoScroll
				timeInterval={5000}
				size="sm"
				showDots={false}
				className={styles.carousel}
			/>

		</div>

	);
}
export default Shipments;
