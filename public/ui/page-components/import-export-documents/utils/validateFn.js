import { useEffect } from 'react';

import { useRouter } from '@/packages/next';

const useValidateFn = ({
	verifyHsCode,
	hsCode,
	setStatus,
	transportDetails,
	setValidateInProgress,
	getDraftFn,
}) => {
	const { query } = useRouter();
	const { billId = '' } = query || {};

	const { tradeEngineInputId = '', importCountry = {} } =	transportDetails || {};

	const destinationCountryCode = importCountry?.country_code;

	useEffect(() => {
		if (billId) {
			getDraftFn(tradeEngineInputId);
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [billId]);

	const validateHSCode = async () => {
		await verifyHsCode({
			hsCode,
			destinationCountryCode,
			setStatus,
			setValidateInProgress,
		});
	};
	return {
		validateHSCode,
	};
};

export default useValidateFn;
