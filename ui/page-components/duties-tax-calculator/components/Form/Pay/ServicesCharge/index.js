import { Tooltip } from '@cogoport/components';
import { IcMInfo } from '@cogoport/icons-react';

import { shortFormatNumber } from '../../../../utils/getShortFormatNumber';

import styles from './styles.module.css';

function ServicesCharge({ formData }) {
	const {
		hsCode, consignmentValue, quantity, currency, productName,
	} = formData || {};

	console.log(productName, 'productName');

	const getProductData = () => (
		<div>
			Product Name:
			{productName}
		</div>
	);
	return (
		<div className={styles.container}>
			<div className={styles.title}>Product Details</div>
			<div className={styles.row}>
				<div className={styles.hscode}>
					<div>{hsCode}</div>
					{productName !== '' && (
						<Tooltip placement="right" content={getProductData()}>
							<div>
								<IcMInfo />
							</div>
						</Tooltip>
					)}
				</div>
				<div className={styles.quantity}>
					Qty:
					{quantity}
				</div>
				<div>{shortFormatNumber(consignmentValue, currency, true)}</div>
			</div>
		</div>
	);
}

export default ServicesCharge;
