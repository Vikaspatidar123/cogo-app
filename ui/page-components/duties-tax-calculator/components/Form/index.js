import { useState } from 'react';

import useServiceRates from '../../hook/useServiceRates';
import prefillFn from '../../utils/prefillFn';

import Charges from './Charge';
import Pay from './Pay';
import Product from './Product';
import styles from './styles.module.css';
import Transportation from './Transportation';

import { useForm } from '@/packages/forms';
import { useSelector } from '@/packages/store';

function Form({
	stepper,
	setStepper,
	portDetails = {},
	setPortDetails,
	transportMode,
	setTransportMode,
	formStepper,
	setFormStepper,
	isUserSubscribed = false,
	isQuotaLeft = false,
	quotaValue = 0,
	postTradeEngine,
	prioritySequence = 0,
	setMapPoints,
}) {
	const { profile } = useSelector((s) => s);
	const { organization = {} } = profile || {};

	const [formData, setFormData] = useState({});
	const [incoterm, setIncoterm] = useState('CIF');
	const [prevCurr, setPrevCurr] = useState(organization?.country?.currency_code);
	const [prevHs, setPrevHs] = useState('');
	const {
		formTransportDetails, formProductDetails, formChargeDetails, formPayDetails,
	} = formStepper;
	const { serviceRates, serviceRateData, serviceRatesLoading } = useServiceRates({
		prioritySequence,
	});

	const transportFormHook = useForm();
	const productFormHook = useForm({ defaultValues: { currency: organization?.country?.currency_code } });
	const chargeFormHook = useForm({ defaultValues: { incoterm: 'CIF' } });

	const { setValue: transportSetValue } = transportFormHook;
	const { setValue: chargeSetValue } = chargeFormHook;
	const { setValue: productSetValue } = productFormHook;

	prefillFn({
		transportSetValue,
		productSetValue,
		chargeSetValue,
		setFormData,
		setIncoterm,
		setPrevCurr,
		setPrevHs,
		setPortDetails,
		setStepper,
		setFormStepper,
		setTransportMode,
		serviceRates,
	});

	const prevHandler = () => {
		const formStepKey = Object.keys(formStepper);
		const stepKey = Object.keys(stepper);
		const formStepValues = Object.values(formStepper);

		(formStepValues || []).forEach((ele, index) => {
			if (ele) {
				setFormStepper((prev) => ({
					...prev,
					[formStepKey[index]]     : false,
					[formStepKey[index - 1]] : true,
				}));

				setStepper((prev) => ({
					...prev,
					[stepKey[index]]: false,
				}));
			}
		});
	};

	return (
		<div className={styles.container}>

			{formTransportDetails && (
				<Transportation
					transportMode={transportMode}
					setTransportMode={setTransportMode}
					formHook={transportFormHook}
					setStepper={setStepper}
					setFormStepper={setFormStepper}
					setFormData={setFormData}
					portDetails={portDetails}
					setPortDetails={setPortDetails}
					setPrevHs={setPrevHs}
					setMapPoints={setMapPoints}
					setValue={transportSetValue}
				/>
			)}
			{formProductDetails && (
				<Product
					setStepper={setStepper}
					setFormStepper={setFormStepper}
					prevHandler={prevHandler}
					formHook={productFormHook}
					formData={formData}
					setFormData={setFormData}
					setValue={productSetValue}
					portDetails={portDetails}
					prevCurr={prevCurr}
					setPrevCurr={setPrevCurr}
					isQuotaLeft={isQuotaLeft}
					prevHs={prevHs}
					setPrevHs={setPrevHs}
				/>
			)}
			{formChargeDetails && (
				<Charges
					incoterm={incoterm}
					setIncoterm={setIncoterm}
					setStepper={setStepper}
					setFormStepper={setFormStepper}
					prevHandler={prevHandler}
					setFormData={setFormData}
					serviceRates={serviceRates}
					serviceRateData={serviceRateData}
					serviceRatesLoading={serviceRatesLoading}
					isQuotaLeft={isQuotaLeft}
					formHook={chargeFormHook}
					setValue={chargeSetValue}
					formData={formData}
					transportMode={transportMode}
					portDetails={portDetails}
					prevCurr={prevCurr}
				/>
			)}
			{formPayDetails && (
				<Pay
					formData={formData}
					transportMode={transportMode}
					incoterm={incoterm}
					portDetails={portDetails}
					prevHandler={prevHandler}
					isQuotaLeft={isQuotaLeft}
					isUserSubscribed={isUserSubscribed}
					postTradeEngine={postTradeEngine}
					serviceRateData={serviceRateData}
					quotaValue={quotaValue}
				/>
			)}
		</div>
	);
}

export default Form;
