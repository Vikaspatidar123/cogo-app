import { useFormCogo } from '@cogoport/front/hooks';
import { useDispatch, useSelector } from '@cogoport/front/store';
import useRequest from '@/utils/request/useRequest';
import { getApiErrorString } from '@cogoport/front/utils';
import { toast } from '@cogoport/front/components/admin';
import { setProfileStoreState } from '@/utils/stores';
import { patterns } from '@cogoport/front/constants';
import getCompanyControls from './get-company-controls';

const useCompanyDetails = ({ setKycDetails = () => {}, kycDetails = {} }) => {
	const { profile = {} } = useSelector((state) => state);
	const { partner = {} } = profile;

	const { twin_importer_exporter_id = '', verifications = [] } = partner;

	const dispatch = useDispatch();

	const controls = getCompanyControls(partner);

	const updateOrganizationAPI = useRequest(
		'post',
		false,
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
			if (countryId === '541d1232-58ce-4d64-83d6-556a42209eb7') {
				newField = {
					...newField,
					maxLength: 10,
					rules: {
						...newField.rules,
						pattern: {
							value: patterns.PAN_NUMBER,
							message: 'Please enter a valid PAN',
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

		newFields[key] = newField;
	});

	const onSubmit = async (values = {}) => {
		try {
			const body = {
				business_name: values.business_name || undefined,
				country_id: values.country_id || undefined,
				registration_number:
					(values.registration_number || '').toUpperCase() || undefined,
				company_type: values.company_type || undefined,
			};

			const account_type = twin_importer_exporter_id
				? 'importer_exporter'
				: 'service_provider';

			const verification_data = verifications.filter((verification) => {
				return verification.account_type === account_type;
			});

			const res = await updateOrganizationAPI.trigger({
				data: {
					...body,
					account_types: [account_type],
					verification_id: verification_data[0].id,
				},
			});

			toast.success('Details updated successfully!');

			setKycDetails({
				...kycDetails,
				verification_progress:
					res.data?.verification_progress || kycDetails.verification_progress,
			});

			dispatch(
				setProfileStoreState({
					partner: {
						...partner,
						...body,
					},
				}),
			);
		} catch (err) {
			toast.error(getApiErrorString(err.data));
		}
	};

	return {
		controls,
		fields: newFields,
		handleSubmit,
		onSubmit,
		updateOrganizationAPILoading: updateOrganizationAPI.loading,
		formState,
	};
};

export default useCompanyDetails;
