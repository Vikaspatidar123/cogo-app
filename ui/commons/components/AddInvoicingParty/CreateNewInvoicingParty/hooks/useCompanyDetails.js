import { useTranslation } from 'next-i18next';

// import Spinner from '../../../Spinner';
import useGetBusiness from '../../hooks/useGetBusiness';
import { getAdditionalOrgControls } from '../../utils/controls';
import getOrgControls from '../../utils/orgControls';

import { useForm } from '@/packages/forms';
import patterns from '@/ui/commons/configurations/patterns';
import GLOBAL_CONSTANTS from '@/ui/commons/constants/globals.json';

const { IN: INDIA_COUNTRY_ID } = GLOBAL_CONSTANTS.country_ids;

const useCompanyDetails = ({
	filledDetails = {},
	setFilledDetails = () => {},
	setCurrentStep = () => {},
}) => {
	const { company_details = {} } = filledDetails;

	const { t } = useTranslation(['common']);
	const translationKey =		'common:components.addInvoicingParty.createNewInvoicingParty.hooks.useCompanyDetails';

	const orgControls = getOrgControls({
		values: company_details,
		t,
	});

	const additionalOrgControls =		getAdditionalOrgControls({ values: company_details, t }) || [];

	const companyDetailsControls = [...orgControls, ...additionalOrgControls];

	const companyDetailsFormProps = useForm();
	const {
		watch = () => {},
		setValues = () => {},
		formState: { errors = {} },
	} = companyDetailsFormProps;

	const watchPan = watch('registration_number');
	const watchCountry = watch('country_id');

	const isCountryIndia = watchCountry === INDIA_COUNTRY_ID;

	const { getBusinessApi = {}, onBlurTaxPanGstinControl = () => {} } =		useGetBusiness({
		watchTaxNumber         : watchPan?.toUpperCase(),
		setValues,
		registrationNumberType : isCountryIndia ? 'registration' : '',
	});

	const onSubmit = (values = {}) => {
		setFilledDetails((previousState) => ({
			...(previousState || {}),
			company_details: values,
		}));
		setCurrentStep('billing_address');
	};

	const getBusinessApiLoading = getBusinessApi.loading;

	const newCompanyDetailsControls = [];
	companyDetailsControls.forEach((value) => {
		let newField = value || {};
		const key = value.name;

		if (key === 'registration_number') {
			newField = {
				...newField,
				label : t(`${translationKey}.fields.registrationNumber.label`),
				rules : {
					pattern  : {},
					required : true,
				},
			};

			if (isCountryIndia) {
				newField = {
					...newField,
					onBlur: () => onBlurTaxPanGstinControl(),
					...(getBusinessApiLoading && {
						// suffix: (
						// 	<Spinner
						// 		size={20}
						// 		style={{ padding: '4px', margin: '16px' }}
						// 		spinBorderColor="#356efd"
						// 		outerBorderColor="#e7efff"
						// 	/>
						// ),
					}),
					label     : t(`${translationKey}.fields.registrationNumber.isIndia.label`),
					maxLength : 10,
					rules     : {
						required : true,
						pattern  : {
							value   : patterns.PAN_NUMBER,
							message : t(
								`${translationKey}.fields.registrationNumber.isIndia.rules.pattern.message`,
							),
						},
					},
				};
			}
		}

		if (['business_name', 'company_type'].includes(key)) {
			newField = { ...newField, disabled: getBusinessApiLoading };
		}

		newCompanyDetailsControls.push(newField);
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
		loading                  : getBusinessApi.loading,
		errors                   : newErrors,
		onSubmitOfCompanyDetails : onSubmit,
		orgControls,
		additionalOrgControls,
		newCompanyDetailsControls,
		companyDetailsFormProps  : { ...companyDetailsFormProps },
		t,
	};
};

export default useCompanyDetails;
