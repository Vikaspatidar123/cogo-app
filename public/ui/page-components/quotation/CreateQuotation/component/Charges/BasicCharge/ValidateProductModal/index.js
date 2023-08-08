import { Button, Modal } from '@cogoport/components';
import { IcAReports } from '@cogoport/icons-react';
import { isEmpty } from '@cogoport/utils';
import { useState, useEffect } from 'react';

import iconUrl from '../../../../../utils/iconUrl.json';
import useCurrencyConversion from '../../../../hooks/useCurrencyConversion';
import useDraft from '../../../../hooks/useDraft';
import useGetQuoteRes from '../../../../hooks/useGetQuoteRes';
import useListLocation from '../../../../hooks/useListLocation';
import useServiceRates from '../../../../hooks/useServiceRates';
import useValidateModal from '../../../../hooks/useValidateModal';
import createDraftpayload from '../../../../utils/createDraftPayload';
import CheckoutModal from '../CheckoutModal';

import Header from './Header';
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
		createQuoteHook = {},
		editData = {},
	} = props;

	const { country_code } = useSelector((state) => state.profile.organization.country);

	const [servicesSelected, setServiceSelected] = useState({});
	const [showCheckout, setShowCheckout] = useState(false);

	const { postQuotation, loading: quotationLoading, createQuoteData } = createQuoteHook;
	const { refetchDraft, draftLoading } = useDraft();
	const { getExchangeRate, loading: currLoading } = useCurrencyConversion({});
	const { getPortDetails, locationLoading } = useListLocation();
	const {	loading, serviceData } = useServiceRates({ prioritySequence, setValidateProduct });

	const { headerResponse = {}, lineItem: productLineItemDetails = [] } = getDraftData || {};

	const {
		currency, productInfoArr = [],
		product, destinationPortDetails, consignmentValue,
	} = useGetQuoteRes({ quoteRes, getDraftData, editData });

	const { services = {}, currency:serviceCurrency = 'INR' } = serviceData || {};

	const commonLoading = loading
	|| quotationLoading || currLoading || draftLoading || getDraftLoading || locationLoading;

	const { createHeader, createlineItem } = createDraftpayload({
		quoteRes,
		quoteId: createQuoteData?.id,
		getPortDetails,
		country_code,
		consignmentValue,
		productInfoArr,
		servicesSelected,
		editData,
		headerResponse,
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
		if (!isEmpty(productInfoArr) && isEmpty(productLineItemDetails)) {
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
				<Header productLineItemDetails={productLineItemDetails} />

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
						commonLoading={commonLoading}
						productLineItemDetails={productLineItemDetails}
					/>
				))}

				{showCheckout && (
					<CheckoutModal
						showCheckout={showCheckout}
						setShowCheckout={setShowCheckout}
						setValidateProduct={setValidateProduct}
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
						quoteRes={quoteRes}
					/>
				)}

			</Modal.Body>

			<Modal.Footer>
				<Button
					onClick={clickHandler}
					loading={commonLoading}
				>
					{renderButton()}

				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default ValidateProductModal;
