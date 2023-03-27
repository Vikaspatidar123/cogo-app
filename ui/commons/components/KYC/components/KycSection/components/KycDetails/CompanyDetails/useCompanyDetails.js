import { Toast } from '@cogoport/components';
import { isEmpty } from '@cogoport/utils';

import getCompanyControls from './get-company-controls';
import getCompanyTypeOptions from './getCompanyTypeOptions';

import { useForm } from '@/packages/forms';
import getApiErrorString from '@/packages/forms/utils/getApiError';
import { useRequest } from '@/packages/request';
import patterns from '@/ui/commons/configurations/patterns';

const { INDIA_COUNTRY_ID } = global;

const useCompanyDetails = ({
	channelPartnerDetails = {},
	setKycDetails = () => {},
	kycDetails = {},
}) => {
	const {
		verification,
		importer_exporter = {},
		service_provider = {},
	} = channelPartnerDetails;

	const organizationDetails = isEmpty(importer_exporter)
		? service_provider
		: importer_exporter;

	const controls = getCompanyControls(organizationDetails);

	const [{ loading }, trigger] = useRequest({
		url    : '/update_channel_partner_organization',
		method : 'post',
	}, { manual: true });

	const {
		handleSubmit = () => {},
		formState = {},
		watch,
		control,
	} = useForm();

	const countryId = watch('country_id');

	const newFields = {};
	Object.keys(control).forEach((key) => {
		let newField = control[key];

		if (key === 'registration_number') {
			if (countryId === INDIA_COUNTRY_ID) {
				newField = {
					...newField,
					maxLength : 10,
					rules     : {
						...newField.rules,
						pattern: {
							value   : patterns.PAN_NUMBER,
							message : 'Please enter a valid PAN',
						},
					},
				};
			} else {
				newField = {
					...newField,
					rules: {
						required: true,
					},
				};

				delete newField.maxLength;
			}
		}

		if (key === 'company_type') {
			newField = {
				...newField,
				options: getCompanyTypeOptions(countryId),
			};
		}

		newFields[key] = newField;
	});

	const onSubmit = async (values = {}) => {
		try {
			const payload = {
				partner_id    : channelPartnerDetails.id,
				business_name : values.business_name || undefined,
				country_id    : values.country_id || undefined,
				registration_number:
					(values.registration_number || '').toUpperCase() || undefined,
				company_type    : values.company_type || undefined,
				account_types   : channelPartnerDetails.account_types,
				verification_id : verification?.[0].id,
			};

			const res = await trigger({
				data: payload,
			});

			Toast.success('Details updated successfully!');

			setKycDetails({
				...kycDetails,
				verification_progress:
					res.data?.verification_progress || kycDetails?.verification_progress,
			});
		} catch (err) {
			Toast.error(getApiErrorString(err.data));
		}
	};

	return {
		control,
		controls,
		fields: newFields,
		handleSubmit,
		onSubmit,
		loading,
		formState,
	};
};

export default useCompanyDetails;
