// import ToolTip from '@cogoport/front/components/admin/ToolTip';

import ToolTip from '@cogoport/components';

import Box from '../../../../assets/productBox.svg';
import ProductCube from '../../../../assets/productCube.svg';
import { shortFormatNumber } from '../../../../utils/getShortFormatNumber';

import styles from './styles.module.css';

function ProductBox({ watch, isMobile }) {
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
				<ToolTip content={name} theme="light-border" interactive>
					<div>
						{name.substring(0, 10)}
						...
						{name.substring(name.length - 2, name.length)}
					</div>
				</ToolTip>
			);
		}
		return name;
	};

	return (
		<div className={`${isMobile ? styles.mobile_view : styles.web_view} ${styles.container}`}>
			<div className={styles.row}>
				<div className={styles.flex}>
					<div className={styles.value}>{hsCode}</div>
					<div className={styles.title}>{productName}</div>
				</div>
				<div className={styles.icon}>
					<ProductCube width="50px" height="50px" />
				</div>
			</div>
			<div className={`${styles.box} ${styles.row}`}>
				<Box width="130px" height="130px" />
			</div>
			<div className={`${styles.last_row} ${styles.row}`}>
				<div>
					<div className={styles.title}>Quantity</div>
					<div className={styles.value}>{renderName(quantity)}</div>
				</div>
				<div className={styles.total}>
					<div className={styles.title}>Consignment Value</div>
					<div className={styles.value}>
						{renderName(
							shortFormatNumber(consignmentValue, currency, consignmentValue.length < 6),
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default ProductBox;
