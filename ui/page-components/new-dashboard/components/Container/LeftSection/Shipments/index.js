import { IcMArrowNext } from '@cogoport/icons-react';

import Card from './Card';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';
import { Carousel } from '@cogoport/components';

function Shipments({ list }) {
	const { push } = useRouter();
	const CAROUSELDATA = Card({ data: list });

	return (
		<div className={styles.container}>
			<div className={styles.heading}>
				Your Ongoing Shipments
			</div>
			<Carousel slides={CAROUSELDATA} autoScroll
				timeInterval={2000} showDots showArrow={false}
				size="sm" className={styles.carousel} />

			<div
				role="presentation"
				className={styles.bottom} onClick={() => push('/shipments', '/shipments')}
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
