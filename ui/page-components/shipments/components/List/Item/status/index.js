import getText from '../../../../utils/get-text';

import styles from './styles.module.css';

import { Link } from '@/packages/next';

function Status({ data, viewAs, isBookingDesk = false }) {
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

	return (
		<div className={`${styles.container} ${isBookingDesk ? styles.booking_desk : ''}`}>
			<div className={styles.message}>
				{'Shipment ID: '}
				<span className="value">
					{data?.serial_id || data?.shipment_serial_id}
				</span>
			</div>
			<div className={`${styles?.[alert]} ${styles?.[stateData.color] || styles.yellow}`}>{stateData.text}</div>
			<Link href={href} as={as} passHref>
				<div className={styles.action}>{buttonText}</div>
			</Link>
		</div>
	);
}

Status.defaultProps = { data: {} };

export default Status;
