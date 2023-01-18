import { useFormCogo } from '@cogoport/front/hooks';
import { COUNTRY_IDS } from '@cogoport/business/constants';
import { patterns } from '@cogoport/front/constants';
import { getOrgControls, getAdditionalOrgControls } from '../../utils/controls';
import useGetBusiness from '../../hooks/useGetBusiness';
import Spinner from '../../../Spinner';

const { IN } = COUNTRY_IDS;

const useCompanyDetails = ({
	filledDetails = {},
	setFilledDetails = () => {},
	setCurrentStep = () => {},
}) => {
	const { company_details = {} } = filledDetails;

	const orgControls = getOrgControls({
		values: company_details,
	});

	const additionalOrgControls =
		getAdditionalOrgControls({ values: company_details }) || [];

	const companyDetailsControls = [...orgControls, ...additionalOrgControls];

	const companyDetailsFormProps = useFormCogo(companyDetailsControls);
	const {
		watch = () => {},
		setValues = () => {},
		formState: { errors = {} },
		fields = {},
	} = companyDetailsFormProps;

	const watchPan = watch('registration_number');
	const watchCountry = watch('country_id');

	const isCountryIndia = watchCountry === IN;

	const { getBusinessApi = {}, onBlurTaxPanGstinControl = () => {} } =
		useGetBusiness({
			watchTaxNumber: watchPan.toUpperCase(),
			setValues,
			registrationNumberType: isCountryIndia ? 'registration' : '',
		});

	const onSubmit = (values = {}) => {
		setFilledDetails((previousState) => ({
			...(previousState || {}),
			company_details: values,
		}));
		setCurrentStep('billing_address');
	};

	const getBusinessApiLoading = getBusinessApi.loading;

	const newFields = {};
	Object.entries(fields).forEach(([key, value]) => {
		let newField = value || {};

		if (key === 'registration_number') {
			newField = {
				...newField,
				label: 'Registration Number',
				rules: {
					pattern: {},
					required: true,
				},
			};

			if (isCountryIndia) {
				newField = {
					...newField,
					onBlur: () => onBlurTaxPanGstinControl(),
					...(getBusinessApiLoading && {
						suffix: (
							<Spinner
								size={20}
								style={{ padding: '4px', margin: '16px' }}
								spinBorderColor="#356efd"
								outerBorderColor="#e7efff"
							/>
						),
					}),
					label: 'PAN',
					maxLength: 10,
					rules: {
						required: true,
						pattern: {
							value: patterns.PAN_NUMBER,
							message: 'PAN is invalid',
						},
					},
				};
			}
		}

		if (['business_name', 'company_type'].includes(key)) {
			newField = { ...newField, disabled: getBusinessApiLoading };
		}

		newFields[key] = newField;
	});

	const newErrors = {};
	Object.entries(errors).forEach(([key, value]) => {
		if (key === 'registration_number') {
			if (!isCountryIndia && value.type === 'pattern') {
				return;
			}
		}

		newErrors[key] = { ...value };
	});

	return {
		loading: getBusinessApi.loading,
		errors: newErrors,
		onSubmitOfCompanyDetails: onSubmit,
		orgControls,
		additionalOrgControls,
		companyDetailsFormProps: { ...companyDetailsFormProps, fields: newFields },
	};
};

export default useCompanyDetails;
