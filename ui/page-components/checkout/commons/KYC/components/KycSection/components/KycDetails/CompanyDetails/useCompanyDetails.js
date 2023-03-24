import global from '@cogo/commons/constants/global';
import { useRequest } from '@cogo/commons/hooks';
import { useSelector } from '@cogo/store';
import { toast } from '@cogoport/front/components/admin';
import { patterns } from '@cogoport/front/constants';
import { useFormCogo } from '@cogoport/front/hooks';
import { isEmpty } from '@cogoport/front/utils';
import getApiErrorString from '@cogoport/front/utils/functions/getApiErrorString';

import getCompanyControls from './get-company-controls';
import getCompanyTypeOptions from './getCompanyTypeOptions';

const { INDIA_COUNTRY_ID } = global;

const useCompanyDetails = ({
	channelPartnerDetails = {},
	setKycDetails = () => {},
	kycDetails = {},
}) => {
	const {
		general: { scope },
	} = useSelector((state) => state);

	const {
		verification,
		importer_exporter = {},
		service_provider = {},
	} = channelPartnerDetails;

	const organizationDetails = isEmpty(importer_exporter)
		? service_provider
		: importer_exporter;

	const controls = getCompanyControls(organizationDetails);

	const api = useRequest(
		'post',
		false,
		scope,
	)('/update_channel_partner_organization');

	const {
		fields = {},
		handleSubmit = () => {},
		formState = {},
		watch,
	} = useFormCogo(controls);

	const countryId = watch('country_id');

	const newFields = {};
	Object.keys(fields).forEach((key) => {
		let newField = fields[key];

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

			const res = await api.trigger({
				data: payload,
			});

			toast.success('Details updated successfully!');

			setKycDetails({
				...kycDetails,
				verification_progress:
					res.data?.verification_progress || kycDetails?.verification_progress,
			});
		} catch (err) {
			toast.error(getApiErrorString(err.data));
		}
	};

	return {
		controls,
		fields  : newFields,
		handleSubmit,
		onSubmit,
		loading : api.loading,
		formState,
	};
};

export default useCompanyDetails;
