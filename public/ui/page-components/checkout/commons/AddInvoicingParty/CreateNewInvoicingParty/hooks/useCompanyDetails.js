import { Loader } from '@cogoport/components';

import useGetBusiness from '../../hooks/useGetBusiness';
import { getOrgControls, getAdditionalOrgControls } from '../../utils/controls';

import { useForm } from '@/packages/forms';
import patterns from '@/ui/commons/configurations/patterns';
import { getCountrySpecificData, getLocaleSpecificLabels } from '@/ui/commons/constants/CountrySpecificDetail';

const ORG_INFO = ['business_name', 'company_type'];
const MAX_LENGTH = 10;

const useCompanyDetails = ({
	filledDetails = {},
	setFilledDetails = () => {},
	setCurrentStep = () => {},
}) => {
	const { company_details = {} } = filledDetails;

	const orgControls = getOrgControls({
		values: company_details,
	}) || [];

	const additionalOrgControls = getAdditionalOrgControls({ values: company_details }) || [];

	const companyDetailsControls = [...orgControls, ...additionalOrgControls];

	const companyDetailsFormProps = useForm();

	const {
		watch,
		setValues,
		control,
		formState: { errors = {} },
	} = companyDetailsFormProps;

	const watchPan = watch('registration_number');
	const watchCountryId = watch('country_id');
	const watchBusinessName = watch('business_name');

	const { validate_registration_number } = getCountrySpecificData({
		country_id   : watchCountryId,
		accessorType : 'navigations',
		accessor     : 'common',
	});

	const IDENTIFICAITON_LABEL = getLocaleSpecificLabels({
		accessorType : 'identification_number',
		accessor     : 'label',
	});

	const { getBusinessLoading: businessApiLoading, onBlurTaxPanGstinControl = () => {} } = useGetBusiness({
		watchTaxNumber         : watchPan?.toUpperCase(),
		watchBusinessName,
		setValues,
		registrationNumberType : validate_registration_number ? 'registration' : '',
	});

	const onSubmit = (values = {}) => {
		setFilledDetails((previousState) => ({
			...(previousState || {}),
			company_details: values,
		}));
		setCurrentStep('billing_address');
	};

	const newControlsField = {};
	companyDetailsControls.forEach((config) => {
		let newField = { ...config };
		if (config.name === 'registration_number') {
			newField = {
				...config,
				onBlur: () => onBlurTaxPanGstinControl(),
				...(businessApiLoading && {
					suffix: <Loader themeType="primary" />,
				}),

				...(validate_registration_number && { maxLength: MAX_LENGTH }),
				label: IDENTIFICAITON_LABEL,

				rules: {
					...(newField.rules || {}),
					pattern: {},
					...(validate_registration_number && {
						pattern: {
							value   : patterns.PAN_NUMBER,
							message : 'PAN is invalid',
						},
					}),
				},
			};
		}

		if (ORG_INFO.includes(config.name)) {
			newField = {
				...config,
				disabled: businessApiLoading,
			};
		}

		newControlsField[config.name] = newField;
	});

	const newErrors = {};
	Object.entries(errors).forEach(([key, value]) => {
		if (key === 'registration_number') {
			if (!validate_registration_number && value.type === 'pattern') {
				return;
			}
		}

		newErrors[key] = { ...value };
	});

	return {
		loading                  : businessApiLoading,
		errors                   : newErrors,
		onSubmitOfCompanyDetails : onSubmit,
		orgControls,
		additionalOrgControls,
		companyDetailsControls,
		companyDetailsFormProps  : { ...companyDetailsFormProps, fields: newControlsField },
		control,
	};
};

export default useCompanyDetails;
