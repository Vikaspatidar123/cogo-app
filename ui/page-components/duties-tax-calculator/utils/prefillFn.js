import { useEffect } from 'react';

import { useRouter } from '@/packages/next';

const prefillFn = ({
	transportSetValues,
	productSetValues,
	chargeSetValues,
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
		transportSetValues(transportObj);
		productSetValues(productObj);
		chargeSetValues(chargeObj);
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
			}
		}
	}, []);
	return {
		fillDataHandler,
	};
};

export default prefillFn;
