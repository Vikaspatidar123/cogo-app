/* eslint-disable no-undef */
import { useEffect } from 'react';

import { useRouter } from '@/packages/next';

const usePrefillFn = ({
	transportSetValue,
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

		transportSetValue('originPort', originPort);
		transportSetValue('destinationPort', destinationPort);

		productSetValue('productName', productName);
		productSetValue('hsCode', hsCode);
		productSetValue('consignmentValue', consignmentValue);
		productSetValue('quantity', quantity);
		productSetValue('currency', currency);

		chargeSetValue('freightCharge', freightCharge);
		chargeSetValue('incoterm', incoterm);
		chargeSetValue('incotermCharges', incotermCharges);

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
				localStorage.removeItem('draftId');
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return {
		fillDataHandler,
	};
};

export default usePrefillFn;
