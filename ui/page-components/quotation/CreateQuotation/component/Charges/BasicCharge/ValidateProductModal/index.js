import { Tooltip, Button, Modal } from '@cogoport/components';
import { IcAReports, IcMInfo } from '@cogoport/icons-react';

import ProductField from './ProductField';
import styles from './styles.module.css';

const renderTitle = ({ isUserSubscribed, lineItemLength = 0 }) => {
	const getTitle = () => {
		if (!isUserSubscribed && lineItemLength > 0) return 'Validate HS Code';
		if (!isUserSubscribed && lineItemLength === 0) return 'Services Details';
		return 'Get Accurate Data';
	};
	return (
		<div className={styles.header_container}>
			<IcAReports width={25} height={25} />
			<h3 className={styles.header}>{getTitle()}</h3>
		</div>
	);
};

const renderButton = (isUserSubscribed) => {
	if (isUserSubscribed) return 'Get Premium services';
	return 'Proceed to Checkout';
};

function ValidateProductModal(props) {
	const { isUserSubscribed = false, validateProduct, setValidateProduct } = props;
	return (
		<Modal show={validateProduct} onClose={() => setValidateProduct(false)}>
			<Modal.Header title={renderTitle({ isUserSubscribed })} />
			<Modal.Body>
				<div className={styles.title_container}>
					<div>
						<p className={styles.title}>Validate HS Code details</p>
						<div className={styles.line} />
					</div>
					<Tooltip
						placement="right-start"
						content={(
							<div style={{ fontSize: '12px' }}>
								To fetch accurate information, we need to re-validate your cargo and
								HS code information.
							</div>
						)}
						interactive
					>
						<IcMInfo height={13} width={13} fill="#F68B21" />
					</Tooltip>
				</div>
				<ProductField />
			</Modal.Body>
			<Modal.Footer>
				<Button>{renderButton()}</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ValidateProductModal;
