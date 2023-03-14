import { Tooltip, Button, Modal } from '@cogoport/components';
import { IcAReports, IcMInfo } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import iconUrl from '../../../../../utils/iconUrl.json';
import useServiceRates from '../../../../hooks/useServiceRates';

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
const serviceInfo = {
	duties_and_taxes        : true,
	import_export_documents : false,
	import_export_controls  : false,
};

function ValidateProductModal(props) {
	const {
		validateProduct, setValidateProduct,
		isUserSubscribed = false,
		// quotaValue,
		isQuotaLeft = false, prioritySequence = 0, quoteRes = {},
	} = props;

	const [servicesSelected, setServiceSelected] = useState({});

	const { product = {}, destinationPortDetails = {} } = quoteRes;
	const productInfoArr = product?.products || [];
	const {	loading, serviceData } = useServiceRates({ prioritySequence, setValidateProduct });
	const { services = {}, currency:serviceCurrency = 'INR' } = serviceData || {};

	const deleteProduct = (id, index) => {
		const serviceArr = Object.keys(servicesSelected).filter((productId) => productId !== id);
		const newService = {};
		serviceArr.forEach((productId) => { newService[productId] = servicesSelected[productId]; });

		setServiceSelected(newService);
		productInfoArr.splice(index, 1);
	};

	useEffect(() => {
		if (productInfoArr.length > 0) {
			productInfoArr.forEach(({ productId }) => {
				servicesSelected[productId] = serviceInfo;
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [product]);

	return (
		<Modal show={validateProduct} onClose={() => setValidateProduct(false)}>
			<Modal.Header title={renderTitle({ isUserSubscribed })} />
			<Modal.Body>
				{loading && (
					<div className={styles.loading_container}>
						<img src={iconUrl.loading} alt="loading..." className={styles.cogoloader} />
						<div className={styles.modal} />
					</div>
				)}

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

				{(productInfoArr || []).map((productInfo, index) => (
					<ProductField
						key={productInfo?.productId}
						index={index}
						services={services}
						serviceCurrency={serviceCurrency}
						isUserSubscribed={isUserSubscribed}
						isQuotaLeft={isQuotaLeft}
						destinationPortDetails={destinationPortDetails}
						productInfo={productInfo}
						deleteProduct={deleteProduct}
						servicesSelected={servicesSelected}
						setServiceSelected={setServiceSelected}
						productInfoArr={productInfoArr}
					/>
				))}

			</Modal.Body>
			<Modal.Footer>
				<Button>{renderButton()}</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ValidateProductModal;
