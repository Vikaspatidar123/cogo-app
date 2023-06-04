import { Tooltip, cl } from '@cogoport/components';

import { ProductCube, ProductBoxIcon } from '../../../../configuration/icon-configuration';

import styles from './styles.module.css';

import formatAmount from '@/ui/commons/utils/formatAmount';

function ProductBox({ watch }) {
	const {
		hsCode = '',
		consignmentValue = '',
		quantity = 0,
		currency = 'INR',
		productName = '',
	} = watch();

	const renderName = (name) => {
		if (name.length > 10) {
			return (
				<Tooltip content={name} theme="light-border" interactive>
					<div>
						{name.substring(0, 10)}
						...
						{name.substring(name.length - 2, name.length)}
					</div>
				</Tooltip>
			);
		}
		return name;
	};

	return (
		<div className={cl`${styles.mobile_view} ${styles.web_view} ${styles.container}`}>
			<div className={styles.row}>
				<div className={styles.flex}>
					<div className={styles.value}>{hsCode}</div>
					<div className={styles.title}>{productName}</div>
				</div>
				<div className={styles.icon}>
					<img src={ProductCube} alt="" width="50px" height="50px" />
				</div>
			</div>
			<div className={cl`${styles.box} ${styles.row}`}>
				<img src={ProductBoxIcon} alt="" width="130px" height="130px" />
			</div>
			<div className={cl`${styles.last_row} ${styles.row}`}>
				<div>
					<div className={styles.title}>Quantity</div>
					<div className={styles.value}>{renderName(quantity)}</div>
				</div>
				<div className={styles.total}>
					<div className={styles.title}>Consignment Value</div>
					<div className={styles.value}>
						{renderName(
							formatAmount({
								amount  : consignmentValue,
								currency,
								options : {
									notation : 'standard',
									style    : 'currency',
								},
							}),
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductBox;
