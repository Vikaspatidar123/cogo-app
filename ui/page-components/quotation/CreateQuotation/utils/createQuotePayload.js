import { format } from '@cogoport/utils';

const createQuotePayload = ({ data, exchangeRate = 1, orgCurrency }) => {
	const {
		sellerAddress = {},
		buyerDetails = {}, destinationPortDetails = {}, originPortDetails = {},
		// transport = {},
		details = {}, product = {}, charges = {}, header = {}, transportMode = 'OCEAN',
	} = data || {};

	const { currency, expiryDate: expDate } = header;
	console.log(buyerDetails, 'buyerDetails');
	const {
		id = '',
		name = '',
		tax_number = '',
		address = '',
		organization = {},
		pincode = '',
		organization_pocs = [],
		billingAddressId = '',
		billingPartyName = '',
		pocEmail = '',
		pocPhoneNumber = '',
		pocName : sellerPocName = '',
		pocPhoneCode = '',
		countryId: sellerCountryId = '',
	} = sellerAddress;

	const {
		id:buyerId = '',
		partyName = '',
		address: buyerAddress = '',
		pincode: buyerPinCode = '',
		email = '',
		phoneNumber = '',
		phoneCode = '',
		pocName = '',
		country = '',
		countryId = '',
		taxNumber = '',
	} = buyerDetails;

	const {
		id: originPortId = '',
		name: originPortName = '',
		country: originCountry = {},
		port_code: originPortCode = '',
	} = originPortDetails;

	const {
		id: destinationPortId = '',
		name: destinationPortName = '',
		country: destinationCountry = {},
		port_code: destinationPortCode,
	} = destinationPortDetails;

	const { additionalCharges = [], incotermCharges = [], ...rest } = charges;

	const expiryDate = format(expDate, 'yyyy-MM-dd');
	const products = product?.products;

	const sellerAddressDetails = {
		billingAddressId : id || billingAddressId,
		billingPartyName : name || billingPartyName,
		taxNumber        : tax_number || taxNumber,
		address,
		countryId        : organization?.country_id || sellerCountryId,
		pincode,
		pocEmail         : organization_pocs[0]?.email || pocEmail,
		pocPhoneNumber   : organization_pocs[0]?.mobile_number || pocPhoneNumber,
		pocName          : organization_pocs[0]?.name || pocName,
		pocPhoneCode     : organization_pocs[0]?.mobile_country_code || pocPhoneCode,
	};

	const buyerAddressDetails = {
		billingPartyName : partyName,
		address          : buyerAddress,
		pincode          : buyerPinCode,
		pocEmail         : email,
		pocPhoneNumber   : phoneNumber,
		pocPhoneCode     : phoneCode,
		pocName,
		country,
		countryId,
		isDefaultAddress : true,
		taxNumber,
	};

	const shipmentDetails = {
		originId           : originPortId,
		originPortName,
		originCountry      : originCountry?.name,
		originPortCode,
		destinationId      : destinationPortId,
		destinationPortName,
		destinationCountry : destinationCountry?.name,
		destinationPortCode,
		transportMode,
		...details,
	};

	const additionalChargesList = {
		additionalCharges,
		incotermCharges,
	};

	const otherDetails = {
		...rest,
		currency,
		exchangeRate,
		saasPartnerId: buyerId,
		orgCurrency,
	};

	return {
		expiryDate,
		products,
		sellerAddressDetails,
		buyerAddressDetails,
		shipmentDetails,
		additionalChargesList,
		otherDetails,
	};
};
export default createQuotePayload;
