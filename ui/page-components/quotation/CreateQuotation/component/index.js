import { Button } from '@cogoport/components';
import { useState, useRef, forwardRef, useEffect } from 'react';

import headerFields from '../configuration/headerControls';
import useCreateQuotation from '../hooks/useCreateQuotation';
import useCurrencyConversion from '../hooks/useCurrencyConversion';
import getHandleSubmitData from '../utils/getHandleSubmitdata';

import AllDetails from './AllDetails';
import Charges from './Charges';
import Header from './Header';
import OptSelector from './OptSelector';
import ProductDetails from './ProductDetails';
import styles from './styles.module.css';

import { useForm } from '@/packages/forms';
import { useSelector } from '@/packages/store';

function CreateQuotation() {
	const { id, organization } = useSelector((state) => state?.profile);

	const [transportMode, setTransportMode] = useState('OCEAN');

	const orgCurrency = organization?.country?.currency_code;

	const {
		control: headerControls,
		handleSubmit: headerHandleSubmit,
		formState: { errors: headerError },
		setValue,
		watch,
	} = useForm({
		defaultValues: {
			currency: orgCurrency,
		},
	});
	const watchCurrency = watch('currency');
	const date = watch('expiryDate');

	const quoteRef = useRef({ date });
	useEffect(() => {
		quoteRef.current.date = date;
	}, [date]);

	const {
		// getExchangeRate,
		exchangeRate = 1,
	} = useCurrencyConversion({
		watchCurrency,
		orgCurrency,
		landingPageCall: true,
	});
	const { postQuotation, loading } = useCreateQuotation({});
	const newHeaderFields = headerFields({ id, organization });
	console.log(watch('expiryDate'));
	const submitForm = async () => {
		const resp = await getHandleSubmitData({
			quoteRef: quoteRef.current,
			headerHandleSubmit,
			transportMode,
		});
		return resp;
	};

	const createQuoteHandler = async () => {
		const data = await submitForm();
		postQuotation({ data, exchangeRate, orgCurrency });
	};
	return (
		<div>
			<Header
				control={headerControls}
				fields={newHeaderFields}
				errors={headerError}
				ref={quoteRef}
				setValue={setValue}
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
					<AllDetails transportMode={transportMode} ref={quoteRef} />
					<ProductDetails
						ref={(r) => {
							quoteRef.current.product = r;
						}}
					/>
				</div>
				<div className={styles.charge_section}>
					<Charges
						submitForm={submitForm}
						ref={(r) => {
							quoteRef.current.charges = r;
						}}
						quoteRef={quoteRef}
						transportMode={transportMode}
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
		</div>
	);
}

export default forwardRef(CreateQuotation);
