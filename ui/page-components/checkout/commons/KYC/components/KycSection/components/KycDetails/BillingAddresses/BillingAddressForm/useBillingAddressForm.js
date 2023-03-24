import { useEffect } from 'react';
import { useFormCogo } from '@cogoport/front/hooks';
import { get, isEmpty } from '@cogoport/front/utils';
import global from '@cogo/commons/constants/global';
import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';
import { getControls } from '../utils/controls';

const { INDIA_COUNTRY_ID } = global;

const useBillingAddressForm = ({
	countryId,
	state,
	setState,
	CONSTANTS,
	isGstApplicable,
	setShowBookingContactForm = () => {},
	gstinOptions = [],
	setKycDetails,
	channelPartnerDetails,
}) => {
	const {
		general: { scope },
	} = useSelector((reduxState) => reduxState);

	const {
		COMPONENT_KEYS: { ACCOUNT_INFORMATION },
	} = CONSTANTS;

	const isCountryIndia = countryId === INDIA_COUNTRY_ID;

	const { [ACCOUNT_INFORMATION]: accountInformation = {} } = state;
	const { isGstApplicable: gstApplicable = false } = accountInformation || {};

	let apiName = '/create_channel_partner_billing_address';
	if (isGstApplicable || gstApplicable) {
		apiName = '/create_channel_partner_address';
	}

	const billingAddressApi = useRequest('post', false, scope)(apiName);

	const getAddressFromGstinApi = useRequest(
		'get',
		false,
		scope,
	)('/get_business');

	const newControls = getControls({ countryId });

	const formProps = useFormCogo(newControls);
	const { formState, setError, watch, getValues, setValues } = formProps;

	const watchGstList = watch('gst_list') || '';

	useEffect(() => {
		if (!watchGstList) {
			return;
		}

		const values = getValues();

		const { identity_number, addresses = [] } =
			getAddressFromGstinApi.data || {};

		if (identity_number === watchGstList) {
			setValues({
				...values,
				gst_number: watchGstList,
				...(!isEmpty(addresses) && {
					pincode: values.pincode || get(addresses, '[0].pincode') || '',
					address: values.address || get(addresses, '[0].address') || '',
				}),
			});

			return;
		}

		setValues({
			...values,
			gst_number: '',
			pincode: '',
			address: '',
		});

		getGstAddress();
	}, [watchGstList]);

	const getGstAddress = async () => {
		try {
			const response = await getAddressFromGstinApi.trigger({
				params: {
					identity_number: watchGstList,
					identity_type: 'tax',
					country_code: 'IN',
					provider_name: 'cogoscore',
				},
			});

			setValues({
				...getValues(),
				gst_number: watchGstList,
				pincode: get(response, 'data.addresses[0].pincode') || '',
				address: get(response, 'data.addresses[0].address') || '',
			});
		} catch (error) {
			console.log('error :: ', error);
		}
	};

	const onSubmit = async ({
		values,
		onSuccess = () => {},
		onFailure = () => {},
	}) => {
		try {
			const { verification = [], twin_importer_exporter_id = '' } =
				channelPartnerDetails;

			const account_type = twin_importer_exporter_id
				? 'importer_exporter'
				: 'service_provider';

			const verification_data =
				verification.find((data) => {
					return data.account_type === account_type;
				}) || {};

			const payload = {
				partner_id: channelPartnerDetails.id,
				address: values.address,
				pincode: values.pincode,
				...(isGstApplicable && {
					is_tax_applicable: !isGstApplicable,
					address_type: values.address_type,
					name: 'other',
					country_id: state.organizationDetails.formValues.country_id,
					tax_exemption_proof: values.tax_exemption_proof.url,
				}),
				...(!isGstApplicable && {
					tax_number: values.gst_number || values.tax,
					tax_number_document_url: isCountryIndia
						? values.gst_proof.url
						: values.tax_proof.url,
				}),
				verification_id: verification_data.id,
			};

			const response = await billingAddressApi.trigger({
				data: payload,
			});

			const previousSavedBillingAddresses =
				get(state, `[${ACCOUNT_INFORMATION}].addressDetails.formList`) || [];

			if (isEmpty(previousSavedBillingAddresses)) {
				setKycDetails((previousState) => ({
					...previousState,
					verification_progress: {
						...previousState.verification_progress,
						...(get(response, 'data.verification_progress') || {}),
					},
				}));
			}

			setState((previousState) => ({
				...previousState,
				[ACCOUNT_INFORMATION]: {
					...(previousState[ACCOUNT_INFORMATION] || {}),
					addressDetails: {
						...(previousState[ACCOUNT_INFORMATION]?.addressDetails || {}),
						isTaxApplicable: isCountryIndia ? !isGstApplicable : null,
						formList: [
							...((previousState[ACCOUNT_INFORMATION]?.addressDetails || {})
								.formList || []),
							payload,
						],
					},
				},
			}));

			setShowBookingContactForm(false);

			onSuccess();
		} catch (error) {
			console.log('error :: ', error);
			onFailure();

			const CONTROL_NAME_MESSAGE_MATCH_MAPPING = {
				pincode: 'Pincode does not belong to the GST',
				gst_number: 'Gst number is invalid for the PAN number provided',
			};

			const { message: errorMessage } = error.error || {};

			Object.entries(CONTROL_NAME_MESSAGE_MATCH_MAPPING).forEach(
				([name, matchMessage]) => {
					if ((errorMessage || '').includes(matchMessage)) {
						setError(name, {
							type: 'custom',
							message: errorMessage,
						});
					}
				},
			);
		}
	};

	const onClickCancelButton = () => {
		setShowBookingContactForm(false);
	};

	const newFields = {};
	const showElements = {};

	newControls.forEach((control) => {
		const { name = '' } = control;

		let newField = formProps.fields[name];
		let showElement = true;

		if (
			(['address_type', 'tax_exemption_proof'].includes(name) &&
				!isGstApplicable) ||
			(['gst_list', 'gst_number', 'gst_proof'].includes(name) &&
				isGstApplicable)
		) {
			showElement = false;
		}

		if (name === 'gst_list') {
			if (!isEmpty(gstinOptions)) {
				newField = {
					...newField,
					options: gstinOptions,
				};
			} else {
				showElement = false;
			}
		}

		if (name === 'gst_number') {
			newField = {
				...newField,
				onChange: (event) => {
					if (isCountryIndia) {
						if (event.target.value.length !== 15) {
							setValues({
								...getValues(),
								gst_list: '',
							});
						}

						if (
							event.target.value.length === 15 &&
							gstinOptions.some((gstin) => gstin.value === event.target.value)
						) {
							setValues({
								...getValues(),
								gst_list: event.target.value,
							});
						}
					}
				},
			};
		}

		if (['gst_number', 'pincode', 'address'].includes(name)) {
			newField = {
				...newField,
				disabled: getAddressFromGstinApi.loading,
			};
		}

		newFields[name] = newField;
		showElements[name] = showElement;
	});

	return {
		showElements,
		formProps: { ...formProps, fields: newFields },
		errors: formState.errors,
		onSubmit,
		userControls: newControls,
		onClickCancelButton,
		loading: billingAddressApi.loading,
	};
};

export default useBillingAddressForm;
