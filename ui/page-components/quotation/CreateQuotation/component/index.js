import { Button } from '@cogoport/components';
import { useState, useRef, forwardRef, useEffect } from 'react';

import iconUrl from '../../utils/iconUrl.json';
import headerFields from '../configuration/headerControls';
import useCreateQuotation from '../hooks/useCreateQuotation';
import useCurrencyConversion from '../hooks/useCurrencyConversion';
import useEditQuotation from '../hooks/useEditQuotation';
import useRecentSearch from '../hooks/useRecentSearch';
import useSendQuotation from '../hooks/useSendQuotation';
import getHandleSubmitData from '../utils/getHandleSubmitdata';
import setExpiryDate from '../utils/setExpiryDate';

import AllDetails from './AllDetails';
import Charges from './Charges';
import ConfirmationModal from './ConfirmationModal';
import Header from './Header';
import OptSelector from './OptSelector';
import ProductDetails from './ProductDetails';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import { useRouter } from '@/packages/next';
import { useSelector } from '@/packages/store';

function CreateQuotation() {
	const { id, organization } = useSelector((state) => state?.profile);
	const { query } = useRouter();

	const [transportMode, setTransportMode] = useState('OCEAN');
	const [confirmCreateQuotation, setConfirmCreateQuotation] = useState(false);
	const [consignmentValue, setConsignmentValue] = useState();

	const { sendQuotation, sendQuoteLoading, sendQuotedata } = useSendQuotation();
	const spotSearchData = useRecentSearch({ query, setTransportMode });
	const createQuoteHook = useCreateQuotation({ setConfirmCreateQuotation });
	const { postQuotation, loading, createQuoteData } = createQuoteHook || {};

	const orgCurrency = organization?.country?.currency_code;

	const {
		control: headerControls,
		handleSubmit: headerHandleSubmit,
		formState: { errors: headerError },
		setValue,
		watch,
	} = useForm({
		defaultValues: {
			currency   : orgCurrency,
			expiryDate : setExpiryDate(),
		},
	});
	const { editData = {}, editLoading = false } = useEditQuotation({ setValue, setTransportMode });

	const [watchCurrency, date] = watch(['currency', 'expiryDate']);

	const quoteRef = useRef({ date });

	useEffect(() => {
		quoteRef.current.date = date;
	}, [date]);

	useEffect(() => {
		if (editData?.saasPartnerId) {
			const { transportMode: editTransport, saasPartnerId, expiryDate, currency } = editData || {};
			setTransportMode(editTransport);
			setValue('buyerId', saasPartnerId);
			setValue('expiryDate', new Date(expiryDate));
			setValue('currency', currency);
		}
	}, [editData, editData?.saasPartnerId, setValue]);

	const { exchangeRate = 1 } = useCurrencyConversion({
		watchCurrency,
		orgCurrency,
		landingPageCall: true,
	});
	const newHeaderFields = headerFields({ id, organization });
	console.log(quoteRef, 'quoteRef');

	const submitForm = async (key = false) => {
		const resp = await getHandleSubmitData({
			quoteRef     : quoteRef?.current,
			headerHandleSubmit,
			transportMode,
			premiumQuote : key,
		});
		return resp;
	};

	const createQuoteHandler = async () => {
		const data = await submitForm();
		if (data) postQuotation({ data, exchangeRate, orgCurrency, editData, flag: true });
	};

	return (
		<div>
			{editLoading && (
				<div className={styles.loading_container}>
					<img src={iconUrl.loading} alt="loading..." className={styles.cogoloader} />
					<div className={styles.modal} />
				</div>
			)}
			<Header
				control={headerControls}
				fields={newHeaderFields}
				errors={headerError}
				watch={watch}
				setValue={setValue}
				editData={editData}
				ref={quoteRef}
			/>
			<div className={styles.container}>
				<div className={styles.details_section}>
					<OptSelector
						control={headerControls}
						fields={newHeaderFields}
						transportMode={transportMode}
						setTransportMode={setTransportMode}
						errors={headerError}
					/>
					<AllDetails
						transportMode={transportMode}
						editData={query?.id ? editData : spotSearchData}
						ref={quoteRef}
					/>
					<ProductDetails
						editData={editData}
						watchCurrency={watchCurrency}
						setConsignmentValue={setConsignmentValue}
						ref={(r) => {
							quoteRef.current.product = r;
						}}
					/>
				</div>
				<div className={styles.charge_section}>
					<Charges
						submitForm={submitForm}
						editData={query?.id ? editData : spotSearchData}
						quoteRef={quoteRef}
						transportMode={transportMode}
						consignmentValue={consignmentValue}
						createQuoteHook={createQuoteHook}
						watchCurrency={watchCurrency}
						ref={(r) => {
							quoteRef.current.charges = r;
						}}
					/>
				</div>
			</div>
			<div className={styles.btn_container}>
				<Button themeType="secondary" size="lg" className={styles.back_btn}>
					Back
				</Button>
				<Button size="lg" onClick={createQuoteHandler} loading={loading}>
					Create Quotation
				</Button>
			</div>
			<ConfirmationModal
				confirmCreateQuotation={confirmCreateQuotation}
				setConfirmCreateQuotation={setConfirmCreateQuotation}
				sendQuotation={sendQuotation}
				sendQuoteLoading={sendQuoteLoading}
				createQuoteData={createQuoteData}
				sendQuotedata={sendQuotedata}
				ref={quoteRef}
			/>
		</div>
	);
}

export default forwardRef(CreateQuotation);
