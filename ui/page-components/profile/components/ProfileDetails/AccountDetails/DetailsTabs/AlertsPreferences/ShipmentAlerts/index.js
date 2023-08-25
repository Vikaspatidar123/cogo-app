import { IcMArrowBack } from '@cogoport/icons-react';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';

import Header from './components/Header';
import List from './components/List';
import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function ShipmentAlerts() {
	const { query, push } = useRouter();
	const { t } = useTranslation(['settings']);

	const [isEdit, setEdit] = useState(query?.isEdit || false);

	return (
		<div>
			{query.type === 'shipment' ? (
				<div
					role="presentation"
					className={styles.icon}
					onClick={() => push('/shipments')}
				>
					<IcMArrowBack width={20} height={20} />
					{t('settings:back_text')}
				</div>
			) : null}
			<div className={styles.container}>
				<Header isEdit={isEdit} setEdit={setEdit} />
				<List isEdit={isEdit} setEdit={setEdit} />
			</div>
		</div>
	);
}
export default ShipmentAlerts;
