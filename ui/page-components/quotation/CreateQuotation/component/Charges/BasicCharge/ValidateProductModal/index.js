import { Tooltip, Button, Modal } from '@cogoport/components';
import { IcAReports, IcMInfo } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import iconUrl from '../../../../../utils/iconUrl.json';
import useCreateQuotation from '../../../../hooks/useCreateQuotation';
import useCurrencyConversion from '../../../../hooks/useCurrencyConversion';
import useServiceRates from '../../../../hooks/useServiceRates';
import useValidateModal from '../../../../hooks/useValidateModal';
import CheckoutModal from '../CheckoutModal';

import ProductField from './ProductField';
import styles from './styles.module.css';

function ValidateProductModal(props) {
	const {
		validateProduct, setValidateProduct,
		isUserSubscribed = false,
		quotaValue,
		isQuotaLeft = false, prioritySequence = 0, quoteRes = {},
		paymentMode,
	} = props;

	const [servicesSelected, setServiceSelected] = useState({});
	const [showCheckout, setShowCheckout] = useState(false);

	const { product = {}, destinationPortDetails = {}, header } = quoteRes;
	const productInfoArr = product?.products || [];
	const currency = header?.currency;

	const { postQuotation, loading: quotationLoading, createQuoteData } = useCreateQuotation({});

	const { getExchangeRate, loading: currLoading } = useCurrencyConversion({});
	const {	loading, serviceData } = useServiceRates({ prioritySequence, setValidateProduct });
	const { services = {}, currency:serviceCurrency = 'INR' } = serviceData || {};

	const {
		renderTitle, renderButton, deleteProduct, checkBoxChangeHandler, clickHandler, serviceProduct = {}, serviceInfo,
		verifyHandler,
	} = useValidateModal({
		servicesSelected,
		setServiceSelected,
		productInfoArr,
		isUserSubscribed,
		setShowCheckout,
		postQuotation,
		quoteRes,
		currency,
		getExchangeRate,
	});

	useEffect(() => {
		if (productInfoArr.length > 0) {
			productInfoArr.forEach(({ productId }) => {
				setServiceSelected((prev) => ({
					...prev,
					[productId]: serviceInfo,
				}));
			});
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [product]);

	return (
		<Modal show={validateProduct} onClose={() => setValidateProduct(false)}>
			<Modal.Header title={(
				<div className={styles.header_container}>
					<IcAReports width={25} height={25} />
					<h3 className={styles.header}>{renderTitle({})}</h3>
				</div>
			)}
			/>

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
						servicesSelected={servicesSelected}
						productInfoArr={productInfoArr}
						deleteProduct={deleteProduct}
						verifyHandler={verifyHandler}
						checkBoxChangeHandler={checkBoxChangeHandler}
					/>
				))}

				<CheckoutModal
					showCheckout={showCheckout}
					setShowCheckout={setShowCheckout}
					quoteRes={quoteRes}
					serviceProduct={serviceProduct}
					paymentMode={paymentMode}
					serviceData={serviceData}
					isQuotaLeft={isQuotaLeft}
					quotaValue={quotaValue}
					productInfoArr={productInfoArr}
					createQuoteData={createQuoteData}
					servicesSelected={servicesSelected}
					prioritySequence={prioritySequence}
				/>

			</Modal.Body>

			<Modal.Footer>
				<Button
					onClick={clickHandler}
					loading={loading || quotationLoading || currLoading}
				>
					{renderButton()}

				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ValidateProductModal;
