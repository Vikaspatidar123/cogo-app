import { Carousel } from '@cogoport/components';
import { IcMArrowNext } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';

import Card from './Card';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Shipments({ list }) {
	const { push } = useRouter();
	const carouselData = Card({ data: list });
	if (isEmpty(carouselData)) {
		return null;
	}
	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Your Ongoing Shipments
			</div>
			<Carousel
				slides={carouselData}
				autoScroll
				timeInterval={2000}
				showDots
				showArrow={false}
				size="sm"
				className={styles.carousel}
			/>

			<div
				role="presentation"
				className={styles.bottom}
				onClick={() => push('/shipments', '/shipments')}
			>
				<p
					className={styles.viewall}
				>
					View all
				</p>
				<IcMArrowNext className={styles.arrow} />
			</div>
		</div>

	);
}
export default Shipments;
