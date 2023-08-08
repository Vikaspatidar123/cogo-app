import { IcMArrowNext } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useTranslation } from 'next-i18next';

import LoaderPage from '../../common/LoaderPage';
import ListShipments from '../../hooks/ListShipments';

import OnGoingShipmentsCard from './OnGoingShipmentsCard';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Shipments() {
	const { push } = useRouter();
	const { t } = useTranslation(['dashboard']);

	const { loading, data } = ListShipments();

	const shipmentsData = data?.list || [];

	if (loading) {
		return (
			<div className={styles.header}>
				<LoaderPage skeletonCount={2} />
			</div>
		);
	}
	return (
		<div>
			{!isEmpty(shipmentsData) && (
				<div className={styles.header}>
					<div className={styles.heading}>{t('dashboard:onGoingShipments_text_1')}</div>
					{(shipmentsData || []).map((item) => (
						<OnGoingShipmentsCard
							key={item.id}
							{...item}
							data={data}
						/>
					))}
					<div className={styles.bottom}>
						<p
							role="presentation"
							className={styles.viewall}
							onClick={() => push('/shipments', '/shipments')}
						>
							{t('dashboard:onGoingShipments_text_2')}
						</p>
						<IcMArrowNext className={styles.arrow} />
					</div>
				</div>
			)}
		</div>
	);
}
export default Shipments;
