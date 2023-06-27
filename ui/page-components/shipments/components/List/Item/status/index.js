import { cl, Button } from '@cogoport/components';

import getText from '../../../../utils/get-text';

import styles from './styles.module.css';

import { useRouter } from '@/packages/next';

function Status({ data, viewAs, isBookingDesk = false }) {
	const router = useRouter();
	const { id } = data || {};

	let shipment_id;
	let service_id;

	if (viewAs === 'importer_exporter') {
		shipment_id = id;
	} else {
		shipment_id = data?.shipment_id || '';
		service_id = data.id || '';
	}
	const impExpHref = '/shipments/[id]';
	const impExpAs = `/shipments/${shipment_id}`;

	const href = viewAs === 'importer_exporter'
		? impExpHref
		: '/shipments/[id]/[service_id]';
	const as =		viewAs === 'importer_exporter'
		? impExpAs
		: `/shipments/${shipment_id}/${service_id}`;

	const stateData = getText(data, [], viewAs, true);

	const buttonText = stateData?.text === 'Added to Cart' ? 'Show' : 'VIEW DETAILS';
	const onBook = () => {
		router.push(href, as);
	};

	return (
		<div className={cl`${styles.container} ${isBookingDesk ? styles.booking_desk : ''}`}>
			<div>
				<div className={styles.message}>
					{'Shipment ID: '}
					<span className={styles.value}>
						{data?.serial_id || data?.shipment_serial_id}
					</span>
				</div>
				<div className={cl`${styles?.alert} ${styles?.[stateData.color] || styles.yellow}`}>
					{stateData.text}
				</div>
			</div>
			<Button onClick={onBook} className={styles.show_button}>
				<div className={styles.action}>{buttonText}</div>
			</Button>
		</div>
	);
}

export default Status;
