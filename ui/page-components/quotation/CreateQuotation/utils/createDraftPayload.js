const createDraftpayload = ({
	quoteId = '',
	quoteRes = {},
	getPortDetails,
	country_code,
	consignmentValue,
	productInfoArr = [],
	servicesSelected = {},
}) => {
	const {
		transportMode,
		charges = {},
		destinationPortDetails = {}, originPortDetails = {}, header = {}, sellerAddress = {}, buyerDetails = {},
	} = quoteRes;

	const getCountryDetails = async (id, type) => {
		const response = await getPortDetails({
			status     : 'active',
			type       : [type],
			id         : type !== 'country' ? id : '',
			country_id : type === 'country' ? id : '',
		});
		return response?.country_code || response;
	};

	const createHeader = async (isScreening = false, tradeEngineInputId = '') => {
		const {
			partyName = '',
			address: buyerAddress = '',
			pincode: buyerPinCode = '',
			country: buyerCountry = '',
			state: buyerState = '',
			city : buyerCity = '',
			countryId: buyerCountryId = '',
		} = buyerDetails;

		const buyerCountryCode = await getCountryDetails(buyerCountryId, 'country');

		const draftHeader = {
			incoterm               : charges?.incoterm,
			resultCurrency         : header?.currency,
			quotationId            : quoteId,
			modeOfTransport        : transportMode === 'OCEAN' ? 'SEA' : 'AIR',
			originCountryCode      : originPortDetails?.country_code,
			destinationCountryCode : destinationPortDetails?.country_code,
			isScreening,
			consignmentValue,
			tradeEngineInputId,
			sellerDetails          : {
				name        : sellerAddress?.name,
				countryCode : country_code,
				address     : sellerAddress?.address,
				pinCode     : sellerAddress?.pincode,
				state       : null,
				city        : null,
				countryName : null,
			},
			buyerDetails: {
				name        : partyName,
				countryCode : buyerCountryCode,
				address     : buyerAddress,
				pinCode     : buyerPinCode,
				state       : buyerState,
				city        : buyerCity,
				countryName : buyerCountry,
			},
		};
		if (buyerCountryCode) {
			return draftHeader;
		}
		return false;
	};

	const createlineItem = () => {
		const lineItem = productInfoArr.map(({ product_price = '', productId = '', quantity = '', name = '' }) => {
			const {
				duties_and_taxes, import_export_documents,
				import_export_controls, destinationHs,
			} = servicesSelected?.[productId] || {};
			return {
				destinationHs,
				value            : product_price,
				productId,
				servicesRequired : {
					isLandedCost    : duties_and_taxes,
					isDocumentation : import_export_documents,
					isControls      : import_export_controls,
				},
				manufactureOrigin : country_code,
				quantity,
				originCN          : '',
				productName       : name,
			};
		});

		return lineItem;
	};

	return {
		createHeader, createlineItem,
	};
};

export default createDraftpayload;
