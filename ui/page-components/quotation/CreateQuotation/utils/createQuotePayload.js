import { format } from '@cogoport/utils';

const createQuotePayload = ({ data, exchangeRate = 1 }) => {
	const {
		sellerAddress = {},
		buyerDetails = {}, destinationPortDetails = {}, originPortDetails = {},
		// transport = {},
		details = {}, product = {}, charges = {}, header = {}, transportMode = 'OCEAN',
	} = data || {};

	const { currency, expiryDate: expDate } = header;

	const {
		id = '',
		name = '',
		tax_number = '',
		address = '',
		organization = {},
		pincode = '',
		organization_pocs = [],
	} = sellerAddress;

	const {
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
		billingAddressId : id,
		billingPartyName : name,
		taxNumber        : tax_number,
		address,
		countryId        : organization?.country_id,
		pincode,
		pocEmail         : organization_pocs[0]?.email,
		pocPhoneNumber   : organization_pocs[0]?.mobile_number,
		pocName          : organization_pocs[0]?.name,
		pocPhoneCode     : organization_pocs[0]?.mobile_country_code,
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
