import { Tooltip, Button, Modal } from '@cogoport/components';
import { IcAReports, IcMInfo } from '@cogoport/icons-react';
import { useState, useEffect } from 'react';

import iconUrl from '../../../../../utils/iconUrl.json';
import useCreateQuotation from '../../../../hooks/useCreateQuotation';
import useCurrencyConversion from '../../../../hooks/useCurrencyConversion';
import useDraft from '../../../../hooks/useDraft';
import useListLocation from '../../../../hooks/useListLocation';
import useServiceRates from '../../../../hooks/useServiceRates';
import useValidateModal from '../../../../hooks/useValidateModal';
import createDraftpayload from '../../../../utils/createDraftPayload';
import CheckoutModal from '../CheckoutModal';

import ProductField from './ProductField';
import styles from './styles.module.css';

import { useSelector } from '@/packages/store';

function ValidateProductModal(props) {
	const {
		validateProduct, setValidateProduct,
		isUserSubscribed = false,
		quotaValue,
		isQuotaLeft = false, prioritySequence = 0, quoteRes = {},
		paymentMode,
		getDraftData = {},
		setTransactionModal,
		postTradeEngine,
		getDraftLoading,
	} = props;
	const { country_code } = useSelector((state) => state.profile.organization.country);

	const [servicesSelected, setServiceSelected] = useState({});
	const [showCheckout, setShowCheckout] = useState(false);

	const { product = {}, destinationPortDetails = {}, header } = quoteRes;
	const productInfoArr = product?.products || [];
	const currency = header?.currency;

	const { postQuotation, loading: quotationLoading, createQuoteData } = useCreateQuotation({});
	const { refetchDraft, draftLoading } = useDraft();
	const { getExchangeRate, loading: currLoading } = useCurrencyConversion({});
	const { getPortDetails, locationLoading } = useListLocation();

	const {	loading, serviceData } = useServiceRates({ prioritySequence, setValidateProduct });
	const { services = {}, currency:serviceCurrency = 'INR' } = serviceData || {};
	const { headerResponse = {}, lineItem: productLineItemDetails = [] } = getDraftData;

	const consignmentValue = productInfoArr?.reduce((prev, amount) => +prev + +amount.product_price, 0);

	const { createHeader, createlineItem } = createDraftpayload({
		quoteRes,
		quoteId     : createQuoteData?.id,
		getPortDetails,
		country_code,
		traderCheck : headerResponse?.isScreening,
		consignmentValue,
		productInfoArr,
		servicesSelected,
	});

	const {
		renderTitle, renderButton, deleteProduct, checkBoxChangeHandler, clickHandler, serviceProduct = {}, serviceInfo,
		verifyHandler,
	} = useValidateModal({
		servicesSelected,
		setServiceSelected,
		productInfoArr,
		isUserSubscribed,
		isQuotaLeft,
		setShowCheckout,
		postQuotation,
		quoteRes,
		currency,
		getExchangeRate,
		productLineItemDetails,
		headerResponse,
		refetchDraft,
		createHeader,
		createlineItem,
		postTradeEngine,
		setTransactionModal,
		setValidateProduct,
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
					<h3 className={styles.header}>{renderTitle()}</h3>
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
					quotaValue={quotaValue}
					paymentMode={paymentMode}
					serviceProduct={serviceProduct}
					headerResponse={headerResponse}
					serviceData={serviceData}
					isQuotaLeft={isQuotaLeft}
					productInfoArr={productInfoArr}
					createQuoteData={createQuoteData}
					prioritySequence={prioritySequence}
					createHeader={createHeader}
					createlineItem={createlineItem}
					consignmentValue={consignmentValue}
					postTradeEngine={postTradeEngine}
					setTransactionModal={setTransactionModal}
					locationLoading={locationLoading}
				/>

			</Modal.Body>

			<Modal.Footer>
				<Button
					onClick={clickHandler}
					loading={loading
					|| quotationLoading || currLoading || draftLoading || getDraftLoading || locationLoading}
				>
					{renderButton()}

				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ValidateProductModal;
