import { IcMArrowNext } from '@cogoport/icons-react';

import Card from './Card';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Shipments({ list }) {
	const { push } = useRouter();

	return (

		<div className={styles.container}>
			<div className={styles.heading}>
				Your Ongoing Shipments
			</div>
			{list.map((item) => <Card item={item} />)}

			<div className={styles.bottom}>
				<p
					role="presentation"
					className={styles.viewall}
					onClick={() => push('/shipments', '/shipments')}
				>
					View all
				</p>
				<IcMArrowNext className={styles.arrow} />
			</div>
		</div>

	);
}
export default Shipments;
