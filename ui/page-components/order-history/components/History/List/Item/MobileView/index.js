import { Placeholder } from '@cogoport/components';

import styles from './styles.module.css';

function MobileView({
	fields, infoData = () => {}, itm, loading = false,
}) {
	const Mapping = {
		orderNumber : 'Order Number',
		requestType : 'Request Type',
		orderDate   : 'Order Date',
		status      : 'Status',
		paymentType : 'Payment Type',
	};
	const data = {};
	fields.forEach((singleItem) => {
		data[singleItem?.key || 'action'] = singleItem;
	});
	return (
		<div className={styles.container}>
			{loading ? (
				<>
					{[...Array(5).keys()].map(() => (
						<div className={styles.div}>
							<div className={styles.label}>
								<Placeholder height="20px" width="80px" />
							</div>
							<div className={styles.value}>
								<Placeholder height="20px" width="200px" />
							</div>
						</div>
					))}
				</>
			) : (
				<>
					{(Object.keys(data) || []).map((suffix) => (
						<>
							{suffix !== 'dot' && (
								<div className={styles.flex}>
									<div className={`_${styles.div} ${styles.column}`}>
										<div className={styles.label}>{Mapping[suffix]}</div>
										<div className={styles.value}>{infoData(data[suffix], itm)}</div>
									</div>
								</div>
							)}
							{suffix === 'dot' && (
								<div className={styles.flex}>
									<div className={`_${styles.div} ${styles.column}`}>
										<div className={styles.value}>{infoData(data[suffix], itm)}</div>
									</div>
								</div>
							)}
						</>
					))}
				</>
			)}
		</div>
	);
}
export default MobileView;
