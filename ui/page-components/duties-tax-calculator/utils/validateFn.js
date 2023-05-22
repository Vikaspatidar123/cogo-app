import { useRouter } from '@/packages/next';

const useValidateFn = ({
	verifyHsCode,
	hsCode = '',
	portDetails = {},
	refetchDraft,
	postTradeEngine,
	getDraftData = {},
	verifiedData = {},
	setShow,
	setStatus,
	setValidateInProgress,
}) => {
	const { query } = useRouter();
	const { destination = {} } = portDetails || {};
	const { headerResponse = {}, lineItem = [] } = getDraftData;
	const destinationCountryCode = destination?.countryCode || headerResponse?.destinationCountryCode;

	const validateHSCode = async () => {
		await verifyHsCode({
			hsCode,
			destinationCountryCode,
			setStatus,
			setValidateInProgress,
		});
	};
	const objLineItem = { ...lineItem[0] };
	const newLineItem = [
		{
			...objLineItem,
			destinationHs : verifiedData?.hsCode,
			productName   : verifiedData?.description,
		},
	];

	const submitHandler = async () => {
		const resp = await refetchDraft({
			header   : headerResponse,
			lineItem : newLineItem,
		});
		if (resp) {
			postTradeEngine(resp, 'PAYMENT', query?.billId);
			setShow(false);
		}
	};

	return { validateHSCode, submitHandler };
};

export default useValidateFn;
