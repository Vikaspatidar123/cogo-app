import { isEmpty } from '@cogoport/front/utils';
import useRequest from '@/temp/request/useRequest';
import showErrorsInToast from '@/utils/showErrorsInToast';
import { getIndiaCountryId } from '@/commons/utils/getIndiaCountryId';
import formatBankDetails from '../utils/formatBankDetails';

const INDIA_COUNTRY_ID = getIndiaCountryId();

const useGetChannelPartner = ({ STATE_CONSTANTS, setState = () => {} }) => {
	const {
		ORGANIZATION_DETAILS,
		PERSONA,
		PLAN,
		SERVICES,
		TRADE_LANES,
		ACCOUNT_INFORMATION,
		TERMS_AND_CONDITIONS,
		ACCOUNT_CREATED,
	} = STATE_CONSTANTS;

	const api = useRequest('get', false)('/get_channel_partner');

	const getOrganizationDetails = ({ response = {} }) => {
		const {
			country_id: countryId = '',
			registration_number: registrationNumber = '',
			business_name: organizationName = '',
		} = response;

		return {
			activeComponentKey: ORGANIZATION_DETAILS,
			[ORGANIZATION_DETAILS]: {
				formValues: {
					country_id: countryId,
					tax: countryId === INDIA_COUNTRY_ID ? '' : registrationNumber,
					panGstin: countryId === INDIA_COUNTRY_ID ? registrationNumber : '',
					organization_name: organizationName,
					// select_city: '',
				},
			},
		};
	};

	const getPersona = ({ response = {} }) => {
		const { category_types: categoryTypes } = response;

		if ((categoryTypes || []).length === 0) {
			return {};
		}

		return {
			activeComponentKey: PLAN,
			[PERSONA]: {
				formValues: {
					supplyService: categoryTypes,
				},
			},
		};
	};

	const getPlan = ({ response = {} }) => {
		const { account_types: accountTypes } = response;

		if ((accountTypes || []).length === 0) {
			return {};
		}

		const obj = {
			'importer_exporter,service_provider': 'both',
			importer_exporter: 'buy',
			service_provider: 'sell',
		};

		const planService = obj[accountTypes.sort().join(',')] || '';

		return {
			activeComponentKey: SERVICES,
			[PLAN]: {
				formValues: {
					planService,
				},
			},
		};
	};

	const getServices = ({ response = {} }) => {
		const { logistics_services: logisticsServices = {} } = response;

		const isServicesValuePresent = Object.keys(logisticsServices || {}).every(
			(serviceKey) => {
				return !isEmpty(logisticsServices[serviceKey] || []);
			},
		);

		if (!isServicesValuePresent) {
			return {};
		}

		const KEYS_MAPPING = {
			sell_services: 'sellServices',
			buy_services: 'buyServices',
		};

		const servicesFormValues = Object.keys(logisticsServices).reduce(
			(previousServices, currentServiceKey) => {
				const key = KEYS_MAPPING[currentServiceKey] || currentServiceKey;

				return {
					...previousServices,
					[key]: Object.keys(logisticsServices[currentServiceKey]) || [],
				};
			},
			{},
		);

		return {
			activeComponentKey: TRADE_LANES,
			[SERVICES]: {
				formValues: servicesFormValues,
			},
		};
	};

	const getTradeLanes = ({ response = {} }) => {
		const { logistics_services: logisticsServices = {} } = response;

		const isServicesValuePresent = Object.keys(logisticsServices || {}).every(
			(serviceKey) => {
				return Object.keys(logisticsServices[serviceKey]).length > 0;
			},
		);

		if (!isServicesValuePresent) {
			return {};
		}

		const isSelectedFreightFormFilled = Object.keys(logisticsServices).every(
			(serviceKey) => {
				if (isEmpty(serviceKey)) {
					return false;
				}

				return Object.keys(logisticsServices[serviceKey]).every(
					(freightKey) => {
						return logisticsServices[serviceKey][freightKey] === 'complete';
					},
				);
			},
		);

		const serviceKeysMapping = {
			buy_services: 'buyServices',
			sell_services: 'sellServices',
		};

		const serviceFreightCompleted = Object.keys(logisticsServices).reduce(
			(previousServicesFreights, serviceKey) => {
				const service = logisticsServices[serviceKey];

				if (isEmpty(service)) {
					return {
						...previousServicesFreights,
					};
				}

				const completedFreight = Object.keys(service).reduce(
					(previousFreights, currentFreightKey) => {
						const freight = service[currentFreightKey];

						if (isEmpty(freight)) {
							return { ...previousFreights };
						}

						return {
							...previousFreights,
							[currentFreightKey]: freight === 'complete',
						};
					},
					{},
				);

				return {
					...previousServicesFreights,
					[serviceKeysMapping[serviceKey]]: {
						completedFrieghtTypes: completedFreight,
					},
				};
			},
			{},
		);

		return {
			activeComponentKey: isSelectedFreightFormFilled
				? ACCOUNT_INFORMATION
				: TRADE_LANES,
			[TRADE_LANES]: serviceFreightCompleted,
		};
	};

	const getAccountInformation = ({ response = {} }) => {
		const plan = getPlan({ response });
		const {
			[PLAN]: {
				formValues: { planService },
			},
		} = plan;

		const {
			country_id: countryId = '',
			billing_addresses: billingAddress = [],
			addresses = [],
			documents = [],
			is_tax_applicable,
		} = response;

		if (isEmpty(billingAddress) && isEmpty(documents) && isEmpty(addresses)) {
			return {};
		}

		const accountInformationState = {};

		if (!isEmpty(billingAddress) || !isEmpty(addresses)) {
			const {
				address = '',
				pincode = '',
				tax_number = '',
				tax_number_document_url = '',
			} = billingAddress || {};

			let taxNumberKey = 'tax';
			let taxNumberProofKey = 'tax_proof';
			if (countryId === INDIA_COUNTRY_ID) {
				taxNumberKey = 'gst_number';
				taxNumberProofKey = 'gst_proof';
			}

			let taxNumberDocumentUrl = {};
			if (tax_number_document_url) {
				taxNumberDocumentUrl = {
					name: decodeURIComponent(tax_number_document_url.split('/').pop()),
					url: tax_number_document_url,
					uid: tax_number_document_url,
				};
			}

			let isTaxApplicable = !!is_tax_applicable;
			if (!isEmpty(billingAddress)) {
				isTaxApplicable = true;
			}

			accountInformationState.addressDetails = {
				isTaxApplicable,
				formList: isTaxApplicable ? billingAddress : addresses,
				formValues: {
					address,
					pincode,
					[taxNumberKey]: tax_number,
					[taxNumberProofKey]: taxNumberDocumentUrl,
				},
			};
		}

		if (planService !== 'buy') {
			accountInformationState.bankDetails = {};

			if (!isEmpty(documents)) {
				accountInformationState.bankDetails = {
					formValues: formatBankDetails({ documents }),
				};
			}
		}

		const isFormsFilled = Object.values(accountInformationState).every(
			(componentState) => {
				return !isEmpty(componentState);
			},
		);

		return {
			activeComponentKey: isFormsFilled
				? TERMS_AND_CONDITIONS
				: ACCOUNT_INFORMATION,
			[ACCOUNT_INFORMATION]: accountInformationState,
		};
	};

	const getAccountCreated = ({ response = {} }) => {
		const { features_preference: features = [] } = response;

		if ((features || []).length === 0) {
			return {};
		}

		return {
			activeComponentKey: ACCOUNT_CREATED,
			[ACCOUNT_CREATED]: {
				formValues: {
					features,
				},
			},
		};
	};

	const getParams = ({ partnerId = '' }) => {
		return {
			id: partnerId,
		};
	};

	const onSuccess = ({ response = {}, partnerId = '' }) => {
		const { partner = {} } = response;

		setState({
			partnerId,
			activeComponentKey: ORGANIZATION_DETAILS,
			...getOrganizationDetails({ response: partner }),
			...getPersona({ response: partner }),
			...getPlan({ response: partner }),
			...getServices({ response: partner }),
			...getTradeLanes({ response: partner }),
			...getAccountInformation({ response: partner }),
			...getAccountCreated({ response: partner }),
			componentLoading: false,
		});
	};

	const onFailure = (error = {}) => {
		if ((error.code || '') === 'ERR_CANCELED') {
			return;
		}

		showErrorsInToast(error.data);
	};

	const getChannelPartner = async ({ partnerId = '' }) => {
		try {
			// setState((previousState) => ({
			// 	...previousState,
			// 	componentLoading: true,
			// }));

			const params = getParams({ partnerId });

			const response = await api.trigger({ params });

			onSuccess({ response: response.data, partnerId });
		} catch (error) {
			onFailure(error);
		}
	};

	return {
		getChannelPartner,
	};
};

export default useGetChannelPartner;
