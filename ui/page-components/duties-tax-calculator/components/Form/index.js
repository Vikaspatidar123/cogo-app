import { merge } from '@cogoport/utils';
import { useState } from 'react';

import {
	transportationControls,
	productControls,
	ChargeControls,
} from '../../configuration/controls';
import useServiceRates from '../../hook/useServiceRates';
import prefillFn from '../../utils/prefillFn';

import Charges from './Charge';
import Pay from './Pay';
import Product from './Product';
import styles from './styles.module.css';
import Transportation from './Transportation';

import {
	asyncFieldsLocations, useGetAsyncOptions,
	useForm,
} from '@/packages/forms';
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
	isMobile = false,
}) {
	const { profile } = useSelector((s) => s);
	const { organization = {} } = profile || {};

	const [formData, setFormData] = useState({});
	const [incoterm, setIncoterm] = useState('CIF');
	const [prevCurr, setPrevCurr] = useState(organization?.country?.currency_code);
	const [prevHs, setPrevHs] = useState('');
	const {
		formTransportDetails, formProductDetails, formChargeDetails, formPayDetails,
	} =		formStepper;
	const { serviceRates, serviceRateData, serviceRatesLoading } = useServiceRates({
		prioritySequence,
	});

	const {
		setValue: transportSetValues,
		watch: transportWatch,
		reset: transportReset,
		handleSubmit: transportHandleSubmit,
		formState: { errors: transportError },
		control:transportControl,
	} = useForm();

	const {
		handleSubmit: productHandleSubmit,
		setValue: productSetValue,
		setValues: productSetValues,
		watch: productWatch,
		formState: { errors: productError },
		control:productNewControls,
	// } = useForm();
	} = useForm({ defaultValues: { currency: 'INR' } });

	const {
		handleSubmit: chargeHandleSubmit,
		formState: { errors: ChargeError },
		watch: chargeWatch,
		setValue: chargeSetValue,
		setValues: chargeSetValues,
		control:chargeControls,
	} = useForm();

	const filter = { filters: { type: [transportMode === 'AIR' ? 'airport' : 'seaport'] } };

	const cityOptions = useGetAsyncOptions(merge(asyncFieldsLocations(), {
		params: { ...filter },
	}));
	const transport = transportationControls({ transportMode, cityOptions });

	const transportFields = (transport || [])?.map((control) => {
		const { name } = control;
		let newControl = { ...control };

		if (name) {
			newControl = { ...newControl, ...cityOptions };
		}
		return { ...newControl };
	});
	const productFields = productControls({ organization });
	const chargeFields = ChargeControls;

	console.log(transportFields, 'transportFields');

	prefillFn({
		transportSetValues,
		productSetValues,
		chargeSetValues,
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

	console.log(formProductDetails, 'formProductDetails');

	return (
		<div className={`${formPayDetails && 'payDetails'} ${styles.container}`}>
			{formTransportDetails && (
				<Transportation
					transportMode={transportMode}
					setTransportMode={setTransportMode}
					fields={transportFields}
					error={transportError}
					setValue={transportSetValues}
					watch={transportWatch}
					reset={transportReset}
					handleSubmit={transportHandleSubmit}
					setStepper={setStepper}
					setFormStepper={setFormStepper}
					setFormData={setFormData}
					portDetails={portDetails}
					setPortDetails={setPortDetails}
					setPrevHs={setPrevHs}
					isMobile={isMobile}
					transportControl={transportControl}
				/>
			)}
			{formProductDetails && (
				<Product
					fields={productFields}
					error={productError}
					handleSubmit={productHandleSubmit}
					setStepper={setStepper}
					setFormStepper={setFormStepper}
					prevHandler={prevHandler}
					formData={formData}
					setFormData={setFormData}
					setValue={productSetValue}
					watch={productWatch}
					portDetails={portDetails}
					prevCurr={prevCurr}
					setPrevCurr={setPrevCurr}
					isMobile={isMobile}
					isQuotaLeft={isQuotaLeft}
					prevHs={prevHs}
					setPrevHs={setPrevHs}
					productNewControls={productNewControls}
				/>
			)}
			{formChargeDetails && (
				<Charges
					fields={chargeFields}
					error={ChargeError}
					handleSubmit={chargeHandleSubmit}
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
					watch={chargeWatch}
					setValue={chargeSetValue}
					formData={formData}
					transportMode={transportMode}
					portDetails={portDetails}
					prevCurr={prevCurr}
					isMobile={isMobile}
					chargeControls={chargeControls}
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
					isMobile={isMobile}
				/>
			)}
		</div>
	);
}

export default Form;
