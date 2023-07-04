const createDraftpayload = ({
	quoteId = '',
	quoteRes = {},
	getPortDetails,
	country_code,
	consignmentValue,
	productInfoArr = [],
	servicesSelected = {},
	editData = {},
	headerResponse = {},
}) => {
	const {
		transportMode,
		incoterm = '',
		destinationPortDetails = {}, originPortDetails = {}, header = {}, sellerAddress = {}, buyerDetails = {},
	} = quoteRes || {};

	const { quotationId, sellerDetails: editSellerDetails = {}, buyerDetails: editBuyerDetails = {} } = editData || {};

	const getCountryDetails = async (id, type) => {
		const response = await getPortDetails({
			status     : 'active',
			type       : [type],
			id         : type !== 'country' ? id : '',
			country_id : type === 'country' ? id : '',
		});
		return response?.[0]?.country_code || response;
	};

	const getDraftHeader = ({ buyerCountryCode, traderCheck }) => {
		const {
			isScreening = false, tradeEngineInputId = '',
			destinationCountryCode, originCountryCode, resultCurrency, incoterm: headerIncoterm,
			modeOfTransport,
		} = headerResponse || {};

		const {
			partyName = '',
			address: buyerAddress = '',
			pincode: buyerPinCode = '',
			country: buyerCountry = '',
			state: buyerState = '',
			city : buyerCity = '',
		} = buyerDetails;

		const draftHeader = {
			incoterm               : incoterm || headerIncoterm,
			resultCurrency         : header?.currency || resultCurrency,
			quotationId            : quoteId || quotationId,
			modeOfTransport        : modeOfTransport || transportMode === 'OCEAN' ? 'SEA' : 'AIR',
			originCountryCode      : originPortDetails?.country_code || originCountryCode,
			destinationCountryCode : destinationPortDetails?.country_code || destinationCountryCode,
			isScreening            : traderCheck || isScreening,
			consignmentValue,
			tradeEngineInputId,
			sellerDetails          : {
				name        : sellerAddress?.name || editSellerDetails?.billingPartyName,
				countryCode : country_code,
				address     : sellerAddress?.address || editSellerDetails?.address,
				pinCode     : sellerAddress?.pincode || editSellerDetails?.pincode,
				state       : null,
				city        : null,
				countryName : null,
			},
			buyerDetails: {
				name        : partyName || editBuyerDetails?.billingPartyName,
				countryCode : buyerCountryCode,
				address     : buyerAddress || editBuyerDetails?.address,
				pinCode     : buyerPinCode || editBuyerDetails?.pincode,
				state       : buyerState,
				city        : buyerCity,
				countryName : buyerCountry || editBuyerDetails?.country,
			},
		};

		return draftHeader;
	};

	const createHeader = async (traderCheck) => {
		const {
			countryId: buyerCountryId = '',
		} = buyerDetails;

		const { countryId = '' } = editBuyerDetails || {};

		const buyerCountryCode = await getCountryDetails(buyerCountryId || countryId, 'country');

		if (!buyerCountryCode) {
			return null;
		}

		const draftHeader = getDraftHeader({ buyerCountryCode, traderCheck });
		console.log(draftHeader, 'draftHeader');
		return draftHeader;

		// const draftHeader = {
		// 	incoterm               : incoterm || headerIncoterm,
		// 	resultCurrency         : header?.currency || resultCurrency,
		// 	quotationId            : quoteId || quotationId,
		// 	modeOfTransport        : modeOfTransport || transportMode === 'OCEAN' ? 'SEA' : 'AIR',
		// 	originCountryCode      : originPortDetails?.country_code || originCountryCode,
		// 	destinationCountryCode : destinationPortDetails?.country_code || destinationCountryCode,
		// 	isScreening            : traderCheck || isScreening,
		// 	consignmentValue,
		// 	tradeEngineInputId,
		// 	sellerDetails          : {
		// 		name        : sellerAddress?.name || editSellerDetails?.billingPartyName,
		// 		countryCode : country_code,
		// 		address     : sellerAddress?.address || editSellerDetails?.address,
		// 		pinCode     : sellerAddress?.pincode || editSellerDetails?.pincode,
		// 		state       : null,
		// 		city        : null,
		// 		countryName : null,
		// 	},
		// 	buyerDetails: {
		// 		name        : partyName || editBuyerDetails?.billingPartyName,
		// 		countryCode : buyerCountryCode,
		// 		address     : buyerAddress || editBuyerDetails?.address,
		// 		pinCode     : buyerPinCode || editBuyerDetails?.pincode,
		// 		state       : buyerState,
		// 		city        : buyerCity,
		// 		countryName : buyerCountry || editBuyerDetails?.country,
		// 	},
		// };
	};

	const createlineItem = () => {
		const lineItem = productInfoArr.map(({
			product_price = '', productId = '', quantity = '', name = '',
			productName = '', tradeEngineLineItemInputId, value,
		}) => {
			const {
				duties_and_taxes, import_export_documents,
				import_export_controls, destinationHs,
			} = servicesSelected?.[productId] || {};
			return {
				destinationHs,
				value            : product_price || value,
				productId,
				servicesRequired : {
					isLandedCost    : duties_and_taxes,
					isDocumentation : import_export_documents,
					isControls      : import_export_controls,
				},
				manufactureOrigin : country_code,
				quantity,
				originCN          : '',
				productName       : name || productName,
				tradeEngineLineItemInputId,
			};
		});

		return lineItem;
	};

	return {
		createHeader, createlineItem,
	};
};

export default createDraftpayload;
