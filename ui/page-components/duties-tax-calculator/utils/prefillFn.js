/* eslint-disable no-undef */
import { useEffect } from 'react';

import { useRouter } from '@/packages/next';

const usePrefillFn = ({
	transportSetValues,
	productSetValue,
	chargeSetValue,
	setFormData,
	setPrevCurr,
	setPortDetails,
	setStepper,
	setFormStepper,
	setTransportMode,
	serviceRates,
}) => {
	const { query } = useRouter();
	const { billId = '' } = query || {};
	const isPrefill = typeof window !== 'undefined';

	const fillDataHandler = ({ localStorageFormData = {} }) => {
		serviceRates();
		setFormData(localStorageFormData);
		const {
			originPort = '',
			destinationPort = '',
			productName = '',
			hsCode = '',
			consignmentValue = '',
			quantity = '',
			currency = '',
			freightCharge = '',
			incoterm = '',
			incotermCharges = [],
			origin = {},
			destination = {},
			transportMode,
		} = localStorageFormData || {};
		setPortDetails({ origin, destination });
		setTransportMode(transportMode);
		const transportObj = {
			originPort,
			destinationPort,
		};

		const productObj = {
			productName,
			hsCode,
			consignmentValue,
			quantity,
			currency,
		};

		const chargeObj = {
			freightCharge,
			incoterm,
			incotermCharges,
		};
		console.log(transportObj, productObj, chargeObj);
		// transportSetValues(transportObj);
		transportSetValues(originPort, destinationPort);

		// productSetValue(productObj);
		// chargeSetValue(chargeObj);
		productSetValue(productName, hsCode, consignmentValue, quantity, currency);
		chargeSetValue(freightCharge, incoterm, incotermCharges);
		setPrevCurr(currency);
		setFormStepper({
			formTransportDetails : false,
			formProductDetails   : false,
			formChargeDetails    : false,
			formPayDetails       : true,
		});
		setStepper({
			transportDetails : true,
			productDetails   : true,
			chargeDetails    : true,
			payDetails       : true,
		});
	};

	useEffect(() => {
		if (isPrefill && billId === '') {
			const localStorageFormData = JSON.parse(localStorage.getItem('formData'));

			if (localStorageFormData) {
				fillDataHandler({ localStorageFormData });
				localStorage.removeItem('formData');
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return {
		fillDataHandler,
	};
};

export default usePrefillFn;
